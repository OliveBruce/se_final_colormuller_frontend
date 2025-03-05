const modeList = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "analogic-complement",
  "triad",
  "quad",
];

const getRandomMode = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomHexColor = () => {
  return Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0");
};

export const getRandomPalette = async () => {
  const randomMode = getRandomMode(modeList);
  const randomHexColor = getRandomHexColor();
  const response = await fetch(
    `https://www.thecolorapi.com/scheme?hex=${randomHexColor}&mode=${randomMode}&count=5`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch palette");
  }

  const data = await response.json();
  return data.colors.map((color) => color.hex.value);
};
