import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popup, handleSubmit) {
    super(popup);
    this._handleSubmit = handleSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
    this._form = this._popup.querySelector(".popup__form");
  }

  close() {
    this._form.reset();
    super.close();
  }

  _getInputValues() {
    this._inputList.forEach((input) => {
      console.log(input.value);
    });
    this.close();
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt);
      this._getInputValues();
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
