import "./PaletteColor.css";

function PaletteColor({ color, colorText }) {
  const isHex = colorText && colorText.includes("#");
  return (
    <div
      className="palette-color__color"
      style={{ backgroundColor: `${color}` }}
    >
      {isHex ? (
        <p className="generate-card__color-name">{colorText}</p>
      ) : (
        <p className="generate-card__color-name">
          {"#"}
          {colorText}
        </p>
      )}
    </div>
  );
}

export default PaletteColor;
