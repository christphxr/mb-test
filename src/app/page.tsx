import styles from "./page.module.css";
import type { CategoryApiResponse } from "@/types";
import HomeContent from "@/components/home-content/home-content";

export const dynamic = "force-dynamic";

export const getData = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/categories");

    const { data } = (await response.json()) as { data: CategoryApiResponse };
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return null;
  }
};

export default async function Home() {
  const data = await getData();
  if (!data) {
    return <div className={styles.error}>Failed to load categories.</div>;
  }
  return (
    <div className={styles.page}>
      <HomeContent data={data} />
    </div>
  );
}
