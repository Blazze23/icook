import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { recipeActions } from "../recipeSlice";
import classes from "./CreateRecipe.module.css";

const INGREDIENTS_LIST = [
  "Flour",
  "Milk",
  "Oil",
  "Salt",
  "Sugar",
  "Eggs",
  "Tomatoes",
  "Peppers",
  "Cheese",
  "Potatoes",
  "Meat",
];

let recipeID = 1;

const CreateRecipe = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "ingredientList", // unique name for your Field Array
    rules: { required: true },
  });

  const submitHandler = (data) => {
    dispatch(recipeActions.create({ ...data, id: recipeID }));
    recipeID++;
    navigate("/recipes");
  };

  return (
    <div className={classes.container}>
      <header>
        <h1>Create new recipe</h1>
        <Link to="/recipes">See all recipes</Link>
      </header>
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* RECIPE NAME INPUT */}
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true, maxLength: 30 })}
            placeholder="Enter recipe name..."
          />
          {errors.name?.type === "required" && (
            <p role="alert">Name field is required</p>
          )}
          {errors.name?.type === "maxLength" && (
            <p role="alert">Maximum length of the name can be 30 characters</p>
          )}
        </div>
        {/* RECIPE SOURCE INPUT */}
        <div className={classes.control}>
          <label htmlFor="source">Source</label>
          <input
            type="text"
            id="source"
            {...register("source", { maxLength: 50 })}
            placeholder="Enter recipe source..."
          />
          {errors.source?.type === "maxLength" && (
            <p role="alert">
              Maximum length of the source can be 50 characters
            </p>
          )}
        </div>
        {/* RECIPE INGREDIENTS INPUT */}
        <div className={classes.control}>
          <label htmlFor="ingredients">Ingredients</label>
          {errors.ingredientList?.root?.type === "required" && (
            <p role="alert">Every recipe must have at least 1 ingredient</p>
          )}
          {fields.map((field, index) => (
            <div key={field.id} className={classes.ingredients}>
              <div>
                <select
                  {...register(`ingredientList.${index}.name`)}
                  id="ingredients"
                >
                  {INGREDIENTS_LIST.map((ingredient) => (
                    <option value={ingredient} key={ingredient}>
                      {ingredient}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  {...register(`ingredientList.${index}.quantity`, {
                    required: true,
                  })}
                  placeholder="Enter quantity..."
                />
                {errors.ingredientList?.[index]?.quantity?.type ===
                  "required" && (
                  <p role="alert">Every ingredient must have quantity</p>
                )}
              </div>
              <div>
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={classes.ingredientActions}>
            <button
              type="button"
              onClick={() =>
                append({ name: INGREDIENTS_LIST[0], quantity: "" })
              }
            >
              + Add
            </button>
          </div>
        </div>
        {/* PREPARATION TIME INPUT */}
        <div className={classes.control}>
          <label htmlFor="preparationTime">Preparation Time</label>
          <input
            type="text"
            id="preparationTime"
            {...register("preparationTime", {
              required: true,
              pattern: /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
            })}
            placeholder="Enter preparation time..."
          />
          {errors.preparationTime?.type === "required" && (
            <p role="alert">Preparation time field is required</p>
          )}
          {errors.preparationTime?.type === "pattern" && (
            <p role="alert">Preparation time format should be HH:MM or H:MM</p>
          )}
        </div>
        {/* RECIPE INSTRUCTIONS INPUT */}
        <div className={classes.control}>
          <label htmlFor="instructions">Preparation Instruction</label>
          <textarea
            id="instructions"
            {...register("instructions", { required: true, maxLength: 5000 })}
            placeholder="Enter recipe instructions..."
            rows="10"
          />
          {errors.instructions?.type === "required" && (
            <p role="alert">Instructions field is required</p>
          )}
          {errors.instructions?.type === "maxLength" && (
            <p role="alert">
              Maximum length of the instructions can be 5000 characters
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button type="submit">Create Recipe</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
