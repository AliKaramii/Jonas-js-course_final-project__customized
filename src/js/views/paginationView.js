import View from './view.js';
import leftArrow from '../../img/nav-left.svg';
import rightArrow from '../../img/nav-right.svg';
class PaginationView extends View {
  _parentElement = document.querySelector('.navigation');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.navigation_btn');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <a data-goto="${curPage + 1}" class="navigation_btn" href="#">
          <img src="${rightArrow}">
          Page ${curPage + 1}
        </a>`;
    }

    // Last pages
    if (curPage === numPages && numPages > 1) {
      return `
        <a data-goto="${curPage - 1}" class="navigation_btn" href="#">
          <img src="${leftArrow}">
          Page ${curPage - 1}
        </a>`;
    }

    // other page
    if (curPage < numPages) {
      return `
      <a data-goto="${curPage - 1}" class="navigation_btn" href="#">
        <img src="${leftArrow}">
        Page ${curPage - 1}
      </a>
      <a data-goto="${curPage + 1}" class="navigation_btn" href="#">
      <img src="${rightArrow}">
      Page ${curPage + 1}
      </a>`;
    }
  }
}

export default new PaginationView();
