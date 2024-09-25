import React, { useState, useEffect } from "react";
import { clsx } from "clsx";

import styles from "./styles.module.css";

interface ImageWithSkeletonLoaderProps {
  src: string;
  alt: string;
  className?: string;
}

const ImageWithSkeletonLoader: React.FC<ImageWithSkeletonLoaderProps> = ({
  src,
  alt,
  className,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setImageLoaded(true);
  }, [src]);

  return (
    <div className={clsx(styles["image-container"], className)}>
      {!imageLoaded && <div className={styles["skeleton-loader"]}></div>}
      <img
        src={src}
        alt={alt}
        className={clsx(styles["image"], styles["loaded"])}
      />
    </div>
  );
};

export default ImageWithSkeletonLoader;
