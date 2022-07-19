Validation;

const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");

const showInputError = (element) => {
  element.classList.add("popup__input_type_error");
};

const hideInputError = (element) => {
  element.classList.remove("popup__input_type_error");
};

const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  }
};

formElement.addEventListener("submit", function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

formInput.addEventListener("input", isValid);
