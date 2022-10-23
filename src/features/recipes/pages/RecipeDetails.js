import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../../../ui/Card";
import Modal from "../../../ui/Modal";
import { recipeActions } from "../recipeSlice";
import classes from "./RecipeDetails.module.css";
import { timeFormatter } from "../../../functions/helper-functions";

const RecipeDetails = () => {
  const [removalModal, setRemovalModal] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const recipes = useSelector((state) => state.recipe.recipes);
  const selectedRecipe = recipes.find((recipe) => recipe.id.toString() === id);

  const hideModalHandler = () => {
    setRemovalModal(null);
  };

  const removeRecipeHandler = () => {
    dispatch(recipeActions.remove(removalModal.id));
    setRemovalModal(null);
    navigate("/recipes", { replace: true });
  };

  return (
    <div className={classes.container}>
      {removalModal && (
        <Modal
          title={removalModal.title}
          message={removalModal.message}
          onCancel={hideModalHandler}
          onConfirm={removeRecipeHandler}
        />
      )}
      <header>
        <h1>Recipe Details Page</h1>
        <Link to="/recipes">Go back to recipes</Link>
      </header>
      <main>
        <Card className={classes.card}>
          <p>Recipe name</p>
          <h3>{selectedRecipe.name}</h3>
          <p>Recipe Source</p>
          <h3>{selectedRecipe.source}</h3>
          <p>Ingredients</p>
          <ul>
            {selectedRecipe.ingredientList.map((ingredient) => (
              <li key={ingredient.name}>
                {ingredient.name} ({ingredient.quantity})
              </li>
            ))}
          </ul>
          <p>Preparation Time</p>
          <h3>{timeFormatter(selectedRecipe.preparationTime)}</h3>
          <div className={classes.action}>
            <button
              className={classes.btnAlt}
              onClick={() =>
                setRemovalModal({
                  title: "Delete recipe",
                  message: "Are you sure you want to delete this recipe?",
                  id: selectedRecipe.id,
                })
              }
            >
              Remove recipe
            </button>
          </div>
        </Card>
        <Card className={classes.card}>
          <h3>How to prepare</h3>
          <p className={classes.instructions}>{selectedRecipe.instructions}</p>
        </Card>
      </main>
    </div>
  );
};

export default RecipeDetails;
