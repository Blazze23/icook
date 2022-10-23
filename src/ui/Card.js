import classes from "./Card.module.css";

const Card = ({ children, className }) => {
  const cssClasses = `${classes.card} ${className}`;
  return <div className={cssClasses}>{children}</div>;
};

export default Card;
