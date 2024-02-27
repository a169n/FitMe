import React from "react";
import "./Categories.css";
import { useTranslation } from "react-i18next";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import categoryImg from "../../assets/category-img.jpeg";

export default function Categories() {
  const { t } = useTranslation();
  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
  } = useGetCategoriesQuery();

  if (categoriesIsFetching || categoriesIsLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  const firstSixCategories = categoriesData.slice(0, 6);

  return (
    <div className="categories-container global-padding">
      <h2 className="categories-header">{t("whatsOnYourMind")}</h2>
      <div className="categories">
        {firstSixCategories.map((category) => (
          <div className="category-card" key={category._id}>
            <img className="category-img" src={categoryImg} alt="category" />
            <p key={category._id}>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
