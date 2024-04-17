import { Link } from "react-router-dom";

import "./Pagination.css";

const Pagination = ({ isSearch, totalPages, searchString, query }) => {
  if (totalPages === 1) return <></>;
  let pagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  return (
    <div className="pagination">
      {pagesArray.map((page) => (
        <div key={page}>
          {isSearch && (
            <Link
              to={`/${query}/search?searchString=${searchString}&page=${page}`}
              className="pagination_btn">
              {page}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
