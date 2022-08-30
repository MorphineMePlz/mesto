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
    this._element.querySelector(".gallery__title").textContent = this._place;

    this._image = this._element.querySelector(".gallery__image");
    this._image.src = this._link;
    this._image.alt = this._place;

    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".gallery__like-button")
      .classList.toggle("gallery__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
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
        this._handleCardClick({ place: this._place, link: this._link });
      });
  }
}

export default Card;
