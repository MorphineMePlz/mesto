class Section {
  constructor({ items, renderer }, container) {
    this._container = document.querySelector(container);
    this._items = items;
    this._renderer = renderer;
  }
  generateCards() {
    this._items.forEach((item) => this._renderer(item));
  }
  addItem(card) {
    this._container.prepend(card);
  }
}
export default Section;
