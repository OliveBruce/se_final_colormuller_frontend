import "./Preloader.css";

function Preloader({ currentBGTheme }) {
  return (
    <div className="preloader">
      <div className="circle-preloader"></div>
      <div
        className={
          "preloader__text" +
          (currentBGTheme === "light"
            ? " preloader__text--light"
            : " preloader__text--dark")
        }
      >
        Generating Palette...
      </div>
    </div>
  );
}

export default Preloader;
