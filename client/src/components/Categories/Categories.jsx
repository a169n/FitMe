import "./Categories.css";
import { useGetCategoriesQuery } from "../../redux/services/categoriesApi";
import categoryImg from "../../assets/category-img.jpeg";

export default function Categories() {
  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    isFetching: categoriesIsFetching,
    isError: categoriesIsError,
  } = useGetCategoriesQuery();

  if (categoriesIsFetching || categoriesIsLoading) {
    return <h1 className="loading">Loading...</h1>;
  }

  const firstSixCategories = categoriesData.slice(0, 6);

  return (
    <div className="categories-container global-padding">
      <h2 className="categories-header">What’s on your mind?</h2>
      <div className="categories">
        {firstSixCategories.map((category) => (
          <div className="category-card" key={category._id}>
            <img className="category-img" src={categoryImg} />
            <p key={category._id}>{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


// — add restaurantCategories and globalCategories
// — make restaurant Page
// — implement Nearby restaurants
// — implement random Foods
// — implement Search input
// — make page as Admin page
// — save images in DB
// — make adaptive
// — implement slider in Main
// — small corrections in css
// — add input fields
// — add 'X' to delete
