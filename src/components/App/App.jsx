import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import { getPhotoUpload } from "../../utils/UnsplashApi";
import { authorize, checkToken, updateProfileName } from "../../utils/auth";

import Header from "../Header/Header";
import SignUpModal from "../SignUpModal/SignUpModal";
import LoginModal from "../LoginModal/LoginModal";
import ProvideImageModal from "../ProvideImageModal/ProvideImageModal";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import BrowsePalettes from "../BrowsePalettes/BrowsePalettes";
import GeneratedPaletteModal from "../GeneratedPaletteModal/GeneratedPaletteModal";
import Profile from "../Profile/Profile";
import GeneratedPaletteFromPhotoModal from "../GeneratedPaletteFromPhotoModal/GeneratedPaletteFromPhotoModal";
import { getItems, likePalette, unlikePalette } from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentBGTheme, setCurrentBGTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [photoDetails, setPhotoDetails] = useState(null);
  const [palettes, setPalettes] = useState([]);

  const navigate = useNavigate();

  const onSignUpClick = () => {
    setActiveModal("signup");
  };

  const onLoginClick = () => {
    setActiveModal("login");
  };

  const onUploadImageClick = () => {
    setActiveModal("upload-image");
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

  const handleLogin = async (email, password) => {
    try {
      const response = await authorize(email, password);
      setIsLoggedIn(true);
      fetchUser();
      handleClose();
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSignUp = async (email, password, name) => {
    try {
      const response = await signUp(email, password, name);
      setIsLoggedIn(true);
      setUserName(response.userName);
      handleClose();
      navigate("/profile");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  const signUp = (email, password, name) => {
    return new Promise((resolve) => {
      resolve({ userName: name });
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  const handleUpdateProfileName = async (newName) => {
    try {
      const response = await updateProfileName(newName);
      setUserName(response.name);
    } catch (error) {
      console.error("Failed to update profile name:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await checkToken();
      setUserName(response.data.name);
    } catch (error) {
      console.error("Error fetching user info:", error);
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

  const handleLikePalette = async (paletteId) => {
    try {
      const updatedPalette = await likePalette(paletteId);
      setPalettes((prevPalettes) =>
        prevPalettes.map((palette) =>
          palette._id === paletteId ? updatedPalette : palette
        )
      );
    } catch (error) {
      console.error("Failed to like palette:", error);
    }
  };

  const handleUnlikePalette = async (paletteId) => {
    try {
      const updatedPalette = await unlikePalette(paletteId);
      setPalettes((prevPalettes) =>
        prevPalettes.map((palette) =>
          palette._id === paletteId ? updatedPalette : palette
        )
      );
    } catch (error) {
      console.error("Failed to unlike palette:", error);
    }
  };

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const palettesList = await getItems();
        setPalettes(palettesList);
      } catch (error) {
        console.error("Error fetching palettes:", error);
      }
    };

    fetchPalettes();
  }, []);

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
                  onGeneratePaletteClick={onGeneratePaletteClick}
                  onRandomPhotoClick={onRandomPhotoClick}
                  isLoggedIn={isLoggedIn}
                  palettes={palettes}
                />
              }
            />
            <Route
              path="/browse-palettes"
              element={
                <BrowsePalettes
                  palettes={palettes}
                  handleLikePalette={handleLikePalette}
                  handleUnlikePalette={handleUnlikePalette}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  isLoggedIn={isLoggedIn}
                  userName={userName}
                  onLogoutClick={handleLogout}
                  onUpdateProfileName={handleUpdateProfileName}
                  handleUnlikePalette={handleUnlikePalette}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <SignUpModal
          isOpen={activeModal === "signup"}
          handleClose={handleClose}
          handleSubmit={handleSignUp}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          handleClose={handleClose}
          handleSubmit={handleLogin}
        />
        <ProvideImageModal
          isOpen={activeModal === "upload-image"}
          handleClose={handleClose}
          handleSubmitPhoto={handleSubmitPhoto}
        />
        <GeneratedPaletteModal
          isOpen={activeModal === "generated-palette"}
          handleClose={handleClose}
          isLoggedIn={isLoggedIn}
          userName={userName}
          palettes={palettes}
          navigate={navigate}
        />
        <GeneratedPaletteFromPhotoModal
          isOpen={activeModal === "generated-palette-from-photo"}
          handleClose={handleClose}
          photoDetails={photoDetails}
          isLoggedIn={isLoggedIn}
          userName={userName}
          palettes={palettes}
          navigate={navigate}
        />
      </CurrentBackgroundPreference.Provider>
    </div>
  );
}

export default App;
