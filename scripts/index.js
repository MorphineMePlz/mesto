import initialCards from "./cards.js";

// Change popup

const profilePopup = document.querySelector(".popup_profile");
const popupForm = profilePopup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProfession = popupForm.querySelector(".popup__input_type_prof");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupProfileCloseButton = profilePopup.querySelector(
  ".popup__close-button"
);

// Place popup

const popupPlace = document.querySelector(".popup_new-place");
const placePopupOpenButton = document.querySelector(".profile__plus-button");
const placePopupCloseButton = popupPlace.querySelector(".popup__close-button");
const popupPlaceForm = popupPlace.querySelector(".popup__form");
const inputPlaceName = popupPlaceForm.querySelector(".popup__input_type_place");
const inputPlaceLink = popupPlaceForm.querySelector(".popup__input_type_link");

// Zoom popup

const popupZoom = document.querySelector(".popup_image");
const imageZoomCloseButton = popupZoom.querySelector(".popup__close-button");
const popupZoomImage = popupZoom.querySelector(".popup__image-place");
const popupZoomTitle = popupZoom.querySelector(".popup__image-title");

const galleryList = document.querySelector(".gallery__list");
const galleryTemplate = document.querySelector(".gallery__template").content;

function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

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
    openPopup(popupZoom);
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
  const galleryItem = createCard(card);
  renderCard(galleryItem);
  closePopup(popupPlace);
}

popupForm.addEventListener("submit", profileFormSubmitHandler);
popupPlaceForm.addEventListener("submit", formSubmitPlaceHandler);
popupProfileCloseButton.addEventListener("click", () =>
  closePopup(profilePopup)
);
placePopupCloseButton.addEventListener("click", () => closePopup(popupPlace));
imageZoomCloseButton.addEventListener("click", () => closePopup(popupZoom));

popupProfileOpenButton.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  openPopup(profilePopup);
});

placePopupOpenButton.addEventListener("click", () => {
  popupPlaceForm.reset();
  openPopup(popupPlace);
});

const popup = document.querySelectorAll(".popup");
popup.forEach((i) => {
  i.addEventListener("click", (e) => {
    if (e.target === i) {
      closePopup(profilePopup);
      closePopup(popupPlace);
      closePopup(popupZoom);
    }
  });
});

document.addEventListener("keydown", (e) => {
  if (e.code === "Escape") {
    closePopup(profilePopup);
    closePopup(popupPlace);
    closePopup(popupZoom);
  }
});

//Validation

const formElement = document.querySelectorAll(".popup__form");
const formInput = document.querySelectorAll(".popup__input");

const showInputError = (element) => {
  element.classList.add("popup__input_type_error ");
};

const hideInputError = (element) => {
  element.classList.remove("popup__input_type_error ");
};

formInput.forEach((input) => {
  const isValid = () => {
    if (!input.validity.valid) {
      showInputError(input);
    } else {
      hideInputError(input);
    }
  };
  input.addEventListener("input", isValid);
});

formElement.forEach((form) => {
  form.addEventListener("submit", function (evt) {
    evt.preventDefault();
  });
});
