import "./Search.css";
import searchIcon from "../../assets/randomize.svg";

export default function Search() {
  return (
    <div className="search-section">
      <h2>Search by Restaurant</h2>
      <img src={searchIcon} />
      <input
        type="text"
        placeholder="Enter item or restaurant you are looking for"
      />
      <button>Search Now</button>
    </div>
  );
}
