import "./index.css"; // импорт главного файла стилей
import {initialCards} from "./components/cards.js"; // импорт массива со ссылками на картинки
import {makeCard,deleteCard,likeCard} from "./components/card.js"; // импорт функций
import {openPopup,popupClose} from "./components/modal.js"; //импорт функций

const editButtonOpen = document.querySelector(".profile__edit-button"); // находим кнопку, которая открываем попап, который редактирует профиль значение присваиваем переменной editButtonopen
const addButtOnopen = document.querySelector(".profile__add-button"); //находим кнопку, которая открываем попап, который добаляет новое место занчение присваиваем в переменную addButtonopen
const popupButtonClose = document.querySelectorAll(".popup__close"); // получаем коллекуию кнопок, которые закрывают попапы (крестик), коллекцию присваиваем переменной popupButtonClose
const popup = document.querySelectorAll(".popup");
//находим формы в DOM
const formEditProfile = document.querySelector('[name ="edit-profile"]');
const formNewPlace = document.querySelector('[name ="new-place"]');

// Вывовд карточек  на страницу при загрузке

//forEach передаётся функция, которая вызывается на каждом элементе массива.
//в качестве агрумента функции присваивается текущий элемент массива - item.
initialCards.forEach(function (item) {
  // функция переданная в метод forEach вызывает функцию makeCard, которой переданы агрумены:
  //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки
  let appendCard = makeCard(item.name, item.link,deleteCard,openCardIMG,likeCard);
  const cardList = document.querySelector(".places__list"); // список, в котором хранятся каточки, т.е в него записываются темплейты
  cardList.append(appendCard);
});

// добавление новой карточки

// вешаем на форму обработчик событий, в колбеке которого вызывается функция добавления новой карточки
formNewPlace.addEventListener("submit", newCardSubmit);

//Открытие и закрытие попапов

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup
editButtonOpen.addEventListener("click", editProfile);

// вешаем обработчик событий на кнопку "+" и в колбеке вызываем функцию OpenPopup
addButtOnopen.addEventListener("click", (evt) => {
  evt.preventDefault();
  const popupNewCard = document.querySelector(".popup_type_new-card"); // находим блок в котором лежит код папапа "Новое место" и присваиваем в переменную Popupnewcard
  openPopup(popupNewCard);
});

// методом  forEach перебираем коллекцию кнопок, лежащую в popupButtonClose для кажой добавлеям прослушиватель событий, в колбэк прослушивателя записываемфункцию PopupClose
popupButtonClose.forEach(function (popupElement) {
  popupElement.addEventListener("click", popupClose);
});

//плавное открытие попапа
// методом  forEach перебираем коллекцию кнопок, лежащую в popup для кажой добавлеям класс .popup_is-animated
popup.forEach(function (popupElement) {
  popupElement.classList.add("popup_is-animated");
});

// реализовываем редактирование информации "о себе " в попапе

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEditProfile.addEventListener("submit", handleFormSubmit);



// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
 function handleFormSubmit(evt) {
  //находим поля формы в DOM
const newNameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const newJobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Получите значение полей newNameInput  и newJobInput из свойства value
  const newNameValue = newNameInput.value;
  const newJobValue = newJobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей. выбирвем элементы зголовка и параграфа на странице
  const newprofileTitle = document.querySelector(".profile__title");
  const newprofileDescription = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  newprofileTitle.textContent = newNameValue;
  newprofileDescription.textContent = newJobValue;
  popupClose();
};

// функция редактирования профиля которая передаётся в колбек кнопки редактирования профиля
  function editProfile (evt){
  evt.preventDefault();
  // при открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
  const profileTitle = document.querySelector(".profile__title"); // находим эелемнт в котором хранится имя
  const profileDescription = document.querySelector(".profile__description"); //находим эелемнт в котором хранится О себе
  const nameInput = document.querySelector(".popup__input_type_name"); // находим импут для имени
  const jobInput = document.querySelector(".popup__input_type_description"); // находим импут для формы
  // приравниваем значениям импутов имени и о себе текстовым значения со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  const popupEdit = document.querySelector(".popup_type_edit");
  openPopup(popupEdit);
};

  // функция добавленя новой карточки на страницу 

   function newCardSubmit (evt) {
    evt.preventDefault();
    //находим поля формы в ДОМ
    const newPlaceName = document.querySelector (".popup__input_type_card-name");
    const newPlaceSrc = document.querySelector (".popup__input_type_url");
    //присваиваем им значения полей формы
    const newPlaceNameValue = newPlaceName.value;
    const newPlaceSrcValue = newPlaceSrc.value;
    const cardList = document.querySelector(".places__list");//находим список где хранятся темплейты карточек
    const formNewPlace = document.querySelector('[name ="new-place"]');// находим форму, для применеия на мей метода сброса 
    const newCard = makeCard(newPlaceNameValue,newPlaceSrcValue,deleteCard,openCardIMG,likeCard);
    cardList.prepend(newCard);
    popupClose();
    formNewPlace.reset();
    };  

// в функции OpenCardIMG делаем проверку если элемент по на котором произошло событие не сожержит класс .card__image - прекрашаем функцию
// в переменную currentimg присваиваем значение элемента, на котором произошло событие
// впеременных imglink и imgname получаем значения src и alt переменной currentim
// ищем в документе элемент кртинки и присываиваем значение в переменную IMG
// свойствам src и alt переменной IMG (т.е. нашей картинке ) присваиваем знаяения полученные в переменных imglink и imgname
//ищем в документе элемент параграфа(т.е. названия картинки) и присываиваем значение в переменную IMGCaption
// свойству .textContent переменной IMGCaption присваиваем значение полученное в imglink
 function openCardIMG(evt) {
    if (!evt.target.classList.contains("card__image")) {
      return;
    }
    const currentImg = evt.target;
    const imgLink = currentImg.src;
    const imgName = currentImg.alt;
    const imgElement = document.querySelector(".popup__image");
    imgElement.src = imgLink;
    imgElement.alt = imgName;
    const imgCaption = document.querySelector(".popup__caption");
    imgCaption.textContent = imgName;
    const imagePopup = document.querySelector(".popup_type_image");
    openPopup(imagePopup);
  };
