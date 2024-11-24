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
  const [initialStory, setIntialStory] = useState(null);
  const [initialWords, setInitialWords] = useState(null);

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
        prompt:
          storyPrompt +
          " create ONE image, do NOT include the text, or any words, or writing of any kind in the image, try to capture as many aspects from the story in one image as possible, make it a van gogh style artwork",
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
          setIntialStory={setIntialStory}
          setInitialWords={setInitialWords}
        />
      )}
      {phase === 2 && (
        <EnterWordPage
          selectedTheme={selectedTheme}
          setPhase={setPhase}
          setCompletedStory={setCompletedStory}
          generateStoryImage={generateStoryImage}
          initialStory={initialStory}
          initialWords={initialWords}
        />
      )}
      {phase === 3 && (
        <div className="w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-stone-50">
          <div className="w-screen h-screen bg-stone-100 rounded-lg shadow-lg">
            {/* <h1 className="text-2xl font-bold mb-4">Your Mad Libs Story</h1>
            <p>{completedStory}</p> */}
            {loading && (
              <div className="text-center text-gray-600">
                Creating your story illustration...
              </div>
            )}

            {imageUrl && (
              <img
                src={imageUrl}
                alt="Story illustration"
                className="rounded-lg shadow-lg w-screen h-screen"
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
