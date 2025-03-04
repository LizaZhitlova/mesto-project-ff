import "./index.css"; // импорт главного файла стилей
import { initialCards } from "./cards.js";

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

// реализовываем всплывающие окна

const Popupedit = document.querySelector(".popup_type_edit"); // находим блок в котором лежит код попапа "Редактировать профиль" и присваиваем значение в переменную Popupedit
const Popupnewcard = document.querySelector(".popup_type_new-card"); // находим блок в котором лежит код папапа "Новое место" и присваиваем в переменную Popupnewcard
const editButtonopen = document.querySelector(".profile__edit-button"); // находим кнопку, которая открываем попап, который редактирует профиль значение присваиваем переменной editButtonopen
const addButtonopen = document.querySelector(".profile__add-button"); //находим кнопку, которая открываем попап, который добаляет новое место занчение присваиваем в переменную addButtonopen
const ImagePopup = document.querySelector(".popup_type_image"); // находим блок в котором лежит код попапа для картинкии значение присваиваем в переменную ImagePopup
const popupButtonclose = document.querySelectorAll(".popup__close"); // получаем коллекуию кнопок, которые закрывают попапы (крестик), коллекцию присваиваем переменной popupButtonclose
let CurrentOpenedPopup = null; // создаём переменную CurrentOpenedPopup, данная переменная будет хранить текущий открытй попап.


// методом  forEach перебираем коллекцию кнопок, лежащую в popupButtonclose для кажой добавлеям прослушиватель событий, в колбэк прослушивателя записываемфункцию PopupClose
popupButtonclose.forEach(function (closeitem) {
  closeitem.addEventListener("click", PopupClose);
});


// функция закрытия попапа, которая записывается в колбэк прослушивателя событий- с текущего открытого попапа снимаем класс .popup_is-opened
function PopupClose() {
  CurrentOpenedPopup.classList.remove("popup_is-opened");
  CurrentOpenedPopup.removeEventListener("click", closePopupbyOverlay);
  CurrentOpenedPopup = null;
}

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup
editButtonopen.addEventListener("click", (evt) => {
  evt.preventDefault();
  OpenPopup(Popupedit);
});

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup
addButtonopen.addEventListener("click", (evt) => {
  evt.preventDefault();
  OpenPopup(Popupnewcard);
});

// функция открытия попапа

function OpenPopup(selectoritem) {
  selectoritem.classList.add("popup_is-opened");
  CurrentOpenedPopup = selectoritem;
  CurrentOpenedPopup.addEventListener("click", closePopupbyOverlay); // при открытии попапа вешаем на текущий открытый попап прослушиватель событий, в колбэк
  // прослушивателя передаём функцию, которая закрывает попапа по нажанию на оверлей.
  //СПОСИТЬ Почему при нажатии на сам попапа оне не закрывается?
}

// реализация закрытия попапа через кнопку Esc
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    CurrentOpenedPopup.classList.remove("popup_is-opened");
    CurrentOpenedPopup.removeEventListener("click", closePopupbyOverlay);
  }
});

// функция closePopupbyOverlay передаётся в прослуживатель событий, который навешиается на текущий открытый попап (CurrentOpenedPopup)
function closePopupbyOverlay(evt) {
  if (evt.currentTarget === evt.target) {
    CurrentOpenedPopup.classList.remove("popup_is-opened");
    CurrentOpenedPopup.removeEventListener("click", closePopupbyOverlay);
  }
};

// реализовывем открытие поапа по нажатию на картинку

// вещаем прослушиватель событый на список с карточками (здесь работает высплытие, список карточек является родительким для элементов списка, в котором хранятся карточки)
// в колбэк прослушивателя записываем функцию OpenCardIM.
cardList.addEventListener("click", OpenCardIMG);

// в функции OpenCardIMG делаем проверку если элемент по на котором произошло событие не сожержит класс .card__image - прекрашаем функцию
// в переменную currentimg присваиваем значение элемента, на котором произошло событие
// впеременных imglink и imgname получаем значения src и alt переменной currentim
// ищем в документе элемент кртинки и присываиваем значение в переменную IMG
// свойствам src и alt переменной IMG (т.е. нашей картинке ) присваиваем знаяения полученные в переменных imglink и imgname
//ищем в документе элемент параграфа(т.е. названия картинки) и присываиваем значение в переменную IMGCaption
// свойству .textContent переменной IMGCaption присваиваем значение полученное в imglink
function OpenCardIMG(evt) {
  if (!evt.target.classList.contains("card__image")) {
    return;
  }
  let currentimg = evt.target;
  let imglink = currentimg.src;
  let imgname = currentimg.alt;
  const IMG = document.querySelector(".popup__image");
  IMG.src = imglink;
  IMG.alt = imgname;
  const IMGCaption = document.querySelector(".popup__caption");
  IMGCaption.textContent = imgname;
  OpenPopup(ImagePopup);
}
