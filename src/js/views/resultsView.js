import View from './view.js';
import timerLight from '../../img/timer-light.svg';
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
                <img loading="lazy" src="${timerLight}" />
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
