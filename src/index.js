
 import "./index.css";// импорт главного файла стилей 
 import {initialCards} from './cards.js';

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
// const editprofileForm=document.forms.edit-profile; // находим форму edit-profile значение присваиваем переменной editprofileForm
// const newplaceForm=document.forms.new-place; // находим форму new-place и значение присваиваем  переменной newplaceForm
const Popup = document.querySelector(".popup");
const Popupedit = document.querySelector(".popup_type_edit");
const Popupnewcard = document.querySelector(".popup_type_new-card");
const editButtonopen = document.querySelector (".profile__edit-button");// находим кнопку, которая открываем попап, который редактирует профиль значение присваиваем переменной editButtonopen
const addButtonopen = document.querySelector (".profile__add-button");//находим кнопку, которая открываем попап, который добаляет новое место занчение присваиваем в переменную addButtonopen
const popupButtonclose= document.querySelector(".popup__close");// находим кнопку, которая закрывает попап, занчение присваиваем в переменную popupButtonclose 

editButtonopen.addEventListener('click', (evt) => { 
evt.preventDefault();
Popupedit.classList.add('popup_is-opened');
});
addButtonopen.addEventListener('click', (evt) => { 
  evt.preventDefault();
  Popupnewcard.classList.add('popup_is-opened');
  });

popupButtonclose.addEventListener('click',(evt)=>{
  evt.preventDefault();
  Popup.classList.remove('popup_is-opened');
});

// реализация закрытия попапа через нажатие на оверлей. прослушиватель навесили на сам попап,
// но непонятно почему работает.по моей логиге прослушиватель необходимо вешать на весь документ СПРОСИТь! 
Popup.addEventListener('click',(evt)=>{ 
  if(evt.target===evt.currentTarget){
    Popup.classList.remove('popup_is-opened');
  }
});
// реализация закрытия попапа через кнопку Esc
document.addEventListener('keydown',(evt)=>{
  if(evt.key ==='Escape'){
   Popup.classList.remove('popup_is-opened');
  }
});