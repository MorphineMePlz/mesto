import initialCards from "./cards.js";
console.log(initialCards);

// Change popup

const profilePopup = document.querySelector(".popup_profile");
const popupForm = profilePopup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProfession = popupForm.querySelector(".popup__input_type_prof");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");
const popupFormOpenButton = document.querySelector(".profile__edit-button");
const popupFormCloseButton = profilePopup.querySelector(".popup__close-button");

// Place popup

const popupPlace = document.querySelector(".popup_new-place");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");
const placePopupOpenButton = document.querySelector(".profile__plus-button");
const placePopupCloseButton = popupPlace.querySelector(".popup__close-button");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputPlaceName = popupPlaceForm.querySelector(".popup__input_type_place");

// Zoom popup

const popupZoom = document.querySelector(".popup_image");
const imageZoomCloseButton = popupZoom.querySelector(".popup__close-button");
const popupZoomImage = popupZoom.querySelector(".popup__image-place");
const popupZoomTitle = popupZoom.querySelector(".popup__image-title");

const inputPlaceLink = popupPlaceForm.querySelector(".popup__input_type_link");
const galleryList = document.querySelector(".gallery__list");
const galleryTemplate = document.querySelector(".gallery__template").content;
// const initialCards = [
//   {
//     name: "Архыз",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//   },
//   {
//     name: "Челябинская область",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//   },
//   {
//     name: "Иваново",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//   },
//   {
//     name: "Камчатка",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//   },
//   {
//     name: "Алматы",
//     link: "https://images.unsplash.com/photo-1600255531849-9edcc7c3d115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
//   },
//   {
//     name: "Байкал",
//     link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//   },
// ].reverse();

const createCard = (card) => {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__list-item")
    .cloneNode(true);

  const galleryImage = galleryElement.querySelector(".gallery__image");

  galleryImage.src = card.link;
  galleryImage.alt = card.name;
  galleryElement.querySelector(".gallery__title").textContent = card.name;

  const buttonLike = galleryElement.querySelector(".gallery__like-button");
  const buttonDelete = galleryElement.querySelector(".gallery__delete-button");

  buttonLike.addEventListener("click", () => {
    buttonLike.classList.toggle("gallery__like-button_active");
  });

  buttonDelete.addEventListener("click", () => {
    const listItem = buttonDelete.closest(".gallery__list-item");
    listItem.remove();
  });

  galleryImage.addEventListener("click", () => {
    popupZoom.classList.add("popup_active");
    popupZoomImage.src = card.link;
    popupZoomImage.alt = card.name;
    popupZoomTitle.textContent = card.name;
  });

  return galleryElement;
};

const renderCard = (card) => {
  galleryList.prepend(card);
};

initialCards.forEach((card) => {
  const galleryItem = createCard(card);
  renderCard(galleryItem);
});

// function closePopup(popup) {
//   return popup.classList.remove(".popup_active");
// }

// closePopup(profilePopup);

function closeProfilePopupHandler() {
  profilePopup.classList.remove("popup_active");
}
function closeImagesZoomPopupHandler() {
  popupZoom.classList.remove("popup_active");
}

function closePlacePopupHandler() {
  popupPlace.classList.remove("popup_active");
}

function profileFormSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closeProfilePopupHandler();
}

function formSubmitPlaceHandler(event) {
  event.preventDefault();
  const card = {
    name: inputPlaceName.value,
    link: inputPlaceLink.value,
  };
  renderCard(createCard(card));
  closePlacePopupHandler();
}

// Event Listeners

popupForm.addEventListener("submit", profileFormSubmitHandler);
popupPlaceForm.addEventListener("submit", formSubmitPlaceHandler);
popupFormCloseButton.addEventListener("click", closeProfilePopupHandler);
placePopupCloseButton.addEventListener("click", closePlacePopupHandler);
imageZoomCloseButton.addEventListener("click", closeImagesZoomPopupHandler);

popupFormOpenButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  profilePopup.classList.add("popup_active");
});

placePopupOpenButton.addEventListener("click", () => {
  inputPlaceName.value = "";
  inputPlaceLink.value = "";
  popupPlace.classList.add("popup_active");
});
