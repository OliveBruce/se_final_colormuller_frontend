import "./GeneratedPaletteModal.css";
import close_light from "../../assets/close.svg";
import close_dark from "../../assets/close_dark.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import { useContext, useState, useEffect } from "react";
import { getRandomPalette, filterPalette } from "../../utils/ColorMindApi";
import Preloader from "../Preloader/Preloader";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function GeneratedPaletteModal({
  isOpen,
  handleClose,
  isLoggedIn,
  onSavePaletteClick,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalette = async () => {
      setLoading(true);
      try {
        const palette = await getRandomPalette();
        const filteredPalette = filterPalette(palette.result);
        setPalette(filteredPalette);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchPalette();
    }
  }, [isOpen]);

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
        <div className="generated-card-modal__palette">
          {loading ? (
            <Preloader currentBGTheme={currentBGTheme} />
          ) : palette && palette.length > 0 ? (
            palette.map((color, index) => (
              <PaletteColor key={index} color={color} colorText={color} />
            ))
          ) : (
            <div>Nothing Found</div>
          )}
        </div>
        {!loading ? (
          <button
            onClick={onSavePaletteClick}
            type="button"
            className="generated-card-modal__save"
          >
            Save Palette
          </button>
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

export default GeneratedPaletteModal;
