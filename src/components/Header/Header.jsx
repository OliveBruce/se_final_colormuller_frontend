import "./Header.css";
import logo from "../../assets/colormuller.svg";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import UserButton from "../UserButton/UserButton";
import BrowsePalettesButton from "../BrowsePalettesButton/BrowsePalettesButton";

function Header({ onSignUpClick, onLoginClick, isLoggedIn }) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);

  return (
    <header
      className={
        "header" +
        (currentBGTheme === "light" ? " header--light" : " header--dark")
      }
    >
      <Link to="/" className="header__link">
        <div className="header__logo-container">
          <img className="header__logo" alt="ColorMuller logo" src={logo} />
          <p className="header__site-name">ColorMuller</p>
        </div>
      </Link>
      <div className="header__user-container">
        <ToggleSwitch />
        <BrowsePalettesButton />
        {isLoggedIn ? (
          <Link to="/profile" className="header__link">
            <div className="header__user-btn-container">
              <button className="header__user-btn" type="button">
                <p className="header__user-btn-text">My Profile</p>
                <img
                  className="header__user-btn-avatar"
                  src="https://images.unsplash.com/photo-1739208831882-8be117b564ce?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="avatar"
                />
              </button>
            </div>
          </Link>
        ) : (
          <div className="header__user-btn-container">
            <UserButton onButtonClick={onLoginClick} buttonText="Log In" />
            <UserButton onButtonClick={onSignUpClick} buttonText="Sign Up" />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
