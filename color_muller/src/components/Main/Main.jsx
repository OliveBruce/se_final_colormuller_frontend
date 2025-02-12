import "./Main.css";
import GenerateCardSection from "../GenerateCardSection/GenerateCardSection";
import MainBrowseSection from "../MainBrowseSection/MainBrowseSection";

function Main({ onUploadImageClick, onSignUpClick, onLoginClick }) {
  return (
    <main>
      <GenerateCardSection
        onSignUpClick={onSignUpClick}
        onUploadImageClick={onUploadImageClick}
      />
      <MainBrowseSection onLoginClick={onLoginClick} />
    </main>
  );
}

export default Main;
