import checkIcon from '../../img/check.svg';
import plusIcon from '../../img/plus.svg';
import minusIcon from '../../img/minus.svg';
import bookmarkIcon from '../../img/bookmark.svg';
import timerIlightIcon from '../../img/timer-light.svg';
import usersIcon from '../../img/users.svg';
import danger from '../../img/danger.svg';
import smile from '../../img/smile-white.svg';
import { Fraction } from 'fractional';

class RecipeView {
  #parentElement = document.querySelector('.recipe');
  #data;
  #errorMessage = 'We could not find that recipe.Please try another one!!';
  #message = '';

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #clear() {
    this.#parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<span class="loader"></span>`;
    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }

  renderMessage(message = this.#message) {
    const markup = `
    <div class="message">
      <img src="${smile}">
      <span>${message}</span>
    </div>`;

    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMessage) {
    const markup = `
    <div class="error">
      <img src="${danger}">
      <span>${message}</span>
    </div>`;

    this.#clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  #generateMarkup() {
    return `<section class="row recipe gx-1 my-3">
        <div class="col-md-5 recipe_title recipe_title-dark p-2">
        <h2>${this.#data.title}</h2>
        <span>${this.#data.publisher}</span>
        <div class="time time-dark my-5">
            <img src="${timerIlightIcon}" />
            <span>${this.#data.cookingTime} min</span>
        </div>
        <div class="recipe_source">
            <h3>HOW TO COOK IT</h3>
            <p>
            This recipe was carefully designed and tested by BBC Food. Please
            check out directions at their website.
            </p>
            <a target="_blank" rel="noopener noreferrer" class="generalBtn generalBtn-primary" href="${
              this.#data.sourceUrl
            }">Directions</a>
        </div>
        </div>
        <div class="col-md-7 recipe_ingredients">
        <div class="recipe_cover">
            <img src="${this.#data.image}" alt="${this.#data.title}" />
        </div>
        <div class="recipeDetails">
            <button class="generalBtn generalBtn-circle generalBtn-primary">
            <img src="${bookmarkIcon}" />
            </button>
            <div class="recipeDetails_servings">
            <button class="generalBtn generalBtn-circle"><img src="${minusIcon}" /></button>
            <img src="${usersIcon}" />
            <span>${this.#data.servings} SERVINGS</span>
            <button class="generalBtn generalBtn-circle"><img src="${plusIcon}" /></button>
            </div>
            <h3>RECIPE INGREDIENTS</h3>
            <div class="recipeDetails_ingredients">
            <ul>
    
                ${this.#data.ingredients
                  .map(this.#generateMarkupIngredient)
                  .join('')}
            </ul>
            </div>
        </div>
        </div>
    </section>`;
  }

  #generateMarkupIngredient(ing) {
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
