import { FiCheck } from "react-icons/fi";

export const ButtonCard = ({
  selectCard,
  cardText,
  selectedTheme,
  bgImage,
}) => {
  return (
    <div className="relative">
      {/* Check Icon */}
      {selectedTheme === cardText && (
        <div className="absolute fade-in left-2 z-30 bg-green-500 poppins-regular text-white flex flex-row items-center gap-2 px-4 rounded-full p-1">
          <FiCheck className="text-white text-xl" /> Selected
        </div>
      )}

      {/* Button Card */}
      <button
        className={`w-96 h-52 rounded-xl flex flex-row items-center 
          ${selectedTheme != cardText && "hover:scale-95"}
          justify-center relative overflow-hidden
          ${selectedTheme == cardText ? "scale-90" : "scale-100"} 
          transition-all duration-300`}
        onClick={selectCard}
      >
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: `url(${bgImage})` }}
        />

        <div
          className={`absolute inset-0 z-10 transition-colors ${
            selectedTheme == cardText ? "bg-black/20" : "bg-black/50"
          }`}
        />

        <p className="text-3xl poppins-medium text-white relative z-20">
          {cardText}
        </p>
      </button>
    </div>
  );
};
