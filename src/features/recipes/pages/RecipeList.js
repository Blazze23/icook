import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ingredientFormatter,
  instructionsFormatter,
  timeFormatter,
} from "../../../functions/helper-functions";
import Modal from "../../../ui/Modal";
import { recipeActions } from "../recipeSlice";
import classes from "./RecipeList.module.css";

const RecipeList = () => {
  const [removalModal, setRemovalModal] = useState();
  const recipes = useSelector((state) => state.recipe.recipes);
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    setRemovalModal(null);
  };

  const removeRecipeHandler = () => {
    dispatch(recipeActions.remove(removalModal.id));
    setRemovalModal(null);
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
        <h1>Recipe List</h1>
        <Link to="/recipes/new">Create new recipe</Link>
      </header>
      {recipes.length === 0 && (
        <div className={classes.noRecipes}>
          <p>There are no recipes at the moment. Start adding some! 🙂</p>
        </div>
      )}
      {recipes.length > 0 && (
        <div className={classes.table}>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Source</th>
                <th>Number of ingredients</th>
                <th>Ingredients</th>
                <th>Preparation time</th>
                <th>Preparation instructions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>{recipe.id}</td>
                  <td>{recipe.name}</td>
                  <td>{recipe.source}</td>
                  <td>{recipe.ingredientList.length}</td>
                  <td>{ingredientFormatter(recipe.ingredientList)}</td>
                  <td>{timeFormatter(recipe.preparationTime)}</td>
                  <td>{instructionsFormatter(recipe.instructions)}</td>
                  <td className={classes.actions}>
                    <Link to={`/recipes/${recipe.id}`}>Details</Link>
                    <button
                      onClick={() => {
                        setRemovalModal({
                          title: "Delete recipe",
                          message:
                            "Are you sure you want to delete this recipe?",
                          id: recipe.id,
                        });
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RecipeList;
