class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._card = templateSelector;
  }

  _getTemplate() {
    const galleryElement = document
      .querySelector(this._card)
      .content.querySelector(".gallery__list-item")
      .cloneNode(true);
    return galleryElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const galleryImage = this._element.querySelector(".gallery__image");
    galleryImage.src = this._link;
    galleryImage.alt = this._name;
    this._element.querySelector(".gallery__title").textContent = this._name;

    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".gallery__like-button")
      .classList.toggle("gallery__like-button_active");
  }

  _handleDeleteClick() {
    this._element
      .querySelector(".gallery__delete-button")
      .closest(".gallery__list-item")
      .remove();
  }

  _setEventListeners() {
    const buttonLike = this._element.querySelector(".gallery__like-button");
    const buttonDelete = this._element.querySelector(".gallery__delete-button");

    buttonLike.addEventListener("click", () => {
      this._handleLikeClick();
    });

    buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._galleryImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }
}

export default Card;
