import { editProfileAvatarRequest } from "./api.js";
import { clearValidation, config } from "./validation.js";
import {
  getcurrentDeletedCard,
  setCurrentDeletedCard,
  deleteCard,
} from "./card.js";

// в файл modal.js помещаем функции отвечающе за работу попапов

let currentOpenedPopup = null; //создаём переменную currentOpenedPopup, данная переменная будет хранить текущий открытй попап.

// функция открытия попапа
export function openPopup(popupElement) {
  // popupElement.classList.add("popup_is-animated");
  popupElement.classList.add("popup_is-opened");
  currentOpenedPopup = popupElement;
  currentOpenedPopup.addEventListener("click", closePopupByOverlay); // при открытии попапа вешаем на текущий открытый попап прослушиватель событий, в колбэк
  // прослушивателя передаём функцию, которая закрывает попапа по нажанию на оверлей.
  //СПОСИТЬ Почему при нажатии на сам попапа оне не закрывается?
  document.addEventListener("keydown", closeByEsc);
}

// функция закрытия попапа, которая записывается в колбэк прослушивателя событий- с текущего открытого попапа снимаем класс .popup_is-opened
export function popupClose() {
  currentOpenedPopup.classList.remove("popup_is-opened");
  currentOpenedPopup.removeEventListener("click", closePopupByOverlay);
  document.removeEventListener("keydown", closeByEsc);
  currentOpenedPopup = null;
}

// функция closePopupbyOverlay передаётся в прослуiиватель событий, который навешивается на текущий открытый попап (currentOpenedPopup)
function closePopupByOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    popupClose();
  }
}

// функция закрытия попапа через esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    popupClose();
  }
}

// функция открытия попапа редактировать аватар

export function openEditAvatarPopup(evt) {
  if (!evt.target.classList.contains("profile__image")) {
    return;
  }
  const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
  popupEditAvatar
    .querySelector(".popup__button-edit-avatar")
    .addEventListener("click", editAvatarSubmit);
  const formNewAvatar = popupEditAvatar.querySelector('[name ="edit-avatar"]');
  clearValidation(formNewAvatar, config);
  formNewAvatar.reset();
  openPopup(popupEditAvatar);
}

//Функция отправки новой ссылки на аватар вызывается на кнопке сохранить
function editAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatarInput = document.querySelector(
    ".popup__input_type_url-avatar"
  );
  const newAvatarValue = newAvatarInput.value;
  const buttonElement = evt.target;
  editProfileAvatarRequest(newAvatarValue, buttonElement)
    .then((profile) => {
      const newprofileAvatar = document.querySelector(".profile__image");
      newprofileAvatar.style.backgroundImage = `url('${profile.avatar}')`;
      const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
      popupClose(popupEditAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
      alert("Не удалось обновить аваьар профиля");
    });
}
// функция открытия попапа удаления карточки
export function openConfirmPopup(evt) {
  if (!evt.target.classList.contains("card__delete-button")) {
    return;
  }
  const cardElement = evt.target.closest(".places__item");

  // Получаем элемент изображения внутри этой карточки
  const imgElement = cardElement.querySelector(".card__image");
  // Получаем ID изображения
  const imageId = imgElement.id;
  //const card = document.querySelector(".card");

  const popupConfirm = document.querySelector(".popup_type_confirm");
  setCurrentDeletedCard(cardElement);
  popupConfirm
    .querySelector(".popup__button-confirm")
    .addEventListener("click", deleteCard);
  openPopup(popupConfirm);
}
