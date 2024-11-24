import { stories } from "../stories";
import { useState } from "react";
import { ButtonCard } from "./ButtonCard";
import adventureImage from "../../assets/adventureImage.jpeg";
import romanceImage from "../../assets/romanceImage.avif";
import horrorImage from "../../assets/horrorImage.webp";
import comedyImage from "../../assets/comedyImage.jpg";

export const StartPage = ({
  selectedTheme,
  setSelectedTheme,
  setPhase,
  setIntialStory,
  setInitialWords,
}) => {
  const themeData = {
    Adventure: adventureImage,
    Romance: romanceImage,
    Horror: horrorImage,
    Comedy: comedyImage,
  };

  const handleBeginJourney = () => {
    if (selectedTheme) {
      const selectedStory = stories[selectedTheme];
      setIntialStory(selectedStory.story);
      setInitialWords(selectedStory.words);
      setPhase(2);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-stone-50">
      <h1 className="text-4xl poppins-semibold mb-0 w-1/2 ml-16">Welcome</h1>
      <h2 className="text-base poppins-regular mb-4 w-1/2 ml-16">
        Please select a theme you would like to embark on your journey!
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {Object.entries(themeData).map(([theme, image]) => (
          <ButtonCard
            key={theme}
            cardText={theme}
            selectedTheme={selectedTheme}
            selectCard={() => {
              setSelectedTheme(theme);
            }}
            bgImage={image}
          />
        ))}
      </div>

      <div className="w-1/2 flex items-end justify-end mt-8">
        <button
          disabled={!selectedTheme}
          onClick={handleBeginJourney}
          className="px-6 py-3 poppins-medium rounded-lg mr-8 bg-green-500 text-white font-semibold
                   transition-all duration-500
                   disabled:opacity-20 disabled:cursor-not-allowed
                   hover:bg-green-600"
        >
          Begin the journey!
        </button>
      </div>
    </div>
  );
};
