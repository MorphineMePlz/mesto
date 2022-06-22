const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input-name");
const inputProf = popupForm.querySelector(".popup__input-prof");
const profileName = document.querySelector(".profile__title");
const profileProf = document.querySelector(".profile__profession");
const openPopup = document.querySelector(".profile__button-edit");
const closePopup = popup.querySelector(".popup__button-close");
const likeBtn = document.querySelector(".gallery__button");

//Открытие и закрытие формы//

function popupCloseHandler() {
  popup.classList.remove("popup__active");
}

openPopup.addEventListener("click", () => {
  inputName.setAttribute("value", profileName.textContent);
  inputProf.setAttribute("value", profileProf.textContent);
  popup.classList.add("popup__active");
});

//Отправка формы//

function formSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  popupCloseHandler();
}

popupForm.addEventListener("submit", formSubmitHandler);
closePopup.addEventListener("click", popupCloseHandler);

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("gallery__button_active");
});
