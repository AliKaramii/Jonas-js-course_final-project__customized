class SearchView {
  _parentEl = document.querySelector('.searchBox');

  _clearInput() {
    this._parentEl.querySelector('.searchBox_input').value = '';
  }

  getQuery() {
    const query = this._parentEl.querySelector('.searchBox_input').value;
    this._clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
