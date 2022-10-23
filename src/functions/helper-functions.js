export const timeFormatter = (time) => {
  const hours = time.split(":")[0];
  const minutes = time.split(":")[1];

  let prepTime;
  if (parseInt(hours) < 1) {
    prepTime = `${minutes} minutes`;
  } else {
    prepTime = `${hours} hours ${minutes} minutes`;
  }

  return prepTime;
};

export const instructionsFormatter = (string) => {
  const words = string.split(" ");
  let instructions = "";

  for (let i = 0; i < words.length; i++) {
    const currentWord = words[i];
    if (i > 0) {
      instructions += " ";
    }
    instructions += currentWord;

    if (instructions.length > 50 && i !== words.length - 1) {
      return instructions + "...";
    }
  }

  return instructions;
};

export const ingredientFormatter = (ingredients) => {
  return (
    ingredients
      .slice(0, 3)
      .map((ingredient) => ingredient.name)
      .join(", ") + (ingredients.length > 3 ? "..." : "")
  );
};
