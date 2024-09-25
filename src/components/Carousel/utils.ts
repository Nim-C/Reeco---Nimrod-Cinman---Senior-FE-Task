import { Nullable } from "@/types";
import { LEFT, RIGHT } from "./constants";
import { AvailableScrolls } from "./types";

export const calculateScrollNext = ({
  scrollRightPosition,
  scrollWidth,
  clientWidth,
}: {
  scrollRightPosition: number;
  scrollWidth: number;
  clientWidth: number;
}): number => {
  return scrollWidth - scrollRightPosition - clientWidth;
};

export const calculateAvailableScrollingSize = ({
  itemsContainerElement,
  carouselItemWidth,
  carouselItemGap,
  scrollRightPosition,
}: {
  itemsContainerElement: HTMLDivElement;
  carouselItemWidth: number;
  carouselItemGap: number;
  scrollRightPosition: number;
}): AvailableScrolls => {
  const { scrollWidth, clientWidth } = itemsContainerElement;
  const itemWithGapWidth = carouselItemWidth + carouselItemGap;

  return {
    [LEFT]: Math.min(itemWithGapWidth, scrollRightPosition),
    [RIGHT]: Math.min(
      itemWithGapWidth,
      calculateScrollNext({
        scrollRightPosition,
        scrollWidth,
        clientWidth,
      })
    ),
  };
};

export const getFirstElementWidth = ({
  itemsContainerElement,
}: {
  itemsContainerElement: Nullable<HTMLDivElement>;
}): number => {
  return itemsContainerElement?.firstElementChild?.clientWidth ?? 0;
};

export const getGapBetweenItems = ({
  itemsContainerElement,
}: {
  itemsContainerElement: Nullable<HTMLDivElement>;
}): number => {
  return +(
    itemsContainerElement
      ?.computedStyleMap()
      .get("gap")
      ?.toString()
      .replace("px", "") ?? 0
  );
};
