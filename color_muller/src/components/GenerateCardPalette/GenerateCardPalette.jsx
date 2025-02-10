import GenerateCard from "../GenerateCard/GenerateCard";
import PaletteColor from "../PaletteColor/PaletteColor";

function GenerateCardPalette({ onSignUpClick }) {
  return (
    <GenerateCard title="RANDOM COLOR PALETTE" onGenerateClick={onSignUpClick}>
      <div className="generate-card__palette">
        <PaletteColor color="F9F8F9" textColor="232323" />
        <PaletteColor color="B1A9C5" textColor="FFFFFF" />
        <PaletteColor color="48B5C2" textColor="FFFFFF" />
        <PaletteColor color="888389" textColor="FFFFFF" />
        <PaletteColor color="2F9E5C" textColor="FFFFFF" />
      </div>
    </GenerateCard>
  );
}

export default GenerateCardPalette;
