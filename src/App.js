import { useState } from "react";
import "./App.css";
import OpenAI from "openai";
import { StartPage } from "./components/StartPage/StartPage";
import { EnterWordPage } from "./components/EnterWordPage/EnterWordPage";

function App() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [phase, setPhase] = useState(1);
  const [completedStory, setCompletedStory] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateStoryImage = async (storyPrompt) => {
    try {
      console.log("Generating image for prompt:", storyPrompt);
      setLoading(true);

      const openai = new OpenAI({
        apiKey: "",
        dangerouslyAllowBrowser: true,
      });

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: storyPrompt + " in a storybook illustration style",
        n: 1,
        size: "1024x1024",
      });

      console.log("Generated image URL:", response.data[0].url);
      setImageUrl(response.data[0].url);
    } catch (error) {
      console.error("Detailed error:", error);
      alert("Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {phase === 1 && (
        <StartPage
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          setPhase={setPhase}
        />
      )}
      {phase === 2 && (
        <EnterWordPage
          selectedTheme={selectedTheme}
          setPhase={setPhase}
          setCompletedStory={setCompletedStory}
          generateStoryImage={generateStoryImage}
        />
      )}
      {phase === 3 && (
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-stone-50">
          <div className="w-1/2 bg-stone-100 p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Your Mad Libs Story</h1>
            <p>{completedStory}</p>
            {loading && (
              <div className="text-center text-gray-600">
                Creating your story illustration...
              </div>
            )}

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Story illustration"
                className="rounded-lg shadow-lg max-w-[512px]"
              />
            )}
            <button
              onClick={() => {
                setPhase(1);
                setSelectedTheme(null);
                setCompletedStory("");
                setImageUrl(null);
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
