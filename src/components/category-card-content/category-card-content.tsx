import type { Product } from "@/types";
import cn from "classnames";
import styles from "./category-card-content.module.css";
import Image from "next/image";

interface CategoryCardContentProps {
  classname?: string;
  products: Product[];
}

export const CategoryCardContent = ({
  products,
  classname,
}: CategoryCardContentProps) => {
  return products.map((product) => {
    if (!product.name || !product.icon || !product.description) {
      return null;
    }

    return (
      <details
        className={cn(styles.categoryCardContent, classname)}
        key={product.id}
      >
        <summary className={styles.categoryLabel}>{product.name}</summary>
        <div className={styles.productDetails}>
          <Image
            src={`assets/${product.icon}.svg`}
            alt={`${product.name} icon`}
            width={50}
            height={50}
            className={styles.productIcon}
          />
          <p className={styles.productDescription}>{product.description}</p>
        </div>
      </details>
    );
  });
};
