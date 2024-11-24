import { useState } from "react";
import OpenAI from "openai";

export const EnterWordPage = ({
  selectedTheme,
  setPhase,
  setCompletedStory,
  generateStoryImage,
  initialStory = "",
  initialWords = {},
}) => {
  const [words, setWords] = useState(initialWords);

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const wordKeys = Object.keys(words);

  const handleInputChange = (value) => {
    const currentKey = wordKeys[currentWordIndex];
    setWords((prev) => ({
      ...prev,
      [currentKey]: value,
    }));
  };

  const handleNext = () => {
    if (currentWordIndex < wordKeys.length - 1) {
      setCurrentWordIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex((prev) => prev - 1);
    }
  };

  const generateStory = () => {
    let story = initialStory;
    for (const [key, value] of Object.entries(words)) {
      story = story.replace(new RegExp(`\\[${key}\\]`, "g"), value);
    }
    setCompletedStory(story);
    generateStoryImage(story);
    setPhase(3);
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-stone-50">
      <div className="flex flex-col items-start w-1/2 space-y-4">
        <h1 className="text-xl poppins-regular">Theme: {selectedTheme}</h1>
        <h2 className="text-3xl poppins-semibold">
          Enter a {wordKeys[currentWordIndex]}:
        </h2>
        <input
          className="bg-stone-200 w-full px-4 py-3 rounded-lg mt-2"
          placeholder={`Type a ${wordKeys[currentWordIndex]} here`}
          value={words[wordKeys[currentWordIndex]]}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <div className="flex justify-between w-full">
          <button
            onClick={handlePrevious}
            disabled={currentWordIndex === 0}
            className="px-4 py-2 bg-stone-100 rounded-lg poppins-medium disabled:opacity-50"
          >
            Previous
          </button>
          {currentWordIndex < wordKeys.length - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-green-600 text-white poppins-medium rounded-lg"
            >
              Next
            </button>
          ) : (
            <button
              onClick={generateStory}
              className="px-4 py-2 bg-green-600 text-white poppins-medium rounded-lg"
            >
              Generate Story
            </button>
          )}
        </div>
        <div className="text-sm text-gray-500 poppins-regular">
          Progress: {currentWordIndex + 1} / {wordKeys.length}
        </div>
      </div>
    </div>
  );
};
