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

// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

// const formElement = document.querySelectorAll(".popup__form");
// formElement.forEach((form) => {
//   const formInput = form.querySelectorAll(".popup__input");
//   console.log(formInput);
// });

// function setCustomError(input) {
//   const validity = input.validity;
//   input.
// }

const profileName = document.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__profession");
const inputName = document.querySelector(".popup__input_type_name");
const inputProfession = document.querySelector(".popup__input_type_prof");

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
    profileName.textContent = inputName.value;
    profileProfession.textContent = inputProfession.value;
  }
}

function handlerFormInput(event) {
  const input = event.target;
  const form = event.currentTarget;
  if (!input.validity.valid) {
    showInputError(input);
  } else {
    hideInputError(input);
  }
  input.addEventListener("input", handlerFormInput);
  setCustomError(input);
  showFieldError(input);
  console.log(event.target.validity.valid);
}

const showInputError = (element) => {
  element.classList.add("popup__input_type_error");
};

const hideInputError = (element) => {
  element.classList.remove("popup__input_type_error");
};

function setCustomError(input) {
  const validity = input.validity;
  input.setCustomValidity("");
}

function showFieldError(input) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
}

enableValidation(formChangeProfile);
