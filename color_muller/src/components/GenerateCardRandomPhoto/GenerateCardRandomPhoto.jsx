import GenerateCard from "../GenerateCard/GenerateCard";
import PaletteColor from "../PaletteColor/PaletteColor";
import random_photo from "../../assets/randomphoto.png";

function GenerateCardRandomPhoto() {
  return (
    <GenerateCard title="RANDOM PHOTO">
      <p className="generate-card__subtitle">& COLOR PALETTE</p>
      <img
        className="generate-card__image"
        alt="Person with cape stading in water"
        src={random_photo}
      />
      <div className="generate-card__palette generate-card__palette-with-image">
        <PaletteColor color="E1E6EC" textColor="232323" />
        <PaletteColor color="FBC301" textColor="232323" />
        <PaletteColor color="7A4201" textColor="FFFFFF" />
        <PaletteColor color="576872" textColor="FFFFFF" />
        <PaletteColor color="252A2E" textColor="FFFFFF" />
      </div>
    </GenerateCard>
  );
}

export default GenerateCardRandomPhoto;
