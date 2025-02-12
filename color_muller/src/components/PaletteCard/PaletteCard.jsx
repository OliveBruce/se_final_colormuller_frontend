import "./PaletteCard.css";
import LikeImage from "../../assets/like.svg";
import PaletteColor from "../PaletteColor/PaletteColor";

function PaletteCard() {
  return (
    <div className="palette-card">
      <div className="palette-card__header">
        <h2 className="palette-card__title">Palette Name</h2>
        <img src={LikeImage} alt="Like" className="palette-card__like" />
      </div>
      <div className="palette-card__palette">
        <PaletteColor color="E1E6EC" textColor="232323" />
        <PaletteColor color="E1E6EC" textColor="232323" />
        <PaletteColor color="E1E6EC" textColor="232323" />
        <PaletteColor color="E1E6EC" textColor="232323" />
        <PaletteColor color="E1E6EC" textColor="232323" />
      </div>
      <p className="palette-card__author">by Author</p>
    </div>
  );
}

export default PaletteCard;
