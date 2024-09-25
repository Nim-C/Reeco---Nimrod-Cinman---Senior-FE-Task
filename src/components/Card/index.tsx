import React from "react";

import ImageWithSkeletonLoader from "@/components/ImageWithSkeletonLoader";

import styles from "./styles.module.css";

interface CardProps {
  name: string;
  description: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ name: title, description, image }) => {
  return (
    <div className={styles["card"]}>
      <h2 className={styles["name"]}>{title}</h2>
      <p className={styles["description"]}>{description}</p>
      <ImageWithSkeletonLoader
        src={image}
        alt={title}
        className={styles["image-wrapper"]}
      />
    </div>
  );
};

export default Card;
