//Validation;

// const formElement = document.querySelector(".popup__form");
// const formInput = formElement.querySelector(".popup__input");

// const showInputError = (element) => {
//   element.classList.add("popup__input_type_error");
// };

// const hideInputError = (element) => {
//   element.classList.remove("popup__input_type_error");
// };

// const isValid = () => {
//   if (!formInput.validity.valid) {
//     // Если поле не проходит валидацию, покажем ошибку
//     showInputError(formInput);
//   } else {
//     // Если проходит, скроем
//     hideInputError(formInput);
//   }
// };

// formElement.addEventListener("submit", function (evt) {
//   // Отменим стандартное поведение по сабмиту
//   evt.preventDefault();
// });

// formInput.addEventListener("input", isValid);

// const formElement = document.querySelectorAll(".popup__form");
// formElement.forEach((form) => {
//   const formInput = form.querySelectorAll(".popup__input");
//   console.log(formInput);
// });

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

const profilePopup = document.querySelector(".popup_profile");
const popupForm = profilePopup.querySelector(".popup__form");
const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");
const inputName = popupForm.querySelector(".popup__input_type_name");
const inputProfession = popupForm.querySelector(".popup__input_type_prof");

const formChangeProfile = {
  form: '.popup__form[name="changeProfile"]',
};

function enableValidation(config) {
  const form = document.querySelector(config.form);
  form.addEventListener("submit", handlerFormSubmit);
  form.addEventListener("input", handlerFormInput);
}

function handlerFormSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const isValid = form.checkValidity();
  if (isValid) {
    alert("ok");
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
  } else {
    alert("not ok");
  }
}

function handlerFormInput(event) {
  const input = event.target;
  const form = event.currentTarget;
  if (!input.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(input);
  } else {
    // Если проходит, скроем
    hideInputError(input);
  }
  input.addEventListener("input", handlerFormInput);
  console.log(event.target.validity.valid);
}

const showInputError = (element) => {
  element.classList.add("popup__input_type_error");
};

const hideInputError = (element) => {
  element.classList.remove("popup__input_type_error");
};

enableValidation(formChangeProfile);
