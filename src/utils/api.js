export function getItems() {
  return new Promise((resolve, reject) =>
    resolve([
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
      },
      {
        _id: 1,
        title: "Chicago Theater",
        image:
          "https://images.unsplash.com/photo-1735055147306-0169303a218b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        colors: [
          { c_id: 0, color: "rgb(208, 199, 190)" },
          { c_id: 1, color: "rgb(94, 118, 128)" },
          { c_id: 2, color: "rgb(100, 71, 64)" },
          { c_id: 3, color: "rgb(156, 77, 70)" },
          { c_id: 4, color: "rgb(190, 127, 67)" },
        ],
        creator: "Olivia Bruce",
      },
      {
        _id: 2,
        title: "Fairy Tale Castle",
        image:
          "https://images.unsplash.com/photo-1739897725970-669accdebea1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        colors: [
          { c_id: 0, color: "rgb(40, 30, 11)" },
          { c_id: 1, color: "rgb(189, 180, 173)" },
          { c_id: 2, color: "rgb(126, 100, 56)" },
          { c_id: 3, color: "rgb(100, 64, 26)" },
          { c_id: 4, color: "rgb(144, 135, 126" },
        ],
        creator: "Olivia Bruce",
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
      },
    ])
  );
}

export function savePalette(palette) {
  return new Promise((resolve, reject) => {
    resolve({
      _id: "65f7371e7bce9e7d331b11a0", // another one made up from the generator
      title: article.title,
      image: article.imagUrl,
      // whatever other properties from the newsAPI-given article object you saved to the database
    });
  });
}
