//Открытие и закрытие формы//

const openPopUp = document.querySelector(".profile__button-edit");
const closePopUp = document.querySelector(".popup__button-close");
const popUp = document.querySelector(".popup");

openPopUp.addEventListener("click", () => {
  popUp.classList.add("active");
});

closePopUp.addEventListener("click", () => {
  popUp.classList.remove("active");
});

//Отправка формы//

const popUpForm = document.querySelector("popup__form");

const inputName = document.querySelector(".popup__input-name");
const inputProf = document.querySelector(".popup__input-prof");

function formSubmitHandler(evt) {
  evt.preventDefault();
}

const profileName = document.querySelector(".profile__title");
const profileProf = document.querySelector(".profile__profession");
const nameText = inputName.value;
const profText = inputProf.value;
inputName.addEventListener("input", () => {
  profileName.textContent = inputName.value;
});

inputProf.addEventListener("input", () => {
  profileProf.textContent = inputProf.value;
});
// popUpForm.addEventListener("submit", formSubmitHandler);
