import "./Profile.css";
import PaletteCard from "../PaletteCard/PaletteCard";
import { useContext, useState, useEffect } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import {
  getUserPalettes,
  getLikedPalettes,
  likePalette,
} from "../../utils/api";

function Profile({
  isLoggedIn,
  userName,
  onLogoutClick,
  onUpdateProfileName,
  handleUnlikePalette,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [isCheckedMyPalettes, setIsCheckedMyPalettes] = useState(true);
  const [isCheckedSavedPalettes, setIsCheckedSavedPalettes] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(userName);
  const [userPalettes, setUserPalettes] = useState([]);
  const [likedPalettes, setLikedPalettes] = useState([]);
  const [hasUserPalettes, setHasUserPalettes] = useState(false);
  const [hasLikedpalettes, setHasLikedPalettes] = useState(false);

  useEffect(() => {
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

    fetchUserPalettes();
  }, [isLoggedIn, userName]);

  useEffect(() => {
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

    if (isCheckedSavedPalettes) {
      fetchLikedPalettes();
    }
  }, [isLoggedIn, isCheckedSavedPalettes]);

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

  const handleChangeSavedPalettes = () => {
    setIsCheckedSavedPalettes(true);
    setIsCheckedMyPalettes(false);
  };

  const handleChangeMyPalettes = () => {
    setIsCheckedMyPalettes(true);
    setIsCheckedSavedPalettes(false);
  };

  const handleEditProfileClick = () => {
    setIsEditing(true);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    onUpdateProfileName(newName);
    setUserPalettes((prevPalettes) =>
      prevPalettes.map((palette) =>
        palette.creator === userName
          ? { ...palette, creator: newName }
          : palette
      )
    );
    setLikedPalettes((prevPalettes) =>
      prevPalettes.map((palette) =>
        palette.creator === userName
          ? { ...palette, creator: newName }
          : palette
      )
    );
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <div
        className={
          "profile__container" +
          (currentBGTheme === "light"
            ? " profile__container--light"
            : " profile__container--dark")
        }
      >
        <div className="profile__header">
          <span
            className={
              "profile__bg" +
              (currentBGTheme === "light"
                ? " profile__bg--light"
                : " profile__bg--dark")
            }
          ></span>
          <div className="profile__header-content">
            <img
              className="profile__avatar"
              src="https://images.unsplash.com/photo-1739208831882-8be117b564ce?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="User avatar"
            />
            <div className="profile__user-info">
              <h1 className="profile__username">{userName}</h1>
              {isEditing ? (
                <form onSubmit={handleNameSubmit}>
                  <input
                    type="text"
                    className="modal__input profile__input"
                    value={newName}
                    onChange={handleNameChange}
                  />
                  <button
                    type="submit"
                    className="profile__button profile__update-name"
                  >
                    Update Name
                  </button>
                </form>
              ) : (
                <button
                  type="button"
                  className="profile__button profile__edit-profile"
                  onClick={handleEditProfileClick}
                >
                  Edit Profile
                </button>
              )}
              <button
                type="button"
                className="profile__button profile__logout"
                onClick={onLogoutClick}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <div
          className={
            "profile__saved-palettes" +
            (currentBGTheme === "light"
              ? " profile__saved-palettes--light"
              : " profile__saved-palettes--dark")
          }
        >
          <label
            htmlFor="my-palettes"
            className={
              "profile__tab-btn profile__tab-btn-my-palettes" +
              (isCheckedMyPalettes
                ? currentBGTheme === "light"
                  ? " profile__tab-btn--light profile__tab-btn--active"
                  : " profile__tab-btn--dark profile__tab-btn--active"
                : "")
            }
          >
            <input
              type="radio"
              className="profile__tab-btn-radio"
              checked={isCheckedMyPalettes}
              onChange={handleChangeMyPalettes}
              value="my-palettes"
              id="my-palettes"
            />
            <span className="profile__tab-text">My Palettes</span>
          </label>
          <label
            htmlFor="saved-palettes"
            className={
              "profile__tab-btn profile__tab-btn-saved-palettes" +
              (isCheckedSavedPalettes
                ? currentBGTheme === "light"
                  ? " profile__tab-btn--light profile__tab-btn--active"
                  : " profile__tab-btn--dark profile__tab-btn--active"
                : "")
            }
          >
            <input
              type="radio"
              className="profile__tab-btn-radio"
              checked={isCheckedSavedPalettes}
              onChange={handleChangeSavedPalettes}
              value="saved-palettes"
              id="saved-palettes"
            />
            <span className="profile__tab-text">Liked Palettes</span>
          </label>
          {isCheckedMyPalettes ? (
            hasUserPalettes ? (
              <ul className="profile__palette-list">
                {userPalettes.map((palette) => (
                  <PaletteCard
                    key={palette._id}
                    paletteImage={palette.image}
                    paletteColors={palette.colors}
                    paletteTitle={palette.title}
                    creator={palette.creator}
                    currentBGTheme={currentBGTheme}
                    onLike={() => handleLikePalette(palette._id)}
                    onUnlike={() => handleUnlikePalette(palette._id)}
                    liked={palette.liked === "liked"}
                  />
                ))}
              </ul>
            ) : (
              <h2>Create some palettes to start saving them here</h2>
            )
          ) : hasLikedpalettes ? (
            <ul className="profile__palette-list">
              {likedPalettes.map((palette) => (
                <PaletteCard
                  key={palette._id}
                  paletteImage={palette.image}
                  paletteColors={palette.colors}
                  paletteTitle={palette.title}
                  creator={palette.creator}
                  currentBGTheme={currentBGTheme}
                  onLike={() => handleLikePalette(palette._id)}
                  onUnlike={() => handleUnlikePalette(palette._id)}
                  liked={palette.liked === "liked"}
                />
              ))}
            </ul>
          ) : (
            <h2>Like some palettes to start saving them here</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
