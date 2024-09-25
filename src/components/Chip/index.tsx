import React from "react";
import ImageWithSkeletonLoader from "../ImageWithSkeletonLoader";

import styles from "./styles.module.css";

interface ChipProps {
  label: string;
  image?: string;
}

const Chip: React.FC<ChipProps> = ({ label, image = "" }) => {
  return (
    <div className={styles["chip"]}>
      <ImageWithSkeletonLoader
        src={image}
        alt={label}
        className={styles["chip-image"]}
      />
      <label className={styles["chip-label"]}>{label}</label>
    </div>
  );
};

export default Chip;
