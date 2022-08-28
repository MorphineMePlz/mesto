import { initialCards } from "./initialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Change popup
const profilePopup = document.querySelector(".popup_profile");
const popupForm = profilePopup.querySelector(".popup__form");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const profileSubmitButton = popupForm.querySelector(".popup__submit-button");

// Place popup

const popupPlace = document.querySelector(".popup_new-place");
const placePopupOpenButton = document.querySelector(".profile__plus-button");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputPlaceName = popupPlaceForm.querySelector(".popup__input_type_place");
const inputPlaceLink = popupPlaceForm.querySelector(".popup__input_type_link");
const buttonPlaceSubmit = popupPlace.querySelector(".popup__submit-button");

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

// создание экземпляра PopupWithForm
const popupProfile = new PopupWithForm(
  ".popup_profile",
  profileFormSubmitHandler
);

const popupWithFormCards = new PopupWithForm(
  ".popup_new-place",
  formSubmitPlaceHandler
);

const userInfo = new UserInfo({
  name: ".profile__title",
  job: ".profile__profession",
});

// создание экземпляра PopupWithImage
const popupImage = new PopupWithImage(".popup_image");

// создание экземпляра Card
const createCard = (item) => {
  const card = new Card(item, allSelectorsClasses.template, (obj) =>
    popupImage.open(obj)
  );
  const cardElement = card.generateCard();
  section.addItem(cardElement);
};

//создание экземпляра Section

const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".gallery__list"
);
section.generateCards();

// создание экземляра FormValidator

const formProfileCheckValid = new FormValidator(allSelectorsClasses, popupForm);
formProfileCheckValid.enableValidation();

const formPlaceCheckValid = new FormValidator(
  allSelectorsClasses,
  popupPlaceForm
);
formPlaceCheckValid.enableValidation();

function setInitialButtonStates() {
  formProfileCheckValid.handleInitialButtonState(profileSubmitButton);
  formProfileCheckValid.handleInitialButtonState(buttonPlaceSubmit);
}

// недоделанный функционал

function profileFormSubmitHandler(value) {
  userInfo.setUserInfo(value);
}

function formSubmitPlaceHandler(card) {
  buttonPlaceSubmit.setAttribute("disabled", true);
  buttonPlaceSubmit.classList.add("popup__submit-button_disabled");
  console.log(card);
  createCard(card);
}

popupProfileOpenButton.addEventListener("click", () => {
  formProfileCheckValid.clearFormErrors();
  popupProfile.open();
});

placePopupOpenButton.addEventListener("click", () => {
  formPlaceCheckValid.clearFormErrors();
  popupWithFormCards.open();
});
