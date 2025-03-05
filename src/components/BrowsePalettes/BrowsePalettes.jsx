import "./BrowsePalettes.css";
import PaletteCard from "../PaletteCard/PaletteCard";
import { useContext, useState, useEffect } from "react";
import { CurrentBackgroundPreference } from "../../contexts/CurrentBackgroundPreference";

function BrowsePalettes({
  palettes,
  handleLikePalette,
  handleUnlikePalette,
  isLoggedIn,
}) {
  const { currentBGTheme } = useContext(CurrentBackgroundPreference);
  const [showNumber, setShowNumber] = useState(3);

  const showMore = () => {
    setShowNumber(showNumber + 3);
  };

  const handleLike = (paletteId) => {
    if (isLoggedIn) {
      handleLikePalette(paletteId);
    } else {
      alert("You need to be logged in to like a palette.");
    }
  };

  const handleUnlike = (paletteId) => {
    if (isLoggedIn) {
      handleUnlikePalette(paletteId);
    } else {
      alert("You need to be logged in to unlike a palette.");
    }
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
          {palettes.slice(0, showNumber).map((palette) => {
            return (
              <PaletteCard
                key={palette._id}
                paletteImage={palette.image}
                paletteColors={palette.colors}
                paletteTitle={palette.title}
                creator={palette.creator}
                currentBGTheme={currentBGTheme}
                onLike={() => handleLike(palette._id)}
                onUnlike={() => handleUnlike(palette._id)}
                liked={palette.liked === "liked"}
              />
            );
          })}
        </ul>
        {showNumber < palettes.length ? (
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
