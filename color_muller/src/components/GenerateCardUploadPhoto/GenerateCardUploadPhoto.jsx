import GenerateCard from "../GenerateCard/GenerateCard";
import PaletteColor from "../PaletteColor/PaletteColor";
import upload_photo from "../../assets/uploadphoto.png";

function GenerateCardUploadPhoto({ onUploadImageClick }) {
  return (
    <GenerateCard title="UPLOAD PHOTO" onGenerateClick={onUploadImageClick}>
      <p className="generate-card__subtitle">& GET COLOR PALETTE</p>
      <img
        className="generate-card__image"
        alt="Colorful concert"
        src={upload_photo}
      />
      <div className="generate-card__palette generate-card__palette-with-image">
        <PaletteColor color="E92DF6" textColor="FFFFFF" />
        <PaletteColor color="C5BC39" textColor="FFFFFF" />
        <PaletteColor color="04EDF7" textColor="232323" />
        <PaletteColor color="003AFA" textColor="FFFFFF" />
        <PaletteColor color="00BB65" textColor="FFFFFF" />
      </div>
    </GenerateCard>
  );
}

export default GenerateCardUploadPhoto;
