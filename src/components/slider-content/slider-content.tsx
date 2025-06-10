import { cloneElement } from "react";
import styles from "./slider-content.module.css";

interface SliderContentProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  items: React.ReactNode[];
}

export const SliderContent = ({
  activeIndex,
  items,
  setActiveIndex,
}: SliderContentProps) => {
  return (
    <ul className={styles.sliderContent}>
      {items.map((item, index) => (
        <li
          onClick={() => setActiveIndex(index)}
          key={index}
          className={`${styles.sliderItem} ${
            activeIndex === index ? styles.active : ""
          }`}
          // onClick={() => setActiveIndex(index)}
        >
          {cloneElement(item as React.ReactElement, {
            expanded: activeIndex === index,
          })}
        </li>
      ))}
    </ul>
  );
};
