import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.warn("Warning: GEMINI_API_KEY is not defined. Gemini API calls may fail.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


/**
 * Sends a text prompt to the Gemini API and returns the generated text content.
 * This function does NOT handle streaming.
 *
 * @param {string} prompt The text prompt for the Gemini model.
 * @param {Array} [history=[]] Optional: An array of previous messages for conversational context.
 * Each message object should conform to Gemini's expected format:
 * `{ role: 'user' | 'model', parts: [{ text: 'Your message here' }] }`.
 * If your frontend sends `{ role: 'user' | 'assistant', content: '...' }`,
 * you'll need to map 'assistant' to 'model' and 'content' to 'parts: [{ text: ... }]'.
 * @returns {Promise<string>} The generated text content from Gemini.
 * @throws {Error} If the Gemini API call fails or the response is empty.
 */
export const askGemini = async (prompt, history = []) => {
    try {
        const contents = [];

        // Map the incoming history to Gemini's 'user' and 'model' roles and 'parts' format
        history.forEach(msg => {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : msg.role, // Convert 'assistant' to 'model'
                parts: [{ text: msg.content || (msg.parts && msg.parts[0]?.text) }],
            });
        });

        // Add the current user prompt
        contents.push({
            role: "user",
            parts: [{ text: prompt }],
        });

        const result = await model.generateContent({
            contents: contents,
            // Example generation configuration (uncomment and adjust as needed):
            // generationConfig: {
            //   temperature: 0.7, // Controls randomness: 0.0 (deterministic) to 1.0 (very random)
            //   maxOutputTokens: 800, // Maximum tokens to generate
            // },
        });

        const response = await result.response;
        const text = response.text();

        if (!text) {
            console.error("Gemini API returned no text content.", response);
            throw new Error("Gemini API: No content received in response.");
        }

        return text;
    } catch (err) {
        console.error("Error calling Gemini API (askGemini):", err.message);
        // Re-throw a more informative error for the caller to handle
        if (err.status) { // Often present in GoogleGenerativeAIFetchError
            throw new Error(`Gemini API Error (HTTP Status ${err.status}): ${err.message}`);
        }
        throw new Error(`Gemini API Error: ${err.message || 'Unknown error occurred.'}`);
    }
};

/**
 * Sends a text prompt to the Gemini API and returns an asynchronous generator
 * for streamed text content. Useful for real-time typing effects.
 *
 * @param {string} prompt The text prompt for the Gemini model.
 * @param {Array} [history=[]] Optional: An array of previous messages for conversational context.
 * Same format as for `askGemini`.
 * @returns {AsyncGenerator<string>} An async generator yielding chunks of text content from Gemini.
 * @throws {Error} If the Gemini API call fails.
 */
export async function* streamGemini(prompt, history = []) {
    try {
        const contents = [];

        history.forEach(msg => {
            contents.push({
                role: msg.role === 'assistant' ? 'model' : msg.role,
                parts: [{ text: msg.content || (msg.parts && msg.parts[0]?.text) }],
            });
        });

        contents.push({
            role: "user",
            parts: [{ text: prompt }],
        });

        const result = await model.generateContentStream({
            contents: contents,
            // generationConfig: {
            //   temperature: 0.7,
            //   maxOutputTokens: 800,
            // },
        });

        for await (const chunk of result.stream) {
            yield chunk.text();
        }
    } catch (err) {
        console.error("Error calling streaming Gemini API (streamGemini):", err.message);
        if (err.status) {
            throw new Error(`Gemini Streaming API Error (HTTP Status ${err.status}): ${err.message}`);
        }
        throw new Error(`Gemini Streaming API Error: ${err.message || 'Unknown error occurred.'}`);
    }
}