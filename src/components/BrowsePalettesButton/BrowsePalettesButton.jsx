import "./BrowsePalettesButton.css";
import { Link } from "react-router-dom";

function BrowsePalettesButton() {
  return (
    <Link to="/browse-palettes" className="header__link">
      <button type="button" className="header__browse-btn">
        Browse Palettes
      </button>
    </Link>
  );
}

export default BrowsePalettesButton;
