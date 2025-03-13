import "./index.css"; // импорт главного файла стилей
import { initialCards } from "./components/cards.js";
import {initCard,newCardSubmit} from "./components/card.js";
import {OpenPopup,PopupClose,handleFormSubmit}from "./components/modal.js"

// @todo: Темплейт карточки

//в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.
// content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.

// const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const cardList = document.querySelector(".places__list"); // список, в котором хранятся каточки, т.е в него записываются темплейты

// @todo: Функция создания карточки

// //initCard - это функция предназначенная для создания карточки
// // переменные
// // a - заголовок картинки, строка string
// // b - ссылка картинки,string
// // с - функция колбек для удаления карточки со страницы
// // возвращаемое значение:
// //  шаблон элемента списка

// function initCard(arrayEl, arrayIt, delFunction,openFunction,likeFunction) {
//   // ищем элемент с классом .places__item, клонируем элемент вместе с его содержимым,
//   // присваимаем склонированный элемент вмсете с его содержимым в переменную cardElement

//   const cardElement = cardTemplate
//     .querySelector(".places__item")
//     .cloneNode(true);

//   //ищем элемент с классом .card__title, присваиваем приваиваем совйству элемента textContent значение аргумента arrayEl

//   cardElement.querySelector(".card__title").textContent = arrayEl;
//   const imgEl = cardElement.querySelector(".card__image");
//   imgEl.src = arrayIt;
//   imgEl.alt = arrayEl;

//   // ищем элемент с классом .card__delete-button, addEventListener - устанвливает метод с для найденного элемента при событии click

//   cardElement
//     .querySelector(".card__delete-button")
//     .addEventListener("click", delFunction);

//   // возвращаем перменную содержащую шаблон элемента списка

//   cardElement
//   .querySelector(".card__image")
//   .addEventListener("click", openFunction);
  
//   cardElement
//     .querySelector(".card__like-button")
//     .addEventListener("click", likeFunction);


//   return cardElement;
// };

// // @todo: Функция удаления карточки

// function deleteCard(event) {
//   const eventElement = event.target;
//   const listItem = eventElement.closest(".places__item");
//   listItem.remove();
// };

// Вывовд карточек  на страницу при загрузке

//forEach передаётся функция, которая вызывается на каждом элементе массива.
//в качестве агрумента функции присваивается текущий элемент массива - item.

initialCards.forEach(function (item) {
  // функция переданная в метод forEach вызывает функцию initCard, которой переданы агрумены:
  //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки

  let appendCard = initCard(item.name, item.link);
  cardList.append(appendCard);
});

// реализовываем всплывающие окна

const Popupedit = document.querySelector(".popup_type_edit"); // находим блок в котором лежит код попапа "Редактировать профиль" и присваиваем значение в переменную Popupedit
const Popupnewcard = document.querySelector(".popup_type_new-card"); // находим блок в котором лежит код папапа "Новое место" и присваиваем в переменную Popupnewcard
const editButtonopen = document.querySelector(".profile__edit-button"); // находим кнопку, которая открываем попап, который редактирует профиль значение присваиваем переменной editButtonopen
const addButtonopen = document.querySelector(".profile__add-button"); //находим кнопку, которая открываем попап, который добаляет новое место занчение присваиваем в переменную addButtonopen
const ImagePopup = document.querySelector(".popup_type_image"); // находим блок в котором лежит код попапа для картинкии значение присваиваем в переменную ImagePopup
const popupButtonclose = document.querySelectorAll(".popup__close"); // получаем коллекуию кнопок, которые закрывают попапы (крестик), коллекцию присваиваем переменной popupButtonclose
// let CurrentOpenedPopup = null; // создаём переменную CurrentOpenedPopup, данная переменная будет хранить текущий открытй попап.
Popupedit.classList.add("popup_is-animated");
Popupnewcard.classList.add("popup_is-animated");
ImagePopup.classList.add("popup_is-animated");
// методом  forEach перебираем коллекцию кнопок, лежащую в popupButtonclose для кажой добавлеям прослушиватель событий, в колбэк прослушивателя записываемфункцию PopupClose
popupButtonclose.forEach(function (popupElement) {
  popupElement.addEventListener("click", PopupClose);
});

// // функция закрытия попапа, которая записывается в колбэк прослушивателя событий- с текущего открытого попапа снимаем класс .popup_is-opened
// function PopupClose() {
//   CurrentOpenedPopup.classList.remove("popup_is-opened",);
//   CurrentOpenedPopup.removeEventListener("click", closePopupbyOverlay);
//   CurrentOpenedPopup = null;
// };

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup

// TODO !!! вынести в отдельную функцию логику обработчика 
editButtonopen.addEventListener("click", (evt) => {
  evt.preventDefault();
  // при открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
  const profileTitle = document.querySelector(".profile__title"); // находим эелемнт в котором хранится имя
  const profileDescription = document.querySelector(".profile__description"); //находим эелемнт в котором хранится О себе
  const nameInput = document.querySelector(".popup__input_type_name"); // находим импут для имени
  const jobInput = document.querySelector(".popup__input_type_description"); // находим импут для формы
  // приравниваем значениям импутов имени и о себе текстовым значения со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  OpenPopup(Popupedit);
});

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup
addButtonopen.addEventListener("click", (evt) => {
  evt.preventDefault();

  OpenPopup(Popupnewcard);
});

// // функция открытия попапа

// function OpenPopup(popupElement) {
//   // popupElement.classList.add("popup_is-animated");
//   popupElement.classList.add("popup_is-opened");
//   CurrentOpenedPopup = popupElement;
//   CurrentOpenedPopup.addEventListener("click", closePopupbyOverlay); // при открытии попапа вешаем на текущий открытый попап прослушиватель событий, в колбэк
//   // прослушивателя передаём функцию, которая закрывает попапа по нажанию на оверлей.
//   //СПОСИТЬ Почему при нажатии на сам попапа оне не закрывается?
// };

// реализация закрытия попапа через кнопку Esc
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    PopupClose();
  }
});

// // функция closePopupbyOverlay передаётся в прослуживатель событий, который навешиается на текущий открытый попап (CurrentOpenedPopup)
// function closePopupbyOverlay(evt) {
//   if (evt.currentTarget === evt.target) {
//     PopupClose();
//   }
// };

// реализовывем открытие поапа по нажатию на картинку

// вещаем прослушиватель событый на список с карточками (здесь работает высплытие, список карточек является родительким для элементов списка, в котором хранятся карточки)
// в колбэк прослушивателя записываем функцию OpenCardIM.
// cardList.addEventListener("click", OpenCardIMG);

// // в функции OpenCardIMG делаем проверку если элемент по на котором произошло событие не сожержит класс .card__image - прекрашаем функцию
// // в переменную currentimg присваиваем значение элемента, на котором произошло событие
// // впеременных imglink и imgname получаем значения src и alt переменной currentim
// // ищем в документе элемент кртинки и присываиваем значение в переменную IMG
// // свойствам src и alt переменной IMG (т.е. нашей картинке ) присваиваем знаяения полученные в переменных imglink и imgname
// //ищем в документе элемент параграфа(т.е. названия картинки) и присываиваем значение в переменную IMGCaption
// // свойству .textContent переменной IMGCaption присваиваем значение полученное в imglink
// function OpenCardIMG(evt) {
//   if (!evt.target.classList.contains("card__image")) {
//     return;
//   }
//   let currentimg = evt.target;
//   let imglink = currentimg.src;
//   let imgname = currentimg.alt;
//   const IMG = document.querySelector(".popup__image");
//   IMG.src = imglink;
//   IMG.alt = imgname;
//   const IMGCaption = document.querySelector(".popup__caption");
//   IMGCaption.textContent = imgname;
//   OpenPopup(ImagePopup);
// };

// реализовываем редактирование информации "о себе " в попапе

// Находим форму в DOM
const formElement = document.querySelector('[name ="edit-profile"]'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
// const newNameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
// const newJobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

// // Обработчик «отправки» формы, хотя пока
// // она никуда отправляться не будет
// function handleFormSubmit(evt) {
//   evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

//   // Получите значение полей newNameInput  и newJobInput из свойства value
//   const newNameValue = newNameInput.value;
//   const newJobValue = newJobInput.value;
//   // Выберите элементы, куда должны быть вставлены значения полей. выбирвем элементы зголовка и параграфа на странице
//   const newprofileTitle = document.querySelector(".profile__title");
//   const newprofileDescription = document.querySelector(".profile__description");
//   // Вставьте новые значения с помощью textContent
//   newprofileTitle.textContent = newNameValue;
//   newprofileDescription.textContent = newJobValue;
//   PopupClose();
//   CurrentOpenedPopup = null; // обнуляем переменную CurrentOpenedPopup, чтобы после закрытия формы в ней ничего не хранилось
// };

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);


// // функция лайка 

//  function likeCard (evt) {
//   if (!evt.target.classList.contains('card__like-button')) {
//  return;
// };
// evt.target.classList.toggle('card__like-button_is-active');
// console.log(evt.target);
// };

// добавление карточки 
 
// находим форму в ДОМ 
const formNewPlace = document.querySelector('[name ="new-place"]');
// Находим поля формы в DOM
// const newPlaceName = document.querySelector (".popup__input_type_card-name");
// const newPlaceSrc = document.querySelector (".popup__input_type_url");

formNewPlace.addEventListener("submit", newCardSubmit);

// // функция добавленя новой карточки на страницу 

// function newCardSubmit (evt) {
// evt.preventDefault();
// const newPlaceNameValue = newPlaceName.value;
// const newPlaceSrcValue = newPlaceSrc.value;

// let appendCard = initCard(newPlaceNameValue,newPlaceSrcValue,deleteCard,OpenCardIMG,likeCard);
// cardList.prepend(appendCard);
// PopupClose();
// formNewPlace.reset();
// };