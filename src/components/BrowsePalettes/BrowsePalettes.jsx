import "./BrowsePalettes.css";
import { defaultPalettes } from "../../utils/constants";
import PaletteCard from "../PaletteCard/PaletteCard";
import { useContext } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function BrowsePalettes() {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);

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
          {defaultPalettes.map((palette) => {
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
      </div>
    </div>
  );
}

export default BrowsePalettes;
