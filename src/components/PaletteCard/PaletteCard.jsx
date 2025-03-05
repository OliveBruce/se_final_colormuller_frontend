import "./PaletteCard.css";
import LikeImage from "../../assets/like.svg";
import PaletteColor from "../PaletteColor/PaletteColor";
import rgbHex from "rgb-hex";
import { useState, useEffect } from "react";
import { getPhotoUpload } from "../../utils/UnsplashApi";

function PaletteCard({
  paletteImage,
  paletteTitle,
  paletteColors,
  creator,
  currentBGTheme,
}) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageAuthor, setImageAuthor] = useState("");
  const [imageAuthorLink, setImageAuthorLink] = useState("");

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const photo = await getPhotoUpload(paletteImage);
        setImageUrl(photo.urls.small);
        setImageAlt(photo.alt_description);
        setImageLink(photo.links.html);
        setImageAuthor(photo.user.name);
        setImageAuthorLink(photo.user.links.html);
      } catch (error) {
        console.error("Error fetching photo:", error);
      }
    };

    if (paletteImage) {
      fetchImageUrl();
    }
  }, [paletteImage]);

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
          <img src={LikeImage} alt="Like" className="palette-card__like" />
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
        {paletteImage !== "" && (
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
