import "./Header.css";
import logo from "../../assets/colormuller.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import UserButton from "../UserButton/UserButton";

function Header({ onSignUpClick, onLoginClick, onUploadImageClick }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <div className="header__logo-container">
          <img className="header__logo" alt="ColorMuller logo" src={logo} />
          <p className="header__site-name">ColorMuller</p>
        </div>
      </Link>
      <div className="header__user-container">
        <ToggleSwitch />
        <Link to="/browse-palettes" className="header__link">
          <button
            onClick={onUploadImageClick}
            type="button"
            className="header__browse-btn"
          >
            Browse Palettes
          </button>
        </Link>
        <UserButton onButtonClick={onLoginClick} buttonText="Log In" />
        <UserButton onButtonClick={onSignUpClick} buttonText="Sign Up" />
      </div>
    </header>
  );
}

export default Header;
