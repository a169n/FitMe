import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination/Pagination";

function SearchedRestaurants({ restaurantResults, searchString }) {
  return (
    <>
      <div className="item-container">
        {restaurantResults.data.map((restaurant, index) => (
          <Link
            className="link"
            to={`/restaurant/${restaurant._id}`}
            key={index}>
            <div className="item">
              <img
                className="item-image"
                src={`http://localhost:3000/${restaurant.images[0]}`}
                alt="item-image"
              />
              <div>
                <p className="name">{restaurant.name}</p>
                <div>
                  {restaurant.keywords.map((keyword, index) => (
                    <p key={index} className="global-category">
                      {keyword}
                      {index !== restaurant.keywords.length - 1 ? ", " : ""}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Pagination
        isSearch
        searchString={searchString}
        totalPages={restaurantResults?.totalPages}
        query={"restaurants"}
      />
    </>
  );
}

export default SearchedRestaurants;
