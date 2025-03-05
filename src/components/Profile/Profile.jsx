import "./Profile.css";
import PaletteCard from "../PaletteCard/PaletteCard";
import { useContext, useState, useEffect } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import { defaultPalettes } from "../../utils/constants";
import { getUserPalettes } from "../../utils/api";

function Profile({ isLoggedIn, userName }) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [isCheckedMyPalettes, setIsCheckedMyPalettes] = useState(true);
  const [isCheckedSavedPalettes, setIsCheckedSavedPalettes] = useState(false);
  const [userPalettes, setUserPalettes] = useState([]);

  useEffect(() => {
    const fetchUserPalettes = async () => {
      if (isLoggedIn) {
        try {
          const palettes = await getUserPalettes(userName);
          setUserPalettes(palettes);
        } catch (error) {
          console.error("Error fetching user palettes:", error);
        }
      }
    };

    fetchUserPalettes();
  }, [isLoggedIn, userName]);

  const handleChangeSavedPalettes = () => {
    setIsCheckedSavedPalettes(true);
    setIsCheckedMyPalettes(false);
  };

  const handleChangeMyPalettes = () => {
    setIsCheckedMyPalettes(true);
    setIsCheckedSavedPalettes(false);
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
              <h1 className="profile__username">Olivia Bruce</h1>
              <button
                type="button"
                className="profile__button profile__edit-profile"
              >
                Edit Profile
              </button>
              <button type="button" className="profile__button profile__logout">
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
            <ul className="profile__palette-list">
              {userPalettes.map((palette) => (
                <PaletteCard
                  key={palette._id}
                  paletteImage={palette.image}
                  paletteColors={palette.colors}
                  paletteTitle={palette.title}
                  creator={palette.creator}
                  currentBGTheme={currentBGTheme}
                />
              ))}
            </ul>
          ) : (
            <ul className="profile__palette-list">
              {defaultPalettes.slice(3, 6).map((palette) => (
                <PaletteCard
                  key={palette._id}
                  paletteImage={palette.image}
                  paletteColors={palette.colors}
                  paletteTitle={palette.title}
                  creator={palette.creator}
                  currentBGTheme={currentBGTheme}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
