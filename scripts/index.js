const popup = document.querySelector(".popup");
const popupForm = popup.querySelector(".popup__form");
const inputName = popupForm.querySelector(".popup__input-name");
const inputProf = popupForm.querySelector(".popup__input-prof");
const profileName = document.querySelector(".profile__title");
const profileProf = document.querySelector(".profile__profession");
const openPopup = document.querySelector(".button__edit");
const closePopup = popup.querySelector(".button__close");
const likeBtn = document.querySelector(".button__like");

openPopup.addEventListener("click", () => {
  inputName.setAttribute("value", profileName.textContent);
  inputProf.setAttribute("value", profileProf.textContent);
  popup.classList.add("popup__active");
});

function popupCloseHandler() {
  popup.classList.remove("popup__active");
}

function formSubmitHandler(event) {
  event.preventDefault();

  profileName.textContent = inputName.value;
  profileProf.textContent = inputProf.value;
  popupCloseHandler();
}

popupForm.addEventListener("submit", formSubmitHandler);
closePopup.addEventListener("click", popupCloseHandler);

likeBtn.addEventListener("click", () => {
  likeBtn.classList.toggle("button__like_active");
});
