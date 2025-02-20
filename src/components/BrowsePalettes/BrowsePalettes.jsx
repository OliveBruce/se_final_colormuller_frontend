import "./BrowsePalettes.css";
import { defaultPalettes } from "../../utils/constants";
import PaletteCard from "../PaletteCard/PaletteCard";

function BrowsePalettes() {
  return (
    <div className="browse-palettes">
      <h2 className="browse-palettes__title">Browse Palettes</h2>
      <div className="browse-palettes__palettes">
        <ul className="browse-palettes__palette-list">
          {defaultPalettes.map((palette) => {
            return (
              <PaletteCard
                key={palette._id}
                paletteImage={palette.image}
                paletteColors={palette.colors}
                paletteTitle={palette.title}
                creator={palette.creator}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default BrowsePalettes;
