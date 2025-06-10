import type { Product } from "@/types";
import cn from "classnames";
import styles from "./category-card.module.css";
import { CategoryCardContent } from "../category-card-content/category-card-content";

interface CategoryCardProps {
  label: string;
  products: Product[];
  expanded?: boolean;
}

export const CategoryCard = ({
  label,
  expanded,
  products,
}: CategoryCardProps) => {
  return (
    <article className={styles.categoryCard}>
      <h2 className={styles.categoryLabel}>{label}</h2>
      <CategoryCardContent
        products={products}
        classname={cn({
          [styles.contentHidden]: !expanded,
        })}
      />
    </article>
  );
};
