import { useState, useEffect } from "react";
import GenerateCard from "../GenerateCard/GenerateCard";
import PaletteColor from "../PaletteColor/PaletteColor";

function GenerateCardPalette({ onGeneratePaletteClick, currentBGTheme }) {
  return (
    <GenerateCard
      title="RANDOM COLOR PALETTE"
      onGenerateClick={onGeneratePaletteClick}
      currentBGTheme={currentBGTheme}
    >
      <div className="generate-card__palette">
        <PaletteColor color="#E1E6EC" colorText="#E1E6EC" />
        <PaletteColor color="#FBC301" colorText="#FBC301" />
        <PaletteColor color="#7A4201" colorText="#7A4201" />
        <PaletteColor color="#576872" colorText="#576872" />
        <PaletteColor color="#252A2E" colorText="#252A2E" />
      </div>
    </GenerateCard>
  );
}

export default GenerateCardPalette;
