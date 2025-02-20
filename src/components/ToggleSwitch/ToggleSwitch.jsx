import "./ToggleSwitch.css";
import moon from "../../assets/moon.svg";
import sun from "../../assets/sun.svg";
import { React, useContext } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

const ToggleSwitch = () => {
  const { currentBGPreference, handleToggleSwitchChange } = useContext(
    CurrentBackgroundPreference
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span className="switch__slider"></span>
      <img className="switch__moon" alt="Moon svg" src={moon} />
      <img className="switch__sun" alt="Sun svg" src={sun} />
    </label>
  );
};

export default ToggleSwitch;
