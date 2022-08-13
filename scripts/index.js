import { initialCards } from "./initialCards.js";
import Card from "./Card.js/index.js";
import FormValidator from "./FormValidator.js";

// Change popup
const body = document.querySelector("body");
const profilePopup = document.querySelector(".popup_profile");
const popupForm = profilePopup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProfession = popupForm.querySelector(".popup__input_type_prof");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");

// Place popup

const popupPlace = document.querySelector(".popup_new-place");
const placePopupOpenButton = document.querySelector(".profile__plus-button");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputPlaceName = popupPlaceForm.querySelector(".popup__input_type_place");
const inputPlaceLink = popupPlaceForm.querySelector(".popup__input_type_link");
const buttonPlaceSubmit = popupPlace.querySelector(".popup__submit-button");

// Zoom popup

const galleryList = document.querySelector(".gallery__list");
const popupZoom = document.querySelector(".popup_image");
const popupZoomImage = popupZoom.querySelector(".popup__image-place");
const popupZoomTitle = popupZoom.querySelector(".popup__image-title");

// selectors object

const allSelectorsClasses = {
  form: ".popup__form",
  button: ".popup__submit-button",
  input: ".popup__input",
  inputTypeError: "popup__input_type_error",
  buttonDisabled: "popup__submit-button_disabled",
  popupError: ".popup__error",
};

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

function openPopup(popup) {
  popup.classList.add("popup_active");
  body.classList.add("page_overflow");
  document.addEventListener("keyup", closePopupByEsc);
  popup.addEventListener("mousedown", closePopupByOverlay);
}

function closePopupByOverlay(evt) {
  if (
    evt.target === evt.currentTarget ||
    evt.target.classList.contains("popup__close-button")
  ) {
    closePopup(evt.currentTarget);
  }
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  body.classList.remove("page_overflow");
  document.removeEventListener("keyup", closePopupByEsc);
  popup.removeEventListener("mousedown", closePopupByOverlay);
}

const renderCard = (card) => {
  galleryList.prepend(card);
};

const handleCardClick = (name, link) => {
  popupZoomImage.src = link;
  popupZoomImage.alt = name;
  popupZoomTitle.textContent = name;
  openPopup(popupZoom);
};

const initializationCards = (item) => {
  const card = new Card(item, ".gallery__template", handleCardClick);
  const cardElement = card.generateCard();
  renderCard(cardElement);
};

initialCards.forEach((item) => {
  initializationCards(item);
});

const formProfileCheckValid = new FormValidator(allSelectorsClasses, popupForm);
formProfileCheckValid.enableValidation();

const formPlaceCheckValid = new FormValidator(
  allSelectorsClasses,
  popupPlaceForm
);
formPlaceCheckValid.enableValidation();

function profileFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(profilePopup);
}

function formSubmitPlaceHandler(event) {
  event.preventDefault();
  const card = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };

  buttonPlaceSubmit.setAttribute("disabled", true);
  buttonPlaceSubmit.classList.add("popup__submit-button_disabled");
  initializationCards(card);
  closePopup(popupPlace);
}

popupForm.addEventListener("submit", profileFormSubmitHandler);
popupPlaceForm.addEventListener("submit", formSubmitPlaceHandler);

popupProfileOpenButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  formProfileCheckValid.clearFormErrors();
  openPopup(profilePopup);
});

placePopupOpenButton.addEventListener("click", () => {
  popupPlaceForm.reset();
  formPlaceCheckValid.clearFormErrors();
  openPopup(popupPlace);
});
