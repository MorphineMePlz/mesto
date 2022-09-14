import Popup from "./Popup.js";

class PopupConfirm extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._confirmationButton = this._popup.querySelector(
      ".popup__submit-button_confirmation"
    );
    this._deleteCard = handleDeleteCard;
  }

  open(id, cardElement) {
    super.open();
    this._cardId = id;
    this._card = cardElement;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", () => {
      this._deleteCard(this._cardId, this._card);
    });
  }
}

export default PopupConfirm;
