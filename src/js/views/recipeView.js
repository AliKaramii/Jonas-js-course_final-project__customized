import View from './view.js';
import checkIcon from '../../img/check.svg';
import plusIcon from '../../img/plus.svg';
import minusIcon from '../../img/minus.svg';
import bookmarkIcon from '../../img/bookmark.svg';
import timerIlightIcon from '../../img/timer-light.svg';
import usersIcon from '../../img/users.svg';
import { Fraction } from 'fractional';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe.Please try another one!!';
  _message = '';

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.generalBtn');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }

  _generateMarkup() {
    return `<section class="row recipe gx-1 my-3">
        <div class="col-md-5 recipe_title recipe_title-dark p-2">
        <h2>${this._data.title}</h2>
        <span>${this._data.publisher}</span>
        <div class="time time-dark my-5">
            <img src="${timerIlightIcon}" />
            <span>${this._data.cookingTime} min</span>
        </div>
        <div class="recipe_source">
            <h3>HOW TO COOK IT</h3>
            <p>
            This recipe was carefully designed and tested by BBC Food. Please
            check out directions at their website.
            </p>
            <a target="_blank" rel="noopener noreferrer" class="generalBtn generalBtn-primary" href="${
              this._data.sourceUrl
            }">Directions</a>
        </div>
        </div>
        <div class="col-md-7 recipe_ingredients">
        <div class="recipe_cover">
            <img src="${this._data.image}" alt="${this._data.title}" />
        </div>
        <div class="recipeDetails">
            <button class="generalBtn generalBtn-circle generalBtn-primary">
            <img src="${bookmarkIcon}" />
            </button>
            <div class="recipeDetails_servings">
            <button class="generalBtn generalBtn-circle" data-update-to="${
              this._data.servings - 1
            }"><img src="${minusIcon}" /></button>
            <img src="${usersIcon}" />
            <span>${this._data.servings} SERVINGS</span>
            <button class="generalBtn generalBtn-circle" data-update-to="${
              this._data.servings + 1
            }"><img src="${plusIcon}" /></button>
            </div>
            <h3>RECIPE INGREDIENTS</h3>
            <div class="recipeDetails_ingredients">
            <ul>
    
                ${this._data.ingredients
                  .map(this._generateMarkupIngredient)
                  .join('')}
            </ul>
            </div>
        </div>
        </div>
    </section>`;
  }

  _generateMarkupIngredient(ing) {
    return `
      <li>
      <img src="${checkIcon}" />
      <span>${ing.quantity ? new Fraction(ing.quantity).toString() : ''}</span>
      <span>${ing.unit}</span>
      <span>${ing.description}</span>
      </li>
      `;
  }
}

export default new RecipeView();
