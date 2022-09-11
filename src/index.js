import "./pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Section from "./scripts/Section.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import UserInfo from "./scripts/UserInfo.js";
import { api } from "./scripts/Api.js";
import { selectorClasses, classCreationSelectors } from "./utils/constants.js";
import {
  popupProfileOpenButton,
  popupPlace,
  profilePopup,
  placePopupOpenButton,
} from "./utils/domElements.js";
import PopupConfirm from "./scripts/PopupConfirm";

const popupLoader = new PopupWithImage(classCreationSelectors.loaderPopup);

const popupConfirm = new PopupConfirm(
  classCreationSelectors.confirmationPopup,
  (id) => {
    popupLoader.openLoader();
    api
      .deleteOwnCard(id)
      .then(() => {
        popupConfirm.close();
        getCards();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        popupLoader.close();
      });
  }
);

const openConfirmationPopup = (id) => {
  popupConfirm.open(id);
};

const createCard = (cardData) => {
  const card = new Card(cardData, selectorClasses.template, {
    handleCardClick: (obj) => popupImage.open(obj),
    openPopupConfirm: (id) => openConfirmationPopup(id),
    handlePutLike: (id) =>
      api.likeCard(id).then((res) => {
        card.resetLikes(res.likes.length);
      }),
    handleDeleteLike: (id) =>
      api.removeCardLike(id).then((res) => {
        card.removeLike(res.likes.length);
      }),
  });

  const cardElement = card.generateCard();

  return cardElement;
};

const userInfo = new UserInfo({
  nameSelector: classCreationSelectors.userName,
  jobSelector: classCreationSelectors.userJob,
});

api
  .getUserInformation()
  .then((res) => {
    userInfo.setUserInfo({ name: res.name, job: res.about });
    localStorage.setItem("userId", res._id);
  })
  .catch((error) => console.log(error));

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

const getCards = () => {
  popupLoader.openLoader();
  api
    .getInitialCards()
    .then((res) => {
      res.reverse().map((element) => {
        cardsArrayFromServer.push(element);
      });
      section.generateCards();
    })
    .catch((error) => console.log(error))
    .finally(() => popupLoader.close());
};

getCards();

const popupProfile = new PopupWithForm({
  popupSelector: classCreationSelectors.profilePopup,
  handleSubmit: (v) =>
    api.editUserInformation(v).then((res) => {
      userInfo.setUserInfo({ name: res.name, job: res.about });
    }),
});

const popupWithFormCards = new PopupWithForm({
  popupSelector: classCreationSelectors.placePopup,
  handleSubmit: ({ place, link }) => {
    api.addNewCard({ place, link }).then((res) => {
      const cardElement = createCard(res);
      section.addItem(cardElement);
    });
    popupWithFormCards.close();
  },
});

const popupImage = new PopupWithImage(classCreationSelectors.imagePopup);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupWithFormCards.setEventListeners();
popupConfirm.setEventListeners();
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
