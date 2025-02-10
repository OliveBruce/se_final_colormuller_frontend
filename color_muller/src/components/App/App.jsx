import { useState, useEffect } from "react";
import "./App.css";

import Header from "../Header/Header";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import ProvideImageModal from "../ProvideImageModal/ProvideImageModal";
import Footer from "../Footer/Footer";
import GenerateCard from "../GenerateCard/GenerateCard";
import GenerateCardSection from "../GenerateCardSection/GenerateCardSection";

function App() {
  const [activeModal, setActiveModal] = useState("");

  const onSignUpClick = () => {
    setActiveModal("signup");
  };
  const onLoginClick = () => {
    setActiveModal("login");
  };
  const handleClose = () => {
    setActiveModal("");
  };

  const onUploadImageClick = () => {
    setActiveModal("upload-image");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className="app">
      <div className="app__content">
        <Header onSignUpClick={onSignUpClick} onLoginClick={onLoginClick} />
        <GenerateCardSection
          onUploadImageClick={onUploadImageClick}
          onSignUpClick={onSignUpClick}
        />
        <Footer />
      </div>
      <SignUpModal
        isOpen={activeModal === "signup"}
        handleClose={handleClose}
      />
      <LoginModal isOpen={activeModal === "login"} handleClose={handleClose} />
      <ProvideImageModal
        isOpen={activeModal === "upload-image"}
        handleClose={handleClose}
      />
    </div>
  );
}

export default App;
