import "./PaletteCard.css";
import LikeImage from "../../assets/like.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import rgbHex from "rgb-hex";

function PaletteCard({
  paletteImage,
  paletteTitle,
  paletteColors,
  creator,
  currentBGTheme,
}) {
  return (
    <div className="palette-card">
      <div
        className={
          "palette-card__container" +
          (currentBGTheme === "light"
            ? " palette-card__container--light"
            : " palette-card__container--dark")
        }
      >
        <div className="palette-card__header">
          <h2 className="palette-card__title">{paletteTitle}</h2>
          <img src={LikeImage} alt="Like" className="palette-card__like" />
        </div>
        <ul className="palette-card__palette">
          {paletteColors.map((color) => {
            if (color.color.includes("#")) {
              return (
                <PaletteColor
                  key={color.c_id}
                  color={color.color}
                  colorText={color.color}
                />
              );
            } else {
              const rgbHexColor = rgbHex(color.color);
              return (
                <PaletteColor
                  key={color.c_id}
                  colorText={rgbHexColor.toUpperCase()}
                  color={color.color}
                />
              );
            }
          })}
        </ul>
        {paletteImage !== "" && (
          <img
            src={paletteImage}
            alt={paletteTitle}
            className="palette-card__image"
          />
        )}
        <p className="palette-card__footer">by {creator}</p>
      </div>
    </div>
  );
}

export default PaletteCard;
