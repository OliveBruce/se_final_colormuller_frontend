import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "YmeWlOtT8SUcxQENGElcbKLsucSvAaQzWFAjsfDM1dE",
});

export const getRandomPhoto = () => {
  return api.photos
    .getRandom({})
    .then((result) => {
      console.log(result);
      return result.response;
    })
    .catch(() => {
      console.log("something went wrong!");
      throw error;
    });
};

export const getPhotoUpload = (url) => {
  if (typeof url !== "string") {
    throw new Error("Invalid URL");
  }
  const photoId = extractPhotoIdFromUrl(url);
  return api.photos
    .get({ photoId })
    .then((result) => {
      return result.response;
    })
    .catch((error) => {
      console.log("something went wrong!", error);
      throw error;
    });
};

const extractPhotoIdFromUrl = (url) => {
  const regex = /photos\/([^/?]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Invalid Unsplash photo URL");
  }
};
