class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, openPopupConfirm, handlePutLike, handleDeleteLike }
  ) {
    this._place = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handlePutLike = handlePutLike;
    this._openPopupConfirm = openPopupConfirm;
    this._owner = data.owner._id;
    this._handleDeleteLike = handleDeleteLike;
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
    this._likeCount = this._element.querySelector(".gallery__like-count");

    this._image = this._element.querySelector(".gallery__image");
    this._image.src = this._link;
    this._image.alt = this._place;

    this._likeCount.textContent = this._likes.length;
    this._currentUserId = localStorage.getItem("userId");

    this._likeOwnerShow();

    if (!this._isOwner()) {
      this._element
        .querySelector(".gallery__delete-button")
        .classList.add("gallery__delete-button_hidden");
    }
    return this._element;
  }

  _removeLike(count) {
    console.log(count);
  }

  _isOwner() {
    if (this._owner === this._currentUserId) {
      return true;
    }
    return false;
  }

  _handleLikeClick() {
    this._handlePutLike(this._cardId);
    this._element
      .querySelector(".gallery__like-button")
      .classList.toggle("gallery__like-button_active");
  }

  resetLikes(count) {
    this._likeQuantity = this._element.querySelector(".gallery__like-count");
    this._likeQuantity.textContent = count;
  }

  _getInitialLikes() {
    return this._likes.find((ownLike) => ownLike._id === this._currentUserId);
  }

  _likeOwnerShow() {
    this._userLikes = this._getInitialLikes();
    if (this._userLikes) {
      this._toggleLikeButtonState();
      this._removeLike();
    }
  }

  _toggleLikeButtonState() {
    this._element
      .querySelector(".gallery__like-button")
      .classList.toggle("gallery__like-button_active");
  }

  _handleDeleteCard() {
    this._openPopupConfirm(this._cardId);
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
