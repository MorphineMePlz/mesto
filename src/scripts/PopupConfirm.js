import Popup from "./Popup.js";

class PopupConfirm extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector);
    this._confirmationButton = this._popup.querySelector(
      ".popup__submit-button_confirmation"
    );
    this._deleteCard = handleDeleteCard;
  }

  open(id) {
    super.open();
    this._cardId = id;
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener("click", () => {
      this._deleteCard(this._cardId);
    });
  }
}

export default PopupConfirm;
