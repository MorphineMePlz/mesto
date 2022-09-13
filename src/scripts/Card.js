class Card {
  constructor(
    data,
    cardSelector,
    { handleCardClick, openPopupConfirm, handleLikeClick }
  ) {
    this._place = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this._openPopupConfirm = openPopupConfirm;
    this._owner = data.owner._id;
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

    this._likeBtn = this._element.querySelector(".gallery__like-button");
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

  _isOwner() {
    if (this._owner === this._currentUserId) {
      return true;
    }
    return false;
  }

  _handleCardLike(evt) {
    this.handleLikeClick(evt, this._cardId);
  }

  setLikesValue(count) {
    this._likeCount.textContent = count;
    this._toggleLikeButtonState();
  }

  handleLikeButtonState({ isLoading }) {
    if (isLoading) {
      this._likeBtn.disabled = true;
      this._likeBtn.classList.add("gallery__like-button-loading");
    } else {
      this._likeBtn.disabled = false;
      this._likeBtn.classList.remove("gallery__like-button-loading");
    }
  }

  _isLikedByUser() {
    return this._likes.find((ownLike) => ownLike._id === this._currentUserId);
  }

  _likeOwnerShow() {
    this._userLikes = this._isLikedByUser();
    if (this._userLikes) {
      this._toggleLikeButtonState();
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
      .addEventListener("click", (evt) => {
        this._handleCardLike(evt);
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
