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
    this._owner = data.owner._id;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
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

    this._likeButton = this._element.querySelector(".gallery__like-button");
    this._element.querySelector(".gallery__title").textContent = this._place;
    this._likeCount = this._element.querySelector(".gallery__like-count");
    this._deleteButton = this._element.querySelector(".gallery__delete-button");

    this._image = this._element.querySelector(".gallery__image");
    this._image.src = this._link;
    this._image.alt = this._place;

    this._currentUserId = localStorage.getItem("userId");
    this._updateLikeState();

    if (!this._isOwner()) {
      this._deleteButton.classList.add("gallery__delete-button_hidden");
    }

    this._setEventListeners();
    return this._element;
  }

  _isOwner() {
    return this._owner === this._currentUserId;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  handleLikeButtonState({ isLoading }) {
    if (isLoading) {
      this._likeButton.disabled = true;
      this._likeButton.classList.add("gallery__like-button-loading");
    } else {
      this._likeButton.disabled = false;
      this._likeButton.classList.remove("gallery__like-button-loading");
    }
  }

  _handleCardLike(evt) {
    this.handleLikeClick(evt, this._cardId);
  }

  isLikedByUser() {
    return this._likes.some((ownLike) => ownLike._id === this._currentUserId);
  }

  _updateLikeState() {
    this._isLiked = this.isLikedByUser();
    this._likeCount.textContent = this._likes.length;

    if (this._isLiked) {
      this._likeButton.classList.add("gallery__like-button_active");
    } else {
      this._likeButton.classList.remove("gallery__like-button_active");
    }
  }

  setLikesValue(likes) {
    this._likes = likes;
    this._updateLikeState();
  }

  _handleDeleteCard() {
    this._openPopupConfirm(this._cardId, this._element);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) => {
      this._handleCardLike(evt);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._image.addEventListener("click", () => {
      this._handleCardClick({ place: this._place, link: this._link });
    });
  }
}

export default Card;
