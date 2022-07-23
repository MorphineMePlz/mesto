//Validation;

const allSelectorsClass = {
  form: ".popup__form",
  button: ".popup__submit-button",
  input: ".popup__input",
  inputTypeError: "popup__input_type_error",
  buttonDisabled: "popup__submit-button_disabled",
};

function enableValidation(config) {
  const form = Array.from(document.querySelectorAll(config.form));
  form.forEach((form) => {
    const button = form.querySelector(config.button);
    form.addEventListener("input", (event) => {
      handlerFormInput(event, config, button);
    });
  });
}

function handlerFormInput(event, config, button) {
  const input = event.target;
  const form = event.currentTarget;
  const isValid = form.checkValidity();
  showFieldError(input, config);
  setSubmitButtonState(button, config, isValid);
}

function showFieldError(input, config) {
  const span = input.nextElementSibling;
  span.textContent = input.validationMessage;
  if (input.validationMessage !== "") {
    input.classList.add(config.inputTypeError);
  } else {
    input.classList.remove(config.inputTypeError);
  }
}

function setSubmitButtonState(button, config, isValid) {
  if (isValid) {
    button.disabled = false;
    button.classList.remove(config.buttonDisabled);
  }
  if (!isValid) {
    button.disabled = true;
    button.classList.add(config.buttonDisabled);
  }
}

enableValidation(allSelectorsClass);