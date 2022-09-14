import "./index.css";

import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupConfirm from "../scripts/PopupConfirm";

import { api } from "../scripts/Api.js";

import { selectorClasses, classCreationSelectors } from "../utils/constants.js";
import {
  popupProfileOpenButton,
  popupPlace,
  popupAvatar as popupAvatarElement,
  profilePopup,
  placePopupOpenButton,
  openButtonChangeAvatar,
} from "../utils/domElements.js";

const popupLoader = new PopupWithImage(classCreationSelectors.loaderPopup);

const popupConfirm = new PopupConfirm(
  classCreationSelectors.confirmationPopup,
  (id, card) => {
    api
      .deleteOwnCard(id)
      .then(() => {
        popupLoader.openLoader();
        card.remove();
        popupConfirm.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupLoader.close();
      });
  }
);

const openConfirmationPopup = (id, cardElement) => {
  popupConfirm.open(id, cardElement);
};

const createCard = (cardData) => {
  const card = new Card(cardData, selectorClasses.template, {
    handleCardClick: (obj) => popupImage.open(obj),
    openPopupConfirm: (id, cardElement) =>
      openConfirmationPopup(id, cardElement),
    handleLikeClick: (evt, id) => handleLike(evt, id, card),
  });

  const cardElement = card.generateCard();

  return cardElement;
};

const handleLike = (evt, id, card) => {
  const isCardLiked = evt.target.classList.contains(
    "gallery__like-button_active"
  );

  card.handleLikeButtonState({ isLoadig: true });

  if (isCardLiked) {
    api
      .removeCardLike(id)
      .then((res) => {
        card.setLikesValue(res.likes.length);
        card.handleLikeButtonState({ isLoadig: false });
      })
      .catch((error) => console.log(error));
  } else {
    api
      .likeCard(id)
      .then((res) => {
        card.setLikesValue(res.likes.length);
        card.handleLikeButtonState({ isLoadig: false });
      })
      .catch((error) => console.log(error));
  }
};

const userInfo = new UserInfo({
  nameSelector: classCreationSelectors.userName,
  jobSelector: classCreationSelectors.userJob,
  avatarSelector: classCreationSelectors.userAvatar,
});

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    popupLoader.close();
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
    localStorage.setItem("userId", userData._id);

    initialCards.reverse().map((element) => {
      cardsArrayFromServer.push(element);
    });
    section.generateCards();
  })
  .catch((error) => {
    console.log(error);
  });

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

const popupProfile = new PopupWithForm({
  popupSelector: classCreationSelectors.profilePopup,
  handleSubmit: (v) =>
    api
      .editUserInformation(v)
      .then((res) => {
        userInfo.setUserInfo({
          name: res.name,
          job: res.about,
          avatar: res.avatar,
        });
        popupProfile.handleSubmitButton({ isLoading: false });
        popupProfile.close();
      })
      .catch((error) => console.log(error)),
});

const popupWithFormCards = new PopupWithForm({
  popupSelector: classCreationSelectors.placePopup,
  handleSubmit: ({ place, link }) => {
    api
      .addNewCard({ place, link })
      .then((res) => {
        const cardElement = createCard(res);
        section.addItem(cardElement);
        popupWithFormCards.handleSubmitButton({ isLoading: false });
        popupWithFormCards.close();
      })
      .catch((error) => console.log(error));
  },
});

const popupAvatar = new PopupWithForm({
  popupSelector: classCreationSelectors.popupAvatar,
  handleSubmit: ({ avatar }) => {
    api
      .changeAvatar(avatar)
      .then((res) => {
        userInfo.setAvatar(res.avatar);
        popupAvatar.handleSubmitButton({ isLoading: false });
        popupAvatar.close();
      })
      .catch((error) => console.log(error));
  },
});

const popupImage = new PopupWithImage(classCreationSelectors.imagePopup);

popupImage.setEventListeners();
popupProfile.setEventListeners();
popupWithFormCards.setEventListeners();
popupConfirm.setEventListeners();
popupAvatar.setEventListeners();
section.generateCards();

const formProfileCheckValid = new FormValidator(selectorClasses, profilePopup);
formProfileCheckValid.enableValidation();

const formPlaceCheckValid = new FormValidator(selectorClasses, popupPlace);
formPlaceCheckValid.enableValidation();

const formAvatarCheckValid = new FormValidator(
  selectorClasses,
  popupAvatarElement
);
formAvatarCheckValid.enableValidation();

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

openButtonChangeAvatar.addEventListener("click", () => {
  formAvatarCheckValid.clearFormErrors();
  popupAvatar.open();
});
