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
  return new Promise((resolve, reject) => {
    try {
      resolve(palettes);
    } catch (error) {
      reject(new Error("Error fetching items"));
    }
  });
}

export function savePalette(palette) {
  return new Promise((resolve, reject) => {
    try {
      if (!palette.title || !palette.colors || !palette.creator) {
        throw new Error("Missing required fields");
      }

      const idNumb = palettes.length + 1;
      const newPalette = {
        _id: idNumb,
        title: palette.title,
        image: palette.image || null,
        colors: palette.colors,
        creator: palette.creator,
        liked: "",
      };

      palettes.unshift(newPalette);
      resolve(newPalette);
    } catch (error) {
      reject(error);
    }
  });
}

export function getUserPalettes(userName) {
  return new Promise((resolve, reject) => {
    try {
      const userPalettes = palettes.filter(
        (palette) => palette.creator === userName
      );
      resolve(userPalettes);
    } catch (error) {
      reject(new Error("Error fetching items"));
    }
  });
}

export function likePalette(paletteId) {
  return new Promise((resolve, reject) => {
    const palette = palettes.find((p) => p._id === paletteId);
    if (palette) {
      palette.liked = "liked";
      resolve(palette);
    } else {
      reject(new Error("Palette not found"));
    }
  });
}

export function unlikePalette(paletteId) {
  return new Promise((resolve, reject) => {
    const palette = palettes.find((p) => p._id === paletteId);
    if (palette) {
      palette.liked = "";
      resolve(palette);
    } else {
      reject(new Error("Palette not found"));
    }
  });
}

export function getLikedPalettes() {
  return new Promise((resolve, reject) => {
    try {
      const likedPalettes = palettes.filter(
        (palette) => palette.liked === "liked"
      );
      resolve(likedPalettes);
    } catch (error) {
      reject(new Error("Couldn't get liked palettes"));
    }
  });
}

function checkResponse(res) {
  return res ? res.json() : Promise.reject(`Error: ${res.status}`);
}

export function request(req) {
  return fetch(req).then(checkResponse);
}
