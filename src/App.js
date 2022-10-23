import { Routes, Route, Navigate } from "react-router-dom";
import CreateRecipe from "./features/recipes/pages/CreateRecipe";
import PageNotFound from "./features/recipes/pages/PageNotFound";
import RecipeDetails from "./features/recipes/pages/RecipeDetails";
import RecipeList from "./features/recipes/pages/RecipeList";
import Navbar from "./ui/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/recipes" />} />
        <Route path="/recipes" element={<RecipeList />} />
        <Route path="/recipes/new" element={<CreateRecipe />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
