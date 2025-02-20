import "./MainBrowseSection.css";
import { defaultPalettes } from "../../utils/constants";
import PaletteCard from "../PaletteCard/PaletteCard";
import UserButton from "../UserButton/UserButton";

function MainBrowseSection({ onLoginClick, currentBGTheme }) {
  return (
    <div
      className={
        "main-browse-section" +
        (currentBGTheme === "light"
          ? " main-browse-section--light"
          : " main-browse-section--dark")
      }
    >
      <h1 className="main-browse-section__title">Browse Palettes:</h1>
      <div className="main-browse-section__description-container">
        <UserButton onButtonClick={onLoginClick} buttonText="Log In" />
        <p className="main-browse-section__description">
          to save palettes others have generated.
        </p>
      </div>
      <ul className="main-browse-section__list">
        {defaultPalettes.slice(0, 3).map((palette) => {
          return (
            <PaletteCard
              key={palette._id}
              paletteImage={palette.image}
              paletteColors={palette.colors}
              paletteTitle={palette.title}
              creator={palette.creator}
              currentBGTheme={currentBGTheme}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default MainBrowseSection;
