import { request } from "./api.js";
import { rgbToHex } from "./color.js";

export const getRandomPalette = async () => {
  const response = await fetch(
    "https://www.google.com/search?q=%http://colormind.io/api/&btnI=Im+Feeling+Lucky",
    {
      method: "POST",
      body: JSON.stringify({ model: "default" }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch palette");
  }
  return response.json();
};

export const filterPalette = (palette) => {
  const result = [];
  for (let i = 0; i < palette.length; i++) {
    const color = palette[i];
    const colorHex = rgbToHex(color[0], color[1], color[2]);
    result.push(colorHex);
  }
  return result;
};
