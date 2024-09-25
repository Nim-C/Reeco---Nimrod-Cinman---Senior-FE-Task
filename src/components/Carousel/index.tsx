import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { clsx } from "clsx";

import { Nullable } from "@/types";
import { AvailableScrolls, Direction } from "./types";
import {
  getFirstElementWidth,
  calculateAvailableScrollingSize,
  calculateScrollNext,
  getGapBetweenItems,
} from "./utils";
import { LEFT, RIGHT } from "./constants";

import styles from "./styles.module.css";

type CarouselProps = {
  children: React.ReactNode[];
  className?: string;
};

const Carousel: React.FC<CarouselProps> = ({ children, className }) => {
  const carouselItemGap = useRef<number>(0);
  const carouselItemWidth = useRef<number>(0);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const scrollRightPosition = useRef<number>(0);
  const [arrowPrevEnabled, setArrowPrevEnabled] = useState<boolean>(false);
  const [arrowNextEnabled, setArrowNextEnabled] = useState<boolean>(false);

  const checkArrows = useCallback(() => {
    if (itemsContainerRef.current) {
      const { clientWidth, scrollWidth } = itemsContainerRef.current;

      setArrowPrevEnabled(0 < scrollRightPosition.current);
      setArrowNextEnabled(
        0 <
          calculateScrollNext({
            scrollRightPosition: scrollRightPosition.current,
            scrollWidth,
            clientWidth,
          })
      );
    }
  }, []);

  const getAvailableScrollingMove = (): Nullable<AvailableScrolls> => {
    const itemsContainer = itemsContainerRef.current;
    if (!itemsContainer) return null;

    const availableScrollWidth = calculateAvailableScrollingSize({
      itemsContainerElement: itemsContainer,
      carouselItemWidth: carouselItemWidth.current,
      carouselItemGap: carouselItemGap.current,
      scrollRightPosition: scrollRightPosition.current,
    });

    return availableScrollWidth;
  };

  const scroll = (direction: Direction) => () => {
    const scrollingSize: Nullable<AvailableScrolls> =
      getAvailableScrollingMove();
    if (!scrollingSize) return;

    const scrollPositionAddition =
      scrollingSize[direction] * (direction === LEFT ? -1 : 1);
    scrollRightPosition.current += scrollPositionAddition;

    const scrollObj: ScrollToOptions = {
      left: scrollRightPosition.current,
      behavior: "smooth",
    };
    itemsContainerRef.current?.scroll(scrollObj);

    checkArrows();
  };

  useEffect(() => {
    checkArrows();
    carouselItemWidth.current = getFirstElementWidth({
      itemsContainerElement: itemsContainerRef.current,
    });
    carouselItemGap.current = getGapBetweenItems({
      itemsContainerElement: itemsContainerRef.current,
    });
  }, [checkArrows]);

  return (
    <div className={clsx(styles["carousel-container"], className)}>
      <button
        disabled={!arrowPrevEnabled}
        name="scroll-backward"
        onClick={scroll(LEFT)}
      >
        <ChevronLeft />
      </button>
      <div className={styles["carousel"]}>
        <div ref={itemsContainerRef} className={styles["items-container"]}>
          {children?.map((child, index) => (
            <div key={index} className={styles["item"]}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        disabled={!arrowNextEnabled}
        name="scroll-forward"
        onClick={scroll(RIGHT)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
