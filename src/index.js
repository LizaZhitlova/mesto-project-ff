import "./index.css"; // импорт главного файла стилей
import {initialCards} from "./components/cards.js"; // импорт массива со ссылками на картинки
import {initCard, newCardSubmit} from "./components/card.js"; // импорт функций
import {OpenPopup,PopupClose,handleFormSubmit,editProfile} from "./components/modal.js"; //импорт функций

const editButtonopen = document.querySelector(".profile__edit-button"); // находим кнопку, которая открываем попап, который редактирует профиль значение присваиваем переменной editButtonopen
const addButtonopen = document.querySelector(".profile__add-button"); //находим кнопку, которая открываем попап, который добаляет новое место занчение присваиваем в переменную addButtonopen
const popupButtonclose = document.querySelectorAll(".popup__close"); // получаем коллекуию кнопок, которые закрывают попапы (крестик), коллекцию присваиваем переменной popupButtonclose
const popup = document.querySelectorAll(".popup");
//находим формы в DOM
const formElement = document.querySelector('[name ="edit-profile"]');
const formNewPlace = document.querySelector('[name ="new-place"]');

// Вывовд карточек  на страницу при загрузке

//forEach передаётся функция, которая вызывается на каждом элементе массива.
//в качестве агрумента функции присваивается текущий элемент массива - item.
initialCards.forEach(function (item) {
  // функция переданная в метод forEach вызывает функцию initCard, которой переданы агрумены:
  //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки
  let appendCard = initCard(item.name, item.link);
  const cardList = document.querySelector(".places__list"); // список, в котором хранятся каточки, т.е в него записываются темплейты
  cardList.append(appendCard);
});

// добавление новой карточки

// вешаем на форму обработчик событий, в колбеке которого вызывается функция добавления новой карточки
formNewPlace.addEventListener("submit", newCardSubmit);

//Открытие и закрытие попапов

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup
editButtonopen.addEventListener("click", editProfile);

// вешаем обработчик событий на кнопку "+" и в колбеке вызываем функцию OpenPopup
addButtonopen.addEventListener("click", (evt) => {
  evt.preventDefault();
  const Popupnewcard = document.querySelector(".popup_type_new-card"); // находим блок в котором лежит код папапа "Новое место" и присваиваем в переменную Popupnewcard
  OpenPopup(Popupnewcard);
});

// методом  forEach перебираем коллекцию кнопок, лежащую в popupButtonclose для кажой добавлеям прослушиватель событий, в колбэк прослушивателя записываемфункцию PopupClose
popupButtonclose.forEach(function (popupElement) {
  popupElement.addEventListener("click", PopupClose);
});

// реализация закрытия попапа через кнопку Esc
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    PopupClose();
  }
});

//плавное открытие попапа
// методом  forEach перебираем коллекцию кнопок, лежащую в popup для кажой добавлеям класс .popup_is-animated
popup.forEach(function (popupElement) {
  popupElement.classList.add("popup_is-animated");
});

// реализовываем редактирование информации "о себе " в попапе

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
