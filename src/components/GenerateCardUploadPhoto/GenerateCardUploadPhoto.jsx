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
        <PaletteColor color="#E92DF6" colorText="#E92DF6" />
        <PaletteColor color="#C5BC39" colorText="#C5BC39" />
        <PaletteColor color="#04EDF7" colorText="#04EDF7" />
        <PaletteColor color="#003AFA" colorText="#003AFA" />
        <PaletteColor color="#00BB65" colorText="#00BB65" />
      </div>
    </GenerateCard>
  );
}

export default GenerateCardUploadPhoto;
