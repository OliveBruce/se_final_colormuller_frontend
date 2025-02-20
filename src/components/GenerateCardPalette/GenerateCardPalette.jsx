import GenerateCard from "../GenerateCard/GenerateCard";
import PaletteColor from "../PaletteColor/PaletteColor";

function GenerateCardPalette({ onSignUpClick }) {
  return (
    <GenerateCard title="RANDOM COLOR PALETTE" onGenerateClick={onSignUpClick}>
      <div className="generate-card__palette">
        <PaletteColor color="#F9F8F9" colorText="#F9F8F9" />
        <PaletteColor color="#B1A9C5" colorText="#B1A9C5" />
        <PaletteColor color="#48B5C2" colorText="#48B5C2" />
        <PaletteColor color="#888389" colorText="#888389" />
        <PaletteColor color="#2F9E5C" colorText="#2F9E5C" />
      </div>
    </GenerateCard>
  );
}

export default GenerateCardPalette;
