class Card {
  constructor(data, cardSelector, handleCardClick, openPopupConfirm) {
    this._place = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._openPopupConfirm = openPopupConfirm;
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
    this._likeCount = this._element.querySelector(".gallery__like-count");
    this._likeCount.textContent = this._likes.length;
    return this._element;
  }

  _handleLikeClick() {
    this._element
      .querySelector(".gallery__like-button")
      .classList.toggle("gallery__like-button_active");
  }

  _handleDeleteCard() {
    this._openPopupConfirm(this._cardId);
    console.log(this._cardId);
  }

  // _handleDeleteClick() {
  //   this._cardId.remove();
  //   this._cardId = null;
  // }

  _setEventListeners() {
    this._element
      .querySelector(".gallery__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
    // console.log(this._element);
    // // this._element
    // //   .querySelector(".popup__submit-button_confirmation")
    // //   .addEventListener("click", () => {
    // //     this._handleDeleteClick;
    // //   });

    this._element
      .querySelector(".gallery__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });

    this._element
      .querySelector(".gallery__image")
      .addEventListener("click", () => {
        this._handleCardClick({ place: this._place, link: this._link });
      });
  }
}

export default Card;
