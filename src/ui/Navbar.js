import { Link } from "react-router-dom";
import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <div className={classes.logo}>
          <Link to="/recipes">iCOOK</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
