
//  import "../pages/index.css";// импорт главного файла стилей 

// @todo: Темплейт карточки

//в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.
// content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки

//initCard - это функция предназначенная для создания карточки
// переменные
// a - заголовок картинки, строка string
// b - ссылка картинки,string
// с - функция колбек для удаления карточки со страницы
// возвращаемое значение:
//  шаблон элемента списка

function initCard(arrayEl, arrayIt, delFunction) {
  // ищем элемент с классом .places__item, клонируем элемент вместе с его содержимым,
  // присваимаем склонированный элемент вмсете с его содержимым в переменную cardElement

  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  //ищем элемент с классом .card__title, присваиваем приваиваем совйству элемента textContent значение аргумента arrayEl

  cardElement.querySelector(".card__title").textContent = arrayEl;
  const imgEl = cardElement.querySelector(".card__image");
  imgEl.src = arrayIt;
  imgEl.alt = arrayEl;

  // ищем элемент с классом .card__delete-button, addEventListener - устанвливает метод с для найденного элемента при событии click

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", delFunction);

  // возвращаем перменную содержащую шаблон элемента списка

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(event) {
  const eventElement = event.target;
  const listItem = eventElement.closest(".places__item");
  listItem.remove();
}

// @todo: Вывести карточки на страницу

//forEach передаётся функция, которая вызывается на каждом элементе массива.
//в качестве агрумента функции присваивается текущий элемент массива - item.

initialCards.forEach(function (item) {
  // функция переданная в метод forEach вызывает функцию initCard, которой переданы агрумены:
  //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки

  let appendCard = initCard(item.name, item.link, deleteCard);
  cardList.append(appendCard);
});