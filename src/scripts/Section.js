class Section {
  constructor({ items, renderer }, containerSelector) {
    this._containerSelector = document.querySelector(containerSelector);
    this._items = items;
    this._renderer = renderer;
  }
  generateCards() {
    this._items.forEach((item) => this._renderer(item));
  }
  addItem(element) {
    this._containerSelector.prepend(element);
  }
}
export default Section;
