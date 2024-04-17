import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

function SearchedDishes({ foodResults, searchString }) {

  return (
    <>
      <div className="item-container">
        {foodResults.data.map((food, index) => (
          <Link
            className="link"
            to={`/restaurant/${food.restaurant}`}
            key={index}>
            <div className="item">
              <img
                className="item-image"
                src={`http://localhost:3000/${food.image}`}
                alt="item-image"
              />
              <div>
                <p className="name">{food.name}</p>
                <p className="global-category">Global Category Here</p>
                <div className="price">
                  <p>₹{food.price}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        isSearch
        searchString={searchString}
        totalPages={foodResults?.totalPages}
        query={"dishes"}
      />
    </>
  );
}

export default SearchedDishes;
