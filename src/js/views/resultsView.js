import View from './view.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.foodItems');
  _errorMessage = 'No recipes found for your query! Please  try again ;)';
  _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(results) {
    return `
        <article class="col-sx-12 col-sm-4 col-md-3 mb-4">
        <div class="foodItems_item">
            <a href="#${results.id}">
            <div class="foodItems_image">
                <img src="${results.image}" class="" />
            </div>
            <div class="foodItems_detail">
                <h3>${results.title}</h3>
                <div class="time">
                <svg>
                <use href="${icons}#icon-clock"></use>
                </svg>
                <span>${results.publisher}</span>
                </div>
            </div>
            </a>
        </div>
        </article>
    `;
  }
}

export default new ResultsView();
