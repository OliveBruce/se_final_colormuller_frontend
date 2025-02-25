import "./Main.css";
import GenerateCardSection from "../GenerateCardSection/GenerateCardSection";
import MainBrowseSection from "../MainBrowseSection/MainBrowseSection";
import { useContext } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function Main({
  onUploadImageClick,
  onSignUpClick,
  onLoginClick,
  onSavePaletteClick,
  isLoggedIn,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);

  return (
    <main>
      <div
        className={
          "main__container" +
          (currentBGTheme === "light"
            ? " main__container--light"
            : " main__container--dark")
        }
      >
        <GenerateCardSection
          onSignUpClick={onSignUpClick}
          onUploadImageClick={onUploadImageClick}
          currentBGTheme={currentBGTheme}
          onSavePaletteClick={onSavePaletteClick}
        />
        <MainBrowseSection
          onLoginClick={onLoginClick}
          onUploadImageClick={onUploadImageClick}
          currentBGTheme={currentBGTheme}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </main>
  );
}

export default Main;
