import * as React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { ReactComponent as LeftArrow } from "styles/svg/arrowLeft.svg";
import styles from "./ImageSlider.module.scss";
import "react-image-gallery/styles/css/image-gallery.css";

export type ImageSliderProps = {
  images: readonly ReactImageGalleryItem[];
};
const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className={styles.slider}>
      <ImageGallery
        showPlayButton={false}
        showBullets={true}
        showNav={window.matchMedia("(max-width: 900px)").matches ? false : true}
        items={images}
        infinite={false}
        slideDuration={200}
        renderLeftNav={(onClick, disabled) => (
          <button
            className={styles.slider__left}
            onClick={onClick}
            disabled={disabled}
          >
            <LeftArrow />
          </button>
        )}
        renderRightNav={(onClick, disabled) => (
          <button
            className={styles.slider__right}
            onClick={onClick}
            disabled={disabled}
          >
            <LeftArrow style={{ transform: "rotate(180deg)" }} />
          </button>
        )}
      />
    </div>
  );
};

export default ImageSlider;
