import { setCurrentDeletedCard, deleteCard } from "./card.js";
import { popupConfirm } from "../index.js";
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
// функция открытия попапа удаления карточки
export function openConfirmPopup(evt) {
  if (!evt.target.classList.contains("card__delete-button")) {
    return;
  }
  const cardElement = evt.target.closest(".places__item");

  // // Получаем элемент изображения внутри этой карточки
  const imgElement = cardElement.querySelector(".card__image");
  // // Получаем ID изображения
  // const imageId = imgElement.id;
  openPopup(popupConfirm);
  const card = document.querySelector(".card");

  setCurrentDeletedCard(cardElement);
  popupConfirm
    .querySelector(".popup__button-confirm")
    .addEventListener("click", deleteCard);//TODO Обработчик deleteCard нужно добавить один раз при загрузке страницы (в глобальной области видимости в index.js), а не при каждом открытии попапа.
}
