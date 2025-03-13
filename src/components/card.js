
// в файл card.js помещаем функции отвещающие за создание карточек 
 import {PopupClose} from "./modal.js";
 import {OpenPopup} from "./modal.js";
//в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.
// content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.
let cardTemplate = document.querySelector("#card-template").content;

//initCard - это функция предназначенная для создания карточки
// переменные
// a - заголовок картинки, строка string
// b - ссылка картинки,string
// с - функция колбек для удаления карточки со страницы
// возвращаемое значение:
//  шаблон элемента списка

export function initCard(arrayEl, arrayIt) {
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
      .addEventListener("click", deleteCard);
  
    // возвращаем перменную содержащую шаблон элемента списка
  
    cardElement
    .querySelector(".card__image")
    .addEventListener("click", OpenCardIMG);
    
    cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", likeCard);
  
  
    return cardElement;
  };

//Функция удаления карточки

function deleteCard(event) {
  const eventElement = event.target;
  const listItem = eventElement.closest(".places__item");
  listItem.remove();
};

// функция лайка 

function likeCard (evt) {
    if (!evt.target.classList.contains('card__like-button')) {
   return;
  };
  evt.target.classList.toggle('card__like-button_is-active');
  console.log(evt.target);
  };

  // функция добавленя новой карточки на страницу 

export function newCardSubmit (evt) {
    evt.preventDefault();
    let newPlaceName = document.querySelector (".popup__input_type_card-name");
    let newPlaceSrc = document.querySelector (".popup__input_type_url");
    let newPlaceNameValue = newPlaceName.value;
    let newPlaceSrcValue = newPlaceSrc.value;
    let cardList = document.querySelector(".places__list");
    const formNewPlace = document.querySelector('[name ="new-place"]');
    let appendCard = initCard(newPlaceNameValue,newPlaceSrcValue);
    cardList.prepend(appendCard);
    PopupClose();
    formNewPlace.reset();
    };

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
    let ImagePopup = document.querySelector(".popup_type_image");
    OpenPopup(ImagePopup);
  };
