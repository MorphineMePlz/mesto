class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }
  generateCards(items) {
    items.forEach((item) => this._renderer(item));
  }

  addItem(element) {
    this._container.prepend(element);
  }

  addItems(element) {
    this._container.append(element);
  }
}
export default Section;
