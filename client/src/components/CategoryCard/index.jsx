import React from "react";


const CategoryCard = ({ category }) => {
  return (
    <div className="category-card">
      <img
        className="category-img"
        src={`http://localhost:3000/${category.image}`}
        alt="category"
      />
      <p>{category.name}</p>
    </div>
  );
};

export default CategoryCard;
