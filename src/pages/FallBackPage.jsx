import { Link } from "react-router-dom";

const FallBackPage = () => {
  return (
    <section style={{ height: "83.9vh" }}>
      <div className="container --flex-center --dir-column">
        <h1 className="--text-center">Oops... Something went wrong.</h1>
        <p className="--text-center --text-md">
          The page you are looking for doesn't exist
        </p>
        <br />
        <Link to="/">
          <button className="--btn">&larr; Back to Home Page</button>
        </Link>
      </div>
    </section>
  );
};

export default FallBackPage;
