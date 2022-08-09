import { openPopup } from "./index.js";
const popupZoom = document.querySelector(".popup_image");
const popupZoomImage = popupZoom.querySelector(".popup__image-place");
const popupZoomTitle = popupZoom.querySelector(".popup__image-title");
const popupZoomCloseButton = popupZoom.querySelector(".popup__close-button");

class Card {
  constructor(data, templateSelector) {
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

  _hanlerOpenZoomPopup() {
    this._addEventListener("click", () => {
      openPopup(popupZoom);
      popupZoomImage.src = this._link;
      popupZoomImage.alt = this._name;
      popupZoomTitle.textContent = this._name;
    });
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
  }
}

export default Card;
