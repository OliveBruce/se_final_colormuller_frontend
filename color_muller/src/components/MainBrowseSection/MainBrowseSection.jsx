import "./MainBrowseSection.css";
import PaletteCard from "../PaletteCard/PaletteCard";
import UserButton from "../UserButton/UserButton";

function MainBrowseSection({ onLoginClick }) {
  return (
    <div className="main-browse-section">
      <h1 className="main-browse-section__title">Browse Palettes:</h1>
      <div className="main-browse-section__description-container">
        <UserButton onButtonClick={onLoginClick} buttonText="Log In" />
        <p className="main-browse-section__description">
          to save palettes others have generated.
        </p>
      </div>
      <ul className="main-browse-section__list">
        <PaletteCard />
        <PaletteCard />
        <PaletteCard />
      </ul>
    </div>
  );
}

export default MainBrowseSection;
