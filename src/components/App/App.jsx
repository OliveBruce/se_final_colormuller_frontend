import { useState, useEffect, useRef } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import { getPhotoUpload } from "../../utils/UnsplashApi";

import Header from "../Header/Header";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import ProvideImageModal from "../ProvideImageModal/ProvideImageModal";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import BrowsePalettes from "../BrowsePalettes/BrowsePalettes";
import SavePaletteModal from "../SavePaletteModal/SavePaletteModal";
import GeneratedPaletteModal from "../GeneratedPaletteModal/GeneratedPaletteModal";
import Profile from "../Profile/Profile";
import GeneratedPaletteFromPhotoModal from "../GeneratedPaletteFromPhotoModal/GeneratedPaletteFromPhotoModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentBGTheme, setCurrentBGTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [photoDetails, setPhotoDetails] = useState(null);

  const onSignUpClick = () => {
    setActiveModal("signup");
  };

  const onLoginClick = () => {
    setActiveModal("login");
  };

  const onUploadImageClick = () => {
    setActiveModal("upload-image");
  };

  const onSavePaletteClick = () => {
    setActiveModal("save-palette");
  };

  const onGeneratePaletteClick = () => {
    setActiveModal("generated-palette");
  };

  const onRandomPhotoClick = () => {
    setActiveModal("generated-palette-from-photo");
    setPhotoDetails(null);
  };

  const handleSubmitPhoto = async (url) => {
    try {
      const photo = await getPhotoUpload(url);
      setPhotoDetails(photo);
      setActiveModal("generated-palette-from-photo");
    } catch (error) {
      console.error("Error fetching photo:", error);
    }
  };

  const handleClose = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    if (currentBGTheme === "dark") {
      setCurrentBGTheme("light");
    }
    if (currentBGTheme === "light") {
      setCurrentBGTheme("dark");
    }
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
    <BrowserRouter>
      <div className="app">
        <CurrentBackgroundPreference.Provider
          value={{ currentBGTheme, handleToggleSwitchChange }}
        >
          <div className="app__content">
            <Header
              onSignUpClick={onSignUpClick}
              onLoginClick={onLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    onUploadImageClick={onUploadImageClick}
                    onSignUpClick={onSignUpClick}
                    onLoginClick={onLoginClick}
                    onSavePaletteClick={onSavePaletteClick}
                    onGeneratePaletteClick={onGeneratePaletteClick}
                    onRandomPhotoClick={onRandomPhotoClick}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route path="/browse-palettes" element={<BrowsePalettes />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </div>
          <SignUpModal
            isOpen={activeModal === "signup"}
            handleClose={handleClose}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            handleClose={handleClose}
          />
          <ProvideImageModal
            isOpen={activeModal === "upload-image"}
            handleClose={handleClose}
            handleSubmitPhoto={handleSubmitPhoto}
          />
          <SavePaletteModal
            isOpen={activeModal === "save-palette"}
            handleClose={handleClose}
            isLoggedIn={isLoggedIn}
            onLoginClick={onLoginClick}
            onSignUpClick={onSignUpClick}
          />
          <GeneratedPaletteModal
            isOpen={activeModal === "generated-palette"}
            handleClose={handleClose}
            isLoggedIn={isLoggedIn}
            onSavePaletteClick={onSavePaletteClick}
          />
          <GeneratedPaletteFromPhotoModal
            isOpen={activeModal === "generated-palette-from-photo"}
            handleClose={handleClose}
            photoDetails={photoDetails}
            isLoggedIn={isLoggedIn}
            onSavePaletteClick={onSavePaletteClick}
          />
        </CurrentBackgroundPreference.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
