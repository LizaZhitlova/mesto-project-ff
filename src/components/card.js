// makeCard - это функция предназначенная для создания карточки
// переменные
// a - заголовок картинки, строка string
// b - ссылка картинки,string
// с - функция колбек для удаления карточки со страницы
// возвращаемое значение:
//  шаблон элемента списка

import { getMyId, deleteCardRequest, likeButtonRequest } from "./api.js";
import { popupClose } from "./modal.js";

export let currentDeletedCard;

export function makeCard(cardData, functionConfirmPopup, functionOpenCardImg) {
  //в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.
  // content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.
  const cardTemplate = document.querySelector("#card-template").content;
  // ищем элемент с классом .places__item, клонируем элемент вместе с его содержимым,
  // присваимаем склонированный элемент вмсете с его содержимым в переменную cardElement

  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  //ищем элемент с классом .card__title, присваиваем приваиваем совйству элемента textContent значение аргумента name

  cardElement.querySelector(".card__title").textContent = cardData.name;
  const imgElement = cardElement.querySelector(".card__image");
  imgElement.src = cardData.link;
  imgElement.alt = cardData.name;
  imgElement.id = cardData._id;
  imgElement.likes = cardData.likes;

  // делаем проверку если мой ID не совпадает ID владельца карточки - удаляем кнопку удаленя с карточки
  if (!(getMyId() === cardData.owner._id)) {
    cardElement
      .querySelector(".card__delete-button")
      .classList.add("card__delete-button-hidden");
  }

  // работа с лайками
  const likesCounter = cardElement.querySelector(".card__likes-number");
  // Устанавливаем начальное количество лайков
  likesCounter.textContent = cardData.likes.length;

  // ищем элемент с классом .card__delete-button, addEventListener - устанвливает метод с для найденного элемента при событии click

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", functionConfirmPopup);

  // возвращаем перменную содержащую шаблон элемента списка

  cardElement
    .querySelector(".card__image")
    .addEventListener("click", functionOpenCardImg);

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeButtonClicked);

  if (hasMyLike(imgElement.likes)) {
    switchLike(cardElement.querySelector(".card__like-button"), true);
  }

  return cardElement;
}

//Функция удаления карточки
export function deleteCard(evt) {
  const imgElement = currentDeletedCard.querySelector(".card__image");
  const imageId = imgElement.id;
  console.log("delete card");
  console.log(imageId);
  deleteCardRequest(imageId)
    .then(() => {
      currentDeletedCard.remove();
      currentDeletedCard = null;
      popupClose();
    })
    .catch((error) => {
      currentDeletedCard = null;
      console.error("Не удалось удалить карточку:", error);
    });
}

export const getcurrentDeletedCard = () => {
  return currentDeletedCard;
};
export const setCurrentDeletedCard = (card) => {
  currentDeletedCard = card;
};

// функция лайка
export function likeCard(evt) {
  if (!evt.target.classList.contains("card__like-button")) {
    return;
  }
  evt.target.classList.toggle("card__like-button_is-active");
  console.log(evt.target);
}

export function likeCounter(card, imgElement) {
  const likeCounter = card.querySelector(".card__likes-number");
  likeCounter.textContent = imgElement.likes.length;
}

function hasMyLike(cardLikes) {
  const myId = getMyId();
  return cardLikes.some((item) => item._id === myId);
}

function switchLike(likeButton, position) {
  if (
    position &&
    !likeButton.classList.contains("card__like-button_is-active")
  ) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }
}

function likeButtonClicked(evt) {//TODO В обработчик лайка карточки на 7-м спринте нужно, кроме id карточки, передавать как параметры элемент кнопки лайка и элемент, показывающий количество лайков, чтобы в обработчике не было повторного поиска этих элементов.
  const cardElement = evt.target.closest(".places__item");
  const imgElement = cardElement.querySelector(".card__image");
  const cardId = imgElement.id;
  const cardLikes = imgElement.likes;

  const hasLike = hasMyLike(cardLikes);
  const likeButton = cardElement.querySelector(".card__like-button");

  // Вызываем нужный запрос: поставить или снять лайк
  likeButtonRequest(cardId, !hasLike)
    .then((newCardData) => {
      imgElement.likes = newCardData.likes;
      likeCounter(cardElement, imgElement);
      switchLike(likeButton, hasMyLike(newCardData.likes));
    })
    .catch((error) => {
      console.error("Ошибка при обновлении лайка:", error);
    });
}
