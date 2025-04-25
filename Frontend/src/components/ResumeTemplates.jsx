import React, { useState, useEffect } from 'react';

const templates = [
    {
        id: 1,
        name: 'Modern Edge',
        image: '/templates/template1.png',
        download: '/resumes/template1.docx',
        description: 'A contemporary design with a strong visual hierarchy, perfect for showcasing your skills and experience clearly.',
        accentColor: 'teal-500',
    },
    {
        id: 2,
        name: 'Elegant Flow',
        image: '/templates/template2.png',
        download: '/resumes/template2.docx',
        description: 'A clean and sophisticated layout that emphasizes readability and professionalism.',
        accentColor: 'indigo-600',
    },
    {
        id: 3,
        name: 'Creative Spark',
        image: '/templates/template3.png',
        download: '/resumes/template3.docx',
        description: 'An engaging and visually appealing template for those in creative fields, allowing your personality to shine.',
        accentColor: 'purple-500',
    },
    {
        id: 4,
        name: 'Executive Focus',
        image: '/templates/template4.png',
        download: '/resumes/template4.docx',
        description: 'A structured and professional template ideal for experienced professionals and executive roles.',
        accentColor: 'gray-700',
    },
];

const ResumeTemplates = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handlePreview = (image) => {
        setSelectedImage(image);
        setShowPreview(true);
    };

    const closePreview = () => {
        setShowPreview(false);
        setSelectedImage(null);
    };

    // 🔑 Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closePreview();
            }
        };

        if (showPreview) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [showPreview]);

    return (
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-16 font-sans">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
                    Craft Your <span className="text-indigo-600">Professional Story</span>
                </h2>
                <p className="text-center text-gray-600 text-lg mb-12">
                    Choose from elegant, modern templates tailored for different roles and industries.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {templates.map((template) => (
                        <div
                            key={template.id}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="w-full h-56 object-cover rounded-t-xl"
                                />
                                <div
                                    className={`absolute top-0 left-0 bg-${template.accentColor} text-white text-xs px-3 py-1 rounded-br-lg`}
                                >
                                    New
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{template.name}</h3>
                                <p className="text-gray-600 text-sm mb-4 h-[50px] overflow-hidden line-clamp-2">
                                    {template.description}
                                </p>
                                <div className="flex justify-between items-center space-x-2">
                                    <button
                                        onClick={() => handlePreview(template.image)}
                                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-3 py-2 rounded-md text-sm transition"
                                    >
                                        Preview
                                    </button>
                                    <a
                                        href={template.download}
                                        download
                                        className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-center font-medium px-3 py-2 rounded-md text-sm transition"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-14">
                    <p className="text-gray-700 text-base">
                        Choose a resume that reflects your journey and goals. Your story deserves the best design.
                    </p>
                </div>
            </div>

            {/* Modal with ESC + Zoom */}
            {showPreview && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-[95%] relative animate-fadeIn">
                        <button
                            onClick={closePreview}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
                            aria-label="Close Preview"
                        >
                            &times;
                        </button>
                        <img
                            src={selectedImage}
                            alt="Template Preview"
                            className="w-full max-w-3xl max-h-[90vh] object-contain mx-auto rounded-md transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeTemplates;
