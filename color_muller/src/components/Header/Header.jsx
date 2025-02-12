import "./Header.css";
import logo from "../../assets/colormuller.svg";
import { useContext } from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import UserButton from "../UserButton/UserButton";

function Header({ onSignUpClick, onLoginClick, onUploadImageClick }) {
  return (
    <header className="header">
      <img className="header__logo" alt="ColorMuller logo" src={logo} />
      <p className="header__site-name">ColorMuller</p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button
          onClick={onUploadImageClick}
          type="button"
          className="header__browse-btn"
        >
          Browse Collections
        </button>
        <UserButton onButtonClick={onLoginClick} buttonText="Log In" />
        <UserButton onButtonClick={onSignUpClick} buttonText="Sign Up" />
      </div>
    </header>
  );
}

export default Header;
