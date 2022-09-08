import "./pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import Api from "./scripts/Api.js";

import {
  selectorClasses,
  classCreationSelectors,
  initialCards,
} from "./utils/constants.js";

import {
  popupProfileOpenButton,
  popupPlace,
  profilePopup,
  placePopupOpenButton,
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

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "ecb6ef6c-d4a1-4cc5-86ed-4ee02166ff91",
    "Content-Type": "application/json",
  },
});

const apiCards = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50/cards",
  headers: {
    authorization: "ecb6ef6c-d4a1-4cc5-86ed-4ee02166ff91",
    "Content-Type": "application/json",
  },
});

api
  .getUserInformation()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, job: res.about });
  })
  .catch((error) => console.log("Ошибка:"`${error}`));

const cardsArrayFromServer = [];
const section = new Section(
  {
    items: cardsArrayFromServer,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  classCreationSelectors.cardList
);

apiCards.getInitialCards().then((res) => {
  res.forEach((element, index) => {
    cardsArrayFromServer[index] = element;
  });
  section.generateCards();
});

const popupProfile = new PopupWithForm({
  popupSelector: classCreationSelectors.profilePopup,
  handleSubmit: (v) => userInfo.setUserInfo(v),
});
const popupWithFormCards = new PopupWithForm({
  popupSelector: classCreationSelectors.placePopup,
  handleSubmit: (data) => {
    const cardElement = createCard(data);
    section.addItem(cardElement);
    popupWithFormCards.close();
  },
});

const popupImage = new PopupWithImage(classCreationSelectors.imagePopup);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupWithFormCards.setEventListeners();
section.generateCards();

const formProfileCheckValid = new FormValidator(selectorClasses, profilePopup);
formProfileCheckValid.enableValidation();

const formPlaceCheckValid = new FormValidator(selectorClasses, popupPlace);
formPlaceCheckValid.enableValidation();

popupProfileOpenButton.addEventListener("click", () => {
  formProfileCheckValid.clearFormErrors();
  const initialData = userInfo.getUserInfo();
  popupProfile.setInitialValues(initialData);
  popupProfile.open();
});

placePopupOpenButton.addEventListener("click", () => {
  formPlaceCheckValid.clearFormErrors();
  popupWithFormCards.open();
});
