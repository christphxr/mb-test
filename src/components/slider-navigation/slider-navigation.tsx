import styles from "./slider-navigation.module.css";

interface SliderNavigationProps {
  label: string;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const SliderNavigation = ({
  label,
  onPrevClick,
  onNextClick,
}: SliderNavigationProps) => {
  return (
    <div className={styles.sliderNavigation}>
      <button
        aria-label="Previous Category"
        type="button"
        className={styles.control}
        onClick={onPrevClick}
      >
        {"<"}
      </button>
      <h2 className={styles.label}>{label}</h2>
      <button
        aria-label="Next Category"
        type="button"
        className={styles.control}
        onClick={onNextClick}
      >
        {">"}
      </button>
    </div>
  );
};
