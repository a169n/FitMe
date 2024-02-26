import { Link } from "react-router-dom";

function DeletePage() {
  return (
    <>
      <h1>Delete Page</h1>
      <Link className="link" to={"/admin"}><button>AdminPage</button></Link>
    </>
  );
}

export default DeletePage;
