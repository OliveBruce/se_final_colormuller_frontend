import "./PaletteCard.css";
import LikeImage from "../../assets/like.svg";
import LikedImage from "../../assets/liked.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import rgbHex from "rgb-hex";
import { useState, useEffect } from "react";

function PaletteCard({
  paletteImage,
  paletteTitle,
  paletteColors,
  creator,
  currentBGTheme,
  onLike,
  onUnlike,
  liked,
  fetchImageUrl,
  isLoggedIn,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [imageAuthorLink, setImageAuthorLink] = useState("");
  const [isLiked, setIsLiked] = useState(liked);

  useEffect(() => {
    const fetchImage = async () => {
      if (paletteImage && fetchImageUrl) {
        try {
          const imageData = await fetchImageUrl(paletteImage);
          setImageUrl(imageData.urls.small);
          setImageAlt(imageData.alt_description || "Palette Image");
          setImageLink(imageData.links.html);
          setImageAuthor(imageData.user.name);
          setImageAuthorLink(imageData.user.links.html);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };
    if (paletteImage !== null) {
      fetchImage();
    }
  }, []);

  const handleLikeClick = () => {
    if (isLoggedIn) {
      if (isLiked) {
        if (onUnlike) {
          onUnlike();
        }
      } else {
        if (onLike) {
          onLike();
        }
      }
      setIsLiked(!isLiked);
    }
  };

  return (
    <div className="palette-card">
      <div
        className={
          "palette-card__container" +
          (currentBGTheme === "light"
            ? " palette-card__container--light"
            : " palette-card__container--dark")
        }
      >
        <div className="palette-card__header">
          <h2 className="palette-card__title">{paletteTitle}</h2>
          {isLiked && isLoggedIn ? (
            <img
              src={LikedImage}
              alt="Like"
              className="palette-card__like"
              onClick={handleLikeClick}
            />
          ) : (
            <img
              src={LikeImage}
              alt="Like"
              className="palette-card__like"
              onClick={handleLikeClick}
            />
          )}
        </div>
        <ul className="palette-card__palette">
          {paletteColors.map((color) => {
            if (color.color.includes("#")) {
              return (
                <PaletteColor
                  key={color.c_id}
                  color={color.color}
                  colorText={color.color}
                />
              );
            } else {
              const rgbHexColor = rgbHex(color.color);
              return (
                <PaletteColor
                  key={color.c_id}
                  colorText={rgbHexColor.toUpperCase()}
                  color={color.color}
                />
              );
            }
          })}
        </ul>
        {imageUrl && (
          <>
            <a
              href={imageLink}
              className="header__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={imageUrl}
                alt={imageAlt}
                className="palette-card__image"
              />
            </a>
            <div>
              <p className="palette-card__image-description">
                Photo Uploaded by{" "}
                <a
                  href={imageAuthorLink}
                  className="palette-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {imageAuthor}
                </a>{" "}
                on{" "}
                <a
                  href="https://unsplash.com/"
                  className="palette-card__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Unsplash
                </a>{" "}
              </p>
            </div>
          </>
        )}

        <p className="palette-card__footer">by {creator}</p>
      </div>
    </div>
  );
}

export default PaletteCard;
