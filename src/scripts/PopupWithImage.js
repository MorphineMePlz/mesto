import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imageSelector = this._popup.querySelector(".popup__image-place");
    this._titleSelector = this._popup.querySelector(".popup__image-title");
  }

  open({ name, link }) {
    this._imageSelector.src = link;
    this._imageSelector.alt = name;
    this._titleSelector.textContent = name;
    super.open();
  }
}

export default PopupWithImage;
