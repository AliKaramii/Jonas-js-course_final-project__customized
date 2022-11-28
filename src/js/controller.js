import 'regenerator-runtime/runtime'; //*for polyfill async/await
import 'core-js/stable'; //*for polyfill everything else

import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
// import resultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import paginationView from './views/paginationView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();

    // 1> Loading recipe
    await model.loadRecipe(id);

    // 2> Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    ResultsView.renderSpinner();

    // 1> get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2> Load search results
    await model.loadSearchResaults(query);

    // 3> Render results
    // console.log(model.state.search.results);

    // resultsView.render(model.state.search.results);
    ResultsView.render(model.getSearchResaultsPage());

    // 4> Render initial pagination btn
    PaginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1> Render new results
  ResultsView.render(model.getSearchResaultsPage(goToPage));

  // 1> Render new pagination buttons
  PaginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
