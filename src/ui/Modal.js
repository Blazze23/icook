import Card from "./Card";
import classes from "./Modal.module.css";

const Modal = ({ title, message, onCancel, onConfirm }) => {
  return (
    <>
      <div className={classes.backdrop} onClick={onCancel}></div>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{title}</h2>
        </header>
        <div className={classes.content}>
          <p>{message}</p>
        </div>
        <footer className={classes.actions}>
          <button className={classes.btnAlt} onClick={onCancel}>
            Cancel
          </button>
          <button onClick={onConfirm}>Confirm</button>
        </footer>
      </Card>
    </>
  );
};

export default Modal;
