import "./Footer.css";
import { useContext } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function Footer() {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);

  return (
    <footer
      className={
        "footer" +
        (currentBGTheme === "light" ? " footer--light" : " footer--dark")
      }
    >
      <p className="footer__copyright-name">Developed by Olivia Bruce</p>
      <p className="footer__copyright-year">©2024</p>
    </footer>
  );
}

export default Footer;
