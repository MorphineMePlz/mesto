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
    this.inputValues = {};
    this._inputList.forEach((input) => {
      this.inputValues[input.name] = input.value;
    });
    return this.inputValues;
  }

  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }
}

export default PopupWithForm;
