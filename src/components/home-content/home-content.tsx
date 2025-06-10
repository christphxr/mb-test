"use client";
import { useState } from "react";
import { CategoryCard } from "@/components/category-card/category-card";
import { SliderNavigation } from "@/components/slider-navigation/slider-navigation";
import type { CategoryApiResponse, CategoryKey } from "@/types";
import { SliderContent } from "@/components/slider-content/slider-content";

export const getCategoryCards = (data: CategoryApiResponse) => {
  const categories = Object.keys(data) as Array<CategoryKey>;
  return categories.map((category) => (
    <CategoryCard
      key={category}
      label={data[category].label}
      products={data[category].products}
    />
  ));
};

interface HomeProps {
  data: CategoryApiResponse;
}

export default function HomeContent({ data }: HomeProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderItems = getCategoryCards(data);

  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % sliderItems.length);
  };
  const handlePrevClick = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + sliderItems.length) % sliderItems.length
    );
  };

  return (
    <>
      <SliderNavigation
        label="Explore Accounts"
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
      />
      <SliderContent
        items={sliderItems}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
    </>
  );
}
