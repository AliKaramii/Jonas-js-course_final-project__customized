class SearchView {
  #parentEl = document.querySelector('.searchBox');

  #clearInput() {
    this.#parentEl.querySelector('.searchBox_input').value = '';
  }

  getQuery() {
    const query = this.#parentEl.querySelector('.searchBox_input').value;
    this.#clearInput();
    return query;
  }

  addHandlerSearch(handler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
