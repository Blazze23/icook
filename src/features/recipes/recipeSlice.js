import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
};

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    create(state, action) {
      state.recipes.push(action.payload);
    },
    remove(state, action) {
      const removeElementIndex = state.recipes.findIndex(
        (recipe) => recipe.id === action.payload
      );
      state.recipes.splice(removeElementIndex, 1);
    },
  },
});

export const recipeActions = recipeSlice.actions;

export default recipeSlice.reducer;
