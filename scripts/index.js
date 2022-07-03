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

const createGalleryElement = (card) => {
  const galleryElement = galleryTemplate
    .querySelector(".gallery__list-item")
    .cloneNode(true);

  galleryElement.querySelector(".gallery__image").src = card.link;
  galleryElement.querySelector(".gallery__image").alt = card.name;
  galleryElement.querySelector(".gallery__title").textContent = card.name;

  const likeBtn = galleryElement.querySelector(".gallery__like-button");
  const deleteBtn = galleryElement.querySelector(".gallery__delete-button");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("gallery__like-button_active");
  });

  deleteBtn.addEventListener("click", () => {
    console.log("delete");
  });

  galleryList.prepend(galleryElement);
};

initialCards.forEach((card) => {
  createGalleryElement(card);
});

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
