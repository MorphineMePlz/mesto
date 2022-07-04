// Change popup

const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProf = popupForm.querySelector(".popup__input_type_prof");
const profileName = document.querySelector(".profile__title");
const profileProf = document.querySelector(".profile__profession");
const openPopup = document.querySelector(".profile__edit-button");
const closePopup = popup.querySelector(".popup__close-button");

// Place popup

const popupPlace = document.querySelector(".popup_new-place");
const inputPlace = document.querySelector(".popup__input_type_place");
const inputLink = document.querySelector(".popup__input_type_link");
const openPlacePopupBtn = document.querySelector(".profile__plus-button");
const closePlacePopupBtn = popupPlace.querySelector(".popup__close-button");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputePlaceName = popupPlaceForm.querySelector(
  ".popup__input_type_place"
);

// Zoom popup

const popupZoom = document.querySelector(".popup_image");
const closeZoomImageBtn = popupZoom.querySelector(".popup__close-button");
const popupZoomImage = popupZoom.querySelector(".popup__image-place");
const popupZoomTitle = popupZoom.querySelector(".popup__image-title");

const inputePlaceLink = popupPlaceForm.querySelector(".popup__input_type_link");
const galleryList = document.querySelector(".gallery__list");
const galleryTemplate = document.querySelector(".gallery__template").content;
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Алматы",
    link: "https://images.unsplash.com/photo-1600255531849-9edcc7c3d115?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const createGalleryElement = (card) => {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__list-item")
    .cloneNode(true);

  const galleryImage = galleryElement.querySelector(".gallery__image");

  galleryImage.src = card.link;
  galleryImage.alt = card.name;
  galleryElement.querySelector(".gallery__title").textContent = card.name;

  const likeBtn = galleryElement.querySelector(".gallery__like-button");
  const deleteBtn = galleryElement.querySelector(".gallery__delete-button");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("gallery__like-button_active");
  });
  galleryList.prepend(galleryElement);

  deleteBtn.addEventListener("click", () => {
    const listItem = deleteBtn.closest(".gallery__list-item");
    listItem.remove();
  });

  galleryImage.addEventListener("click", () => {
    popupZoom.classList.add("popup_active");
    popupZoomImage.src = card.link;
    popupZoomImage.alt = card.name;
    popupZoomTitle.textContent = card.name;
  });
};

initialCards.forEach((card) => {
  createGalleryElement(card);
});

function popupCloseHandler() {
  popup.classList.remove("popup_active");
}

function formSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  popupCloseHandler();
}

function newPlacePopupCloseHander() {
  popupPlace.classList.remove("popup_active");
}

function zoomImagePopupCloseHandler() {
  popupZoom.classList.remove("popup_active");
}

function formSubmitPlaceHandler(event) {
  event.preventDefault();
  const card = {
    name: inputePlaceName.value,
    link: inputePlaceLink.value,
  };
  createGalleryElement(card);
  newPlacePopupCloseHander();
}

// Event Listeners

popupForm.addEventListener("submit", formSubmitHandler);
popupPlaceForm.addEventListener("submit", formSubmitPlaceHandler);
closePopup.addEventListener("click", popupCloseHandler);
closePlacePopupBtn.addEventListener("click", newPlacePopupCloseHander);
closeZoomImageBtn.addEventListener("click", zoomImagePopupCloseHandler);

openPopup.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputProf.value = profileProf.textContent;
  popup.classList.add("popup_active");
});

openPlacePopupBtn.addEventListener("click", () => {
  inputePlaceName.value = "";
  inputePlaceLink.value = "";
  popupPlace.classList.add("popup_active");
});
