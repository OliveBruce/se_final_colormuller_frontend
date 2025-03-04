import "./BrowsePalettes.css";
import { defaultPalettes } from "../../utils/constants";
import PaletteCard from "../PaletteCard/PaletteCard";
import { useContext, useState } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function BrowsePalettes() {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [showNumber, setShowNumber] = useState(3);

  const showMore = () => {
    setShowNumber(showNumber + 3);
    console.log(showNumber);
  };

  return (
    <div
      className={
        "browse-palettes" +
        (currentBGTheme === "light"
          ? " browse-palettes--light"
          : " browse-palettes--dark")
      }
    >
      <h2 className="browse-palettes__title">Browse Palettes</h2>
      <div
        className={
          "browse-palettes__palettes" +
          (currentBGTheme === "light"
            ? " browse-palettes__palettes--light"
            : " browse-palettes__palettes--dark")
        }
      >
        <ul className="browse-palettes__palette-list">
          {defaultPalettes.slice(0, showNumber).map((palette) => {
            return (
              <PaletteCard
                key={palette._id}
                paletteImage={palette.image}
                paletteColors={palette.colors}
                paletteTitle={palette.title}
                creator={palette.creator}
                currentBGTheme={currentBGTheme}
              />
            );
          })}
        </ul>
        {showNumber < defaultPalettes.length ? (
          <button
            className="browse-palettes__show-more"
            type="button"
            onClick={showMore}
          >
            Show More
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default BrowsePalettes;
