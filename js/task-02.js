const ingredients = [
  'Potatoes',
  'Mushrooms',
  'Garlic',
  'Tomatos',
  'Herbs',
  'Condiments',
];
const allIngredients = document.querySelector("ul#ingredients");
const addIngredient = ingredients.map(newIngredient => {
  const nameEl = document.createElement("li")
  nameEl.textContent = newIngredient;
  nameEl.classList.add(`item`);
       return nameEl;
});
console.log(addIngredient);
allIngredients.append(...addIngredient);