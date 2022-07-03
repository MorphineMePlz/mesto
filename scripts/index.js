const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProf = popupForm.querySelector(".popup__input_type_prof");
const profileName = document.querySelector(".profile__title");
const profileProf = document.querySelector(".profile__profession");
const openPopup = document.querySelector(".profile__edit-button");
const closePopup = popup.querySelector(".popup__close-button");
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
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const createGalleryElement = () => {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__list-item")
    .cloneNode(true);

  galleryElement.querySelector(".gallery__image").src = initialCards[0].link;
  galleryElement.querySelector(".gallery__image").alt = initialCards[0].name;
  galleryElement.querySelector(".gallery__title").textContent =
    initialCards[0].name;

  galleryList.prepend(galleryElement);
};

createGalleryElement();

openPopup.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputProf.value = profileProf.textContent;
  popup.classList.add("popup_active");
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

popupForm.addEventListener("submit", formSubmitHandler);
closePopup.addEventListener("click", popupCloseHandler);
