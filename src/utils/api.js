const palettes = [
  {
    _id: 0,
    title: "Palette 1",
    image: "",
    colors: [
      { c_id: 0, color: "#131313" },
      { c_id: 1, color: "#00FF00" },
      { c_id: 2, color: "#0000FF" },
      { c_id: 3, color: "#FFFF00" },
      { c_id: 4, color: "#00FFFF" },
    ],
    creator: "Olivia Bruce",
    liked: "",
  },
  {
    _id: 1,
    title: "Chicago Theater",
    image:
      "https://unsplash.com/photos/the-chicago-theatre-marquee-for-the-movie-chicago-78K2wtoinkc",
    colors: [
      { c_id: 0, color: "rgb(208, 199, 190)" },
      { c_id: 1, color: "rgb(94, 118, 128)" },
      { c_id: 2, color: "rgb(100, 71, 64)" },
      { c_id: 3, color: "rgb(156, 77, 70)" },
      { c_id: 4, color: "rgb(190, 127, 67)" },
    ],
    creator: "Olivia Bruce",
    liked: "",
  },
  {
    _id: 2,
    title: "Fairy Tale Castle",
    image:
      "https://unsplash.com/photos/a-large-white-castle-sitting-on-top-of-a-mountain-gW3QDkRLltk",
    colors: [
      { c_id: 0, color: "rgb(40, 30, 11)" },
      { c_id: 1, color: "rgb(189, 180, 173)" },
      { c_id: 2, color: "rgb(126, 100, 56)" },
      { c_id: 3, color: "rgb(100, 64, 26)" },
      { c_id: 4, color: "rgb(144, 135, 126" },
    ],
    creator: "fake user",
    liked: "",
  },
  {
    _id: 3,
    title: "Palette 4",
    image: "",
    colors: [
      { c_id: 0, color: "#FF0000" },
      { c_id: 1, color: "#00FF00" },
      { c_id: 2, color: "#0000FF" },
      { c_id: 3, color: "#FFFF00" },
      { c_id: 4, color: "#00FFFF" },
    ],
    creator: "Olivia Bruce",
    liked: "",
  },
  {
    _id: 4,
    title: "Palette 5",
    image: "",
    colors: [
      { c_id: 0, color: "#FF0000" },
      { c_id: 1, color: "#00FF00" },
      { c_id: 2, color: "#0000FF" },
      { c_id: 3, color: "#FFFF00" },
      { c_id: 4, color: "#00FFFF" },
    ],
    creator: "Olivia Bruce",
    liked: "",
  },
  {
    _id: 5,
    title: "Palette 6",
    image: "",
    colors: [
      { c_id: 0, color: "#FF0000" },
      { c_id: 1, color: "#00FF00" },
      { c_id: 2, color: "#0000FF" },
      { c_id: 3, color: "#FFFF00" },
      { c_id: 4, color: "#00FFFF" },
    ],
    creator: "Olivia Bruce",
    liked: "",
  },
  {
    _id: 6,
    title: "Palette 5",
    image: "",
    colors: [
      { c_id: 0, color: "#FF0000" },
      { c_id: 1, color: "#00FF00" },
      { c_id: 2, color: "#0000FF" },
      { c_id: 3, color: "#FFFF00" },
      { c_id: 4, color: "#00FFFF" },
    ],
    creator: "Olivia Bruce",
    liked: "",
  },
];

export function getItems() {
  return new Promise((resolve) => {
    resolve(palettes);
  });
}

export function savePalette(palette) {
  return new Promise((resolve, reject) => {
    const idNumb = palettes.length + 1;
    const newPalette = {
      _id: idNumb,
      title: palette.title,
      image: palette.imageUrl || "",
      colors: palette.colors,
      creator: palette.creator,
      liked: "",
    };
    palettes.push(newPalette); // Add the new palette to the palettes array
    resolve(newPalette);
  });
}

export function getUserPalettes(userName) {
  return new Promise((resolve, reject) => {
    const userPalettes = palettes.filter(
      (palette) => palette.creator === userName
    );
    resolve(userPalettes);
  });
}

function checkResponse(res) {
  return res ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
