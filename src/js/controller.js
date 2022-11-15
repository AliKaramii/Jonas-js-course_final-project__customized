import "regenerator-runtime/runtime"; //*for polyfill async/await
import "core-js/stable"; //*for polyfill everything else

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

const recipeContainer = document.querySelector(".recipe");
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;
    recipeView.renderSpinner();

    // 1> Loading recipe
    await model.loadRecipe(id);

    // 2> Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

// controlRecipes();

["hashchange", "load"].forEach((ev) =>
  window.addEventListener(ev, controlRecipes)
);
// window.addEventListener("hashchange", controlRecipes);
// window.addEventListener("load", controlRecipes);