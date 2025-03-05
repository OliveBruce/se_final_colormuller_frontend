import close_light from "../../assets/close.svg";
import close_dark from "../../assets/close_dark.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import { useContext, useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";
import { getRandomPhoto } from "../../utils/UnsplashApi";
import { getPhotoPalette, filterPhotoPalette } from "../../utils/ColorThiefApi";
import { savePalette } from "../../utils/api";

function GeneratedPaletteFromPhotoModal({
  isOpen,
  handleClose,
  photoDetails,
  isLoggedIn,
  onSavePaletteClick,
  userName,
  palettes,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(true);
  const [photo, setPhotoResponse] = useState(null);
  const [saving, setIsSaving] = useState(false);
  const [paletteTitle, setPaletteTitle] = useState("");

  useEffect(() => {
    const fetchPhotoAndPalette = async () => {
      setLoading(true);
      try {
        let photoToUse = photoDetails;
        if (!photoToUse) {
          photoToUse = await getRandomPhoto();
        }
        setPhotoResponse(photoToUse);
        const palette = await getPhotoPalette(photoToUse.urls.small);
        const filteredPalette = filterPhotoPalette(palette);
        setPalette(filteredPalette);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPhotoAndPalette();
    }
  }, [isOpen]);

  const handleSavePaletteClick = async () => {
    return setIsSaving(true);
  };

  const handleInputChange = (e) => {
    setPaletteTitle(e.target.value);
  };

  const handleSavePalette = async () => {
    const idNumb = palettes.length + 1;
    const newPalette = {
      _id: idNumb,
      title: paletteTitle,
      imageUrl: photo.links.html,
      colors: palette.map((color) => ({ color })),
      creator: userName,
    };
    console.log(newPalette);
    await savePalette(newPalette);
    handleClose();
  };

  return (
    <div className={`generated-card-modal ${isOpen && "modal__opened"}`}>
      <div
        className={
          "generated-card-modal__container" +
          (currentBGTheme === "light"
            ? " generated-card-modal__container--light"
            : " generated-card-modal__container--dark")
        }
      >
        <div className="generated-card-modal__palette-section">
          {loading ? (
            <Preloader currentBGTheme={currentBGTheme} />
          ) : palette.length > 0 && photo ? (
            <>
              <div className="generated-card-modal__palette">
                {palette.map((color, index) => (
                  <PaletteColor key={index} color={color} colorText={color} />
                ))}
              </div>
              <div>
                <a
                  href={photo.links.html}
                  className="header__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="generated-card-modal__image"
                    src={photo.urls.small}
                    alt={photo.alt_description}
                  />
                </a>
                <p className="generated-card-modal__image-description">
                  Photo Uploaded by{" "}
                  <a
                    href={photo.user.links.html}
                    className="generated-card-modal__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {photo.user.name}
                  </a>{" "}
                  on{" "}
                  <a
                    href="https://unsplash.com/"
                    className="generated-card-modal__link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Unsplash
                  </a>{" "}
                </p>
              </div>
            </>
          ) : (
            <div>Nothing Found</div>
          )}
        </div>
        {!loading ? (
          <>
            {saving ? (
              <form>
                <input
                  type="text"
                  className="modal__input"
                  id="palette-title"
                  placeholder="Palette Title"
                  autoComplete="off"
                  value={paletteTitle}
                  onChange={handleInputChange}
                />
                <button
                  onClick={handleSavePalette}
                  type="button"
                  className="generated-card-modal__save"
                >
                  Save
                </button>
              </form>
            ) : (
              <button
                onClick={handleSavePaletteClick}
                type="button"
                className="generated-card-modal__save"
              >
                Save Palette
              </button>
            )}
          </>
        ) : (
          ""
        )}
        <button onClick={handleClose} type="button" className="modal__close">
          {currentBGTheme === "light" ? (
            <img src={close_dark} alt="close" className="modal__close-btn" />
          ) : (
            <img src={close_light} alt="close" className="modal__close-btn" />
          )}
        </button>
      </div>
    </div>
  );
}

export default GeneratedPaletteFromPhotoModal;
