import GenerateCard from "../GenerateCard/GenerateCard";
import PaletteColor from "../PaletteColor/PaletteColor";
import random_photo from "../../assets/randomphoto.png";

function GenerateCardRandomPhoto({ currentBGTheme, onSavePaletteClick }) {
  return (
    <GenerateCard
      title="RANDOM PHOTO"
      currentBGTheme={currentBGTheme}
      onGenerateClick={onSavePaletteClick}
    >
      <p className="generate-card__subtitle">& COLOR PALETTE</p>
      <div className="generate-card__palette generate-card__palette-with-image">
        <PaletteColor color="#E1E6EC" colorText="#E1E6EC" />
        <PaletteColor color="#FBC301" colorText="#FBC301" />
        <PaletteColor color="#7A4201" colorText="#7A4201" />
        <PaletteColor color="#576872" colorText="#576872" />
        <PaletteColor color="#252A2E" colorText="#252A2E" />
      </div>
      <img
        className="generate-card__image"
        alt="Person with cape stading in water"
        src={random_photo}
      />
    </GenerateCard>
  );
}

export default GenerateCardRandomPhoto;
