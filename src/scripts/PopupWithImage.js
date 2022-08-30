import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".popup__image-place");
    this._titleElement = this._popup.querySelector(".popup__image-title");
  }

  open({ place, link }) {
    this._imageElement.src = link;
    this._imageElement.alt = place;
    this._titleElement.textContent = place;
    super.open();
  }
}

export default PopupWithImage;
