// utils/openRouter.js
import axios from "axios";

export const askOpenRouter = async (prompt) => {
    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openchat/openchat-7b",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const content = response?.data?.choices?.[0]?.message?.content;

        if (!content) {
            console.error("OpenRouter response format unexpected:", response.data);
            throw new Error("No content in OpenRouter response");
        }

        return content;
    } catch (err) {
        console.error("Error calling OpenRouter:", err.message);
        throw new Error("OpenRouter API failed");
    }
};
