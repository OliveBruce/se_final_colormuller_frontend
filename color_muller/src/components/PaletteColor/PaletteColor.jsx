import "./PaletteColor.css";

function PaletteColor({ color, textColor }) {
  return (
    <div
      className="palette-color__color"
      style={{ backgroundColor: `#${color}`, color: `#${textColor}` }}
    >
      <p className="generate-card__color-name">#{color}</p>
    </div>
  );
}

export default PaletteColor;
