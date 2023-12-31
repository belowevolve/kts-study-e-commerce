import cn from "classnames";
import * as React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import LeftArrow from "styles/svg/arrowLeft.svg";
import styles from "./ImageSlider.module.scss";
import "react-image-gallery/styles/scss/image-gallery.scss";

export type ImageSliderProps = {
  images: readonly ReactImageGalleryItem[];
  className?: string;
};
const ImageSlider: React.FC<ImageSliderProps> = ({ images, className }) => {
  return (
    <div className={cn(styles.slider, className)}>
      <ImageGallery
        showPlayButton={false}
        showBullets={true}
        showNav={window.matchMedia("(max-width: 900px)").matches ? false : true}
        showFullscreenButton={
          window.matchMedia("(max-width: 900px)").matches ? false : true
        }
        items={images}
        infinite={false}
        slideDuration={450}
        lazyLoad={true}
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

export default React.memo(ImageSlider);
