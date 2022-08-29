import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupSelector.querySelector(
      ".popup__image-place"
    );
    this._titleElement = this._popupSelector.querySelector(
      ".popup__image-title"
    );
  }

  open({ name, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = name;
    this._titleElement.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
