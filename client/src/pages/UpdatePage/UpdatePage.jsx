import { Link } from "react-router-dom";

function UpdatePage() {
  return (
    <>
      <h1>UpdatePage</h1>
      <Link className="link" to={"/admin"}>
        <button>AdminPage</button>
      </Link>
    </>
  );
}

export default UpdatePage;
