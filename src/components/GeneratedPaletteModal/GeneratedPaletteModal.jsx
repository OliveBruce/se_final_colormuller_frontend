import "./GeneratedPaletteModal.css";
import close from "../../assets/close.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import rgbHex from "rgb-hex";
import { useContext } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function GeneratedPaletteModal({ isOpen, handleClose }) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
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
          <PaletteColor color="#E1E6EC" colorText="#E1E6EC" />
          <PaletteColor color="#FBC301" colorText="#FBC301" />
          <PaletteColor color="#7A4201" colorText="#7A4201" />
          <PaletteColor color="#576872" colorText="#576872" />
          <PaletteColor color="#252A2E" colorText="#252A2E" />
        </div>
        <img
          src="https://plus.unsplash.com/premium_photo-1736165168647-e216dcd23720?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="generated-card-modal__image"
        />
        <button onClick={handleClose} type="button" className="modal__close">
          <img
            src={close}
            alt="close"
            className="generated-card-modal__close-btn"
          />
        </button>
      </div>
    </div>
  );
}

export default GeneratedPaletteModal;
