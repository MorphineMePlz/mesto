class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._place = data.place;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const galleryElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".gallery__list-item")
      .cloneNode(true);
    return galleryElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector(".gallery__image").src = this._link;
    this._element.querySelector(".gallery__title").textContent = this._place;
    this._element.querySelector(".gallery__title").alt = this._place;

    return this._element;
  }

  _handleLikeClick() {
    this._element

      .querySelector(".gallery__like-button")

      .classList.toggle("gallery__like-button_active");
  }

  _handleDeleteClick() {
    this._element.closest(".gallery__list-item").remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick();
      });

    this._element
      .querySelector(".gallery__image")
      .addEventListener("click", () => {
        this._handleCardClick({ name: this._name, link: this._link });
      });
  }
}

export default Card;
