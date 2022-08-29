import "./pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";

import {
  selectorClasses,
  classCreationSelectors,
  initialCards,
} from "./utils/constants.js";

import {
  popupForm,
  popupProfileOpenButton,
  profileSubmitButton,
  placePopupOpenButton,
  popupPlaceForm,
  buttonPlaceSubmit,
} from "./utils/domElements.js";

const createCard = (cardData) => {
  const card = new Card(cardData, selectorClasses.template, (obj) =>
    popupImage.open(obj)
  );
  const cardElement = card.generateCard();

  return cardElement;
};

const userInfo = new UserInfo({
  nameSelector: classCreationSelectors.userName,
  jobSelector: classCreationSelectors.userJob,
});

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  classCreationSelectors.cardList
);

const popupProfile = new PopupWithForm({
  popupSelector: classCreationSelectors.profilePopup,
  handleSubmit: (v) => userInfo.setUserInfo(v),
});
const popupWithFormCards = new PopupWithForm({
  popupSelector: classCreationSelectors.placePopup,
  handleSubmit: (data) => {
    section.addItem(createCard(data));
    popupWithFormCards.close();
  },
});

const popupImage = new PopupWithImage(classCreationSelectors.imagePopup);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupWithFormCards.setEventListeners();
section.generateCards();

const formProfileCheckValid = new FormValidator(selectorClasses, popupForm);
formProfileCheckValid.enableValidation();

const formPlaceCheckValid = new FormValidator(selectorClasses, popupPlaceForm);
formPlaceCheckValid.enableValidation();

popupProfileOpenButton.addEventListener("click", () => {
  formProfileCheckValid.clearFormErrors();
  formProfileCheckValid.handleInitialButtonState(profileSubmitButton);
  popupProfile.setInitialValues(userInfo.getUserInfo());
  popupProfile.open();
});

placePopupOpenButton.addEventListener("click", () => {
  formPlaceCheckValid.clearFormErrors();
  formProfileCheckValid.handleInitialButtonState(buttonPlaceSubmit);
  popupWithFormCards.open();
});
