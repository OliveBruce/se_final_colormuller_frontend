import "./Main.css";
import GenerateCardSection from "../GenerateCardSection/GenerateCardSection";
import MainBrowseSection from "../MainBrowseSection/MainBrowseSection";

function Main({ onUploadImageClick, onSignUpClick, onLoginClick }) {
  return (
    <main>
      <div className="main__container">
        <GenerateCardSection
          onSignUpClick={onSignUpClick}
          onUploadImageClick={onUploadImageClick}
        />
        <MainBrowseSection onLoginClick={onLoginClick} />
      </div>
    </main>
  );
}

export default Main;
