import ColorThief from "colorthief";
import { rgbToHex } from "./color.js";

export const getPhotoPalette = (url) => {
  return new Promise((resolve, reject) => {
    if (!url) {
      reject();
    }
    const image = new Image();
    image.src = url;
    image.crossOrigin = "Anonymous";

    image.onload = function () {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(this, 5);
      resolve(palette);
    };
  });
};

export const filterPhotoPalette = (palette) => {
  if (!Array.isArray(palette) || palette.length < 5) {
    throw new Error("Invalid palette data");
  }

  const result = [];
  for (let i = 0; i < 5; i++) {
    const color = palette[i];
    const colorHex = rgbToHex(color[0], color[1], color[2]);
    result.push(colorHex);
  }
  return result;
};
