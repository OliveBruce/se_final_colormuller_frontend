import GenerateCardPalette from "../GenerateCardPalette/GenerateCardPalette";
import GenerateCardRandomPhoto from "../GenerateCardRandomPhoto/GenerateCardRandomPhoto";
import GenerateCardUploadPhoto from "../GenerateCardUploadPhoto/GenerateCardUploadPhoto";
import "./GenerateCardSection.css";
import logo from "../../assets/colormuller.svg";

function GenerateCardSection({ onUploadImageClick, onSignUpClick }) {
  return (
    <div className="generate-card-section">
      <div className="generate-card-section__header">
        <img
          className="generate-card-section__logo"
          alt="ColorMuller logo"
          src={logo}
        />
        <h2 className="generate-card-section__description">
          ColorMuller is an app that uses open-source API to generate color
          palettes, either completely random or based on a photo. The photo can
          be randomly selected from an open-source collection online or can be
          uploaded.
        </h2>
        <p className="generate-card-section__description">
          Please enjoy discovering fun color schemes!
        </p>
      </div>
      <div className="generate-card-section__cards-section">
        <h3 className="generate-card-section__cards-section-header">
          Generate A Color Palette:
        </h3>
        <div className="generate-card-section__cards">
          <GenerateCardRandomPhoto />
          <GenerateCardPalette onSignUpClick={onSignUpClick} />
          <GenerateCardUploadPhoto onUploadImageClick={onUploadImageClick} />
        </div>
      </div>
    </div>
  );
}

export default GenerateCardSection;
