import { Link } from "react-router-dom";
import classes from "./PageNotFound.module.css";

const PageNotFound = () => {
  return (
    <div className={classes.container}>
      <h1>(404) Page not found</h1>
      <Link to="/recipes">Go back to all recipes</Link>
    </div>
  );
};

export default PageNotFound;
