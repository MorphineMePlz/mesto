import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import Popup from "./Popup.js";

// Change popup
const profilePopup = document.querySelector(".popup_profile");
const popupForm = profilePopup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProfession = popupForm.querySelector(".popup__input_type_prof");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const profileSubmitButton = popupForm.querySelector(".popup__submit-button");

// Place popup

const popupPlace = document.querySelector(".popup_new-place");
const placePopupOpenButton = document.querySelector(".profile__plus-button");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputPlaceName = popupPlaceForm.querySelector(".popup__input_type_place");
const inputPlaceLink = popupPlaceForm.querySelector(".popup__input_type_link");
const buttonPlaceSubmit = popupPlace.querySelector(".popup__submit-button");

// Zoom popup

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
  template: ".gallery__template",
};

const popupProfile = new Popup(".popup_profile");

function setInitialButtonStates() {
  formProfileCheckValid.handleInitialButtonState(profileSubmitButton);
  formProfileCheckValid.handleInitialButtonState(buttonPlaceSubmit);
}

function closePopup() {
  setInitialButtonStates();
}

const handleCardClick = (name, link) => {
  popupZoomImage.src = link;
  popupZoomImage.alt = name;
  popupZoomTitle.textContent = name;
};

const createCard = (item) => {
  const card = new Card(item, allSelectorsClasses.template, handleCardClick);
  const cardElement = card.generateCard();
  section.addItem(cardElement);
};

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".gallery__list"
);
section.generateCards();

const formProfileCheckValid = new FormValidator(allSelectorsClasses, popupForm);
formProfileCheckValid.enableValidation();

const formPlaceCheckValid = new FormValidator(
  allSelectorsClasses,
  popupPlaceForm
);
formPlaceCheckValid.enableValidation();

// логика

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
  createCard(card);
  closePopup(popupPlace);
}

popupForm.addEventListener("submit", profileFormSubmitHandler);
popupPlaceForm.addEventListener("submit", formSubmitPlaceHandler);

popupProfileOpenButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  formProfileCheckValid.clearFormErrors();
  popupProfile.open();
});

placePopupOpenButton.addEventListener("click", () => {
  popupPlaceForm.reset();
  formPlaceCheckValid.clearFormErrors();
});
