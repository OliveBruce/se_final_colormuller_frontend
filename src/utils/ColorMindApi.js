import { request } from "./api.js";
import { rgbToHex } from "./color.js";

export const getRandomPalette = () => {
  return request("http://colormind.io/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: '{"model":"default"}',
  });
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
