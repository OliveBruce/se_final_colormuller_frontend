import "./Header.css";
import logo from "../../assets/colormuller.svg";
import { useContext } from "react";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({ onSignUpClick }) {
  return (
    <header className="header">
      <img className="header__logo" alt="ColorMuller logo" src={logo} />
      <p className="header__site-name">ColorMuller</p>
      <div className="header__user-container">
        <ToggleSwitch />
        <button type="button" className="header__browse-btn">
          Browse Collections
        </button>
        <button type="button" className="header__user-btn header__login">
          Login
        </button>
        <button
          onClick={onSignUpClick}
          type="button"
          className="header__user-btn header__signup"
        >
          Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;
