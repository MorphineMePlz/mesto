import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputList = this._form.querySelectorAll(".popup__input");
    this._submitButton = this._form.querySelector(".popup__submit-button");
    this._initialText = this._submitButton.textContent;
  }

  _findInput(key) {
    return Array.from(this._form).find((i) => i.name === key);
  }

  setInitialValues(initialValues) {
    Object.keys(initialValues).forEach(
      (key) => (this._findInput(key).value = initialValues[key])
    );
  }

  handleSubmitButton({ isLoading }) {
    if (isLoading) {
      this._submitButton.disabled = true;
      this._submitButton.classList.add("popup__submit-button_loading");
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove("popup__submit-button_loading");
      this._submitButton.textContent = this._initialText;
    }
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
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.handleSubmitButton({ isLoading: true });
      this._handleSubmit(this._getInputValues());
    });
  }
}

export default PopupWithForm;
