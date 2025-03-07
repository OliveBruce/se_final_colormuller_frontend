import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import { getPhotoUpload, getRandomPhoto } from "../../utils/UnsplashApi";
import { getRandomPalette } from "../../utils/TheColorApi";
import { filterPhotoPalette, getPhotoPalette } from "../../utils/ColorThiefApi";
import { authorize, checkToken, updateProfileName } from "../../utils/auth";
import {
  getUserPalettes,
  getLikedPalettes,
  getItems,
  savePalette,
  likePalette,
  unlikePalette,
} from "../../utils/api";
import { v4 as uuidv4 } from "uuid";

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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [currentBGTheme, setCurrentBGTheme] = useState("dark");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [photoDetails, setPhotoDetails] = useState(null);
  const [palettes, setPalettes] = useState([]);
  const [currentPalette, setCurrentPalette] = useState([]);
  const [paletteTitle, setPaletteTitle] = useState("");
  const [paletteImage, setPaletteImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [photo, setPhotoResponse] = useState(null);
  const [userPalettes, setUserPalettes] = useState([]);
  const [likedPalettes, setLikedPalettes] = useState([]);
  const [hasUserPalettes, setHasUserPalettes] = useState(false);
  const [hasLikedPalettes, setHasLikedPalettes] = useState(false);
  const [isCheckedMyPalettes, setIsCheckedMyPalettes] = useState(true);
  const [isCheckedSavedPalettes, setIsCheckedSavedPalettes] = useState(false);

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

  const onGeneratePaletteClick = async () => {
    setActiveModal("generated-palette");
    setPhotoResponse(null);
    setLoading(true);
    try {
      const palette = await getRandomPalette();
      const paletteColors = palette.map((color) => color.color);
      setCurrentPalette(paletteColors);
    } catch (error) {
      console.error("Error generating palette:", error);
    } finally {
      setLoading(false);
    }
  };

  const onRandomPhotoClick = async () => {
    setLoading(true);
    setActiveModal("generated-palette-from-photo");
    setPhotoDetails(null);
    try {
      let photoToUse = photoDetails;
      if (!photoToUse) {
        photoToUse = await getRandomPhoto();
      }
      setPhotoResponse(photoToUse);
      const palette = await getPhotoPalette(photoToUse.urls.small);
      const filteredPalette = filterPhotoPalette(palette);
      setCurrentPalette(filteredPalette);
      setPaletteImage(photoToUse.id);
    } catch (error) {
      console.error("Error generating palette:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await authorize(email, password);
      setIsLoggedIn(true);
      fetchUser();
      handleClose();
      navigate(`/profile`);
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
      navigate(`/profile`);
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
    navigate(`/`);
  };

  const handleUpdateProfileName = async (newName) => {
    try {
      const response = await updateProfileName(newName);
      setUserName(response.name);
    } catch (error) {
      console.error("Failed to update profile name:", error);
    }
  };

  const handleSavePalette = async () => {
    if (isLoggedIn) {
      const idNumb = palettes.length + 1;
      const newPalette = {
        _id: idNumb,
        title: paletteTitle,
        image: photo ? photo.links.html : null,
        colors: currentPalette.map((color) => ({ c_id: uuidv4(), color })),
        creator: userName,
      };
      await savePalette(newPalette);
      navigate(`/profile`);
      fetchUserPalettes();
    } else {
      alert("You need to be logged in to like a palette.");
    }
    handleClose();
  };

  const fetchUser = async () => {
    try {
      const response = await checkToken();
      setUserName(response.data.name);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchUserPalettes = async () => {
    if (isLoggedIn) {
      try {
        const palettes = await getUserPalettes(userName);
        setUserPalettes(palettes);
        setHasUserPalettes(palettes.length > 0);
      } catch (error) {
        console.error("Error fetching user palettes:", error);
      }
    }
  };

  const fetchLikedPalettes = async () => {
    if (isLoggedIn) {
      try {
        const palettes = await getLikedPalettes();
        setLikedPalettes(palettes);
        setHasLikedPalettes(palettes.length > 0);
      } catch (error) {
        console.error("Error fetching liked palettes:", error);
      }
    }
  };

  const handleLikePalette = async (paletteId) => {
    try {
      const updatedPalette = await likePalette(paletteId);
      setUserPalettes((prevPalettes) =>
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
      setUserPalettes((prevPalettes) =>
        prevPalettes.map((palette) =>
          palette._id === paletteId ? updatedPalette : palette
        )
      );
      fetchLikedPalettes();
      console.log("user palettes fetched");
    } catch (error) {
      console.error("Failed to unlike palette:", error);
    }
  };

  const handleSubmitPhoto = async (url) => {
    setLoading(true);
    setActiveModal("generated-palette-from-photo");
    setPhotoDetails(null);
    try {
      let photoToUse = photoDetails;
      if (!photoToUse) {
        photoToUse = await getPhotoUpload(url);
      }
      setPhotoResponse(photoToUse);
      const palette = await getPhotoPalette(photoToUse.urls.small);
      const filteredPalette = filterPhotoPalette(palette);
      setCurrentPalette(filteredPalette);
      setPaletteImage(photoToUse.id);
    } catch (error) {
      console.error("Error generating palette:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchImageUrl = (imageUrl) => {
    try {
      return getPhotoUpload(imageUrl);
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

  const handleChangeSavedPalettes = () => {
    setIsCheckedSavedPalettes(true);
    setIsCheckedMyPalettes(false);
  };

  const handleChangeMyPalettes = () => {
    setIsCheckedMyPalettes(true);
    setIsCheckedSavedPalettes(false);
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

  useEffect(() => {
    if (isCheckedMyPalettes) {
      fetchUserPalettes();
    }
  }, [isLoggedIn, userName, isCheckedMyPalettes]);

  useEffect(() => {
    if (isCheckedSavedPalettes) {
      fetchLikedPalettes();
    }
  }, [isLoggedIn, isCheckedSavedPalettes]);

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
              path={`/`}
              element={
                <Main
                  onUploadImageClick={onUploadImageClick}
                  onSignUpClick={onSignUpClick}
                  onLoginClick={onLoginClick}
                  onGeneratePaletteClick={onGeneratePaletteClick}
                  onRandomPhotoClick={onRandomPhotoClick}
                  isLoggedIn={isLoggedIn}
                  palettes={palettes}
                  fetchImageUrl={fetchImageUrl}
                />
              }
            />
            <Route
              path={`/browse-palettes`}
              element={
                <BrowsePalettes
                  palettes={palettes}
                  handleLikePalette={handleLikePalette}
                  handleUnlikePalette={handleUnlikePalette}
                  isLoggedIn={isLoggedIn}
                  fetchImageUrl={fetchImageUrl}
                  paletteImage={paletteImage}
                />
              }
            />
            <Route
              path={`/profile`}
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    isLoggedIn={isLoggedIn}
                    userName={userName}
                    onLogoutClick={handleLogout}
                    onUpdateProfileName={handleUpdateProfileName}
                    handleUnlikePalette={handleUnlikePalette}
                    fetchImageUrl={fetchImageUrl}
                    userPalettes={userPalettes}
                    likedPalettes={likedPalettes}
                    hasUserPalettes={hasUserPalettes}
                    hasLikedPalettes={hasLikedPalettes}
                    handleLikePalette={handleLikePalette}
                    fetchUserPalettes={fetchUserPalettes}
                    fetchLikedPalettes={fetchLikedPalettes}
                    isCheckedMyPalettes={isCheckedMyPalettes}
                    isCheckedSavedPalettes={isCheckedSavedPalettes}
                    handleChangeSavedPalettes={handleChangeSavedPalettes}
                    handleChangeMyPalettes={handleChangeMyPalettes}
                  />
                </ProtectedRoute>
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
          handleSavePalette={handleSavePalette}
          currentPalette={currentPalette}
          loading={loading}
          setPaletteTitle={setPaletteTitle}
        />
        <GeneratedPaletteFromPhotoModal
          isOpen={activeModal === "generated-palette-from-photo"}
          handleClose={handleClose}
          photoDetails={photoDetails}
          isLoggedIn={isLoggedIn}
          userName={userName}
          palettes={palettes}
          navigate={navigate}
          handleSavePalette={handleSavePalette}
          currentPalette={currentPalette}
          loading={loading}
          setPaletteTitle={setPaletteTitle}
          photo={photo}
        />
      </CurrentBackgroundPreference.Provider>
    </div>
  );
}

export default App;
