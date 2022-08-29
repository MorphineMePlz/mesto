const body = document.querySelector("body");

class Popup {
  constructor(popup) {
    this._popup = document.querySelector(popup);
  }

  open() {
    this._popup.classList.add("popup_active");
    body.classList.add("page_overflow");
    document.addEventListener("keyup", (evt) => this._handleEscClose(evt));
  }

  close() {
    this._popup.classList.remove("popup_active");
    body.classList.remove("page_overflow");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleClose(evt) {
    if (
      evt.target === evt.currentTarget ||
      evt.target.classList.contains("popup__close-button")
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => this._handleClose(evt));
  }

  _removeEventListeners() {
    document.removeEventListener("keyup", (evt) => this._handleEscClose(evt));
    this._popup.removeEventListener("click", (evt) => this._handleClose(evt));
  }
}

export default Popup;
