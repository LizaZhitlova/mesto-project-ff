import "./index.css"; // импорт главного файла стилей
import { makeCard, likeCard,deleteCard } from "./components/card.js"; // импорт функций
import {
  openPopup,
  popupClose,
  openConfirmPopup,
} from "./components/modal.js"; //импорт функций
import {
  enableValidation,
  config,
  clearValidation,
} from "./components/validation.js";
import { createCardRequest, editProfileRequest,editProfileAvatarRequest } from "./components/api.js";

const editButtonOpen = document.querySelector(".profile__edit-button"); // находим кнопку, которая открываем попап, который редактирует профиль значение присваиваем переменной editButtonopen
const addButtOnopen = document.querySelector(".profile__add-button"); //находим кнопку, которая открываем попап, который добаляет новое место занчение присваиваем в переменную addButtonopen
const popupButtonClose = document.querySelectorAll(".popup__close"); // получаем коллекуию кнопок, которые закрывают попапы (крестик), коллекцию присваиваем переменной popupButtonClose
const popup = document.querySelectorAll(".popup");
//находим формы в DOM
const formEditProfile = document.querySelector('[name ="edit-profile"]');
const formNewPlace = document.querySelector('[name ="new-place"]');
const editAvatarOpen = document.querySelector(".profile__image");
const popupNewCard = document.querySelector(".popup_type_new-card"); // находим блок в котором лежит код папапа "Новое место" и присваиваем в переменную Popupnewcard
const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector( ".profile__description");
const popupEdit = document.querySelector(".popup_type_edit");
const newPlaceName = document.querySelector(".popup__input_type_card-name");
const newPlaceSrc = document.querySelector(".popup__input_type_url");
const cardList = document.querySelector(".places__list");
const imgElement = document.querySelector(".popup__image");
const imgCaption = document.querySelector(".popup__caption");
const imagePopup = document.querySelector(".popup_type_image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const formNewAvatar = popupEditAvatar.querySelector('[name ="edit-avatar"]');
export const popupConfirm = document.querySelector(".popup_type_confirm");
// Вывовд карточек  на страницу при загрузке

//forEach передаётся функция, которая вызывается на каждом элементе массива.
//в качестве агрумента функции присваивается текущий элемент массива - item.
// initialCards.forEach(function (item) {
//   // функция переданная в метод forEach вызывает функцию makeCard, которой переданы агрумены:
//   //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки
//   let appendCard = makeCard(item.name, item.link,deleteCard,openCardIMG,likeCard);
//   const cardList = document.querySelector(".places__list"); // список, в котором хранятся каточки, т.е в него записываются темплейты
//   cardList.append(appendCard);
// });

// функция вывода карточек с сервера

export function appendCarsAPI(usersCards) {
  usersCards.forEach(function (item) {
    // функция переданная в метод forEach вызывает функцию makeCard, которой переданы агрумены:
    //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки
    const appendCard = makeCard(item, openConfirmPopup, openCardIMG, likeCard);
    const cardList = document.querySelector(".places__list"); // список, в котором хранятся каточки, т.е в него записываются темплейты
    cardList.append(appendCard);
  });
}

// добавление новой карточки

// вешаем на форму обработчик событий, в колбеке которого вызывается функция добавления новой карточки
formNewPlace.addEventListener("submit", newCardSubmit);

//Открытие и закрытие попапов

// вешаем обработчик событий на кнопку редактировать профиль и в колбеке вызываем функцию OpenPopup
editButtonOpen.addEventListener("click", editProfile);

editAvatarOpen.addEventListener("click", openEditAvatarPopup);

// вешаем обработчик событий на кнопку "+" и в колбеке вызываем функцию OpenPopup
addButtOnopen.addEventListener("click", (evt) => {
  evt.preventDefault();
  formNewPlace.reset();
  clearValidation(formNewPlace, config);
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
formEditProfile.addEventListener("submit", formEditProfileSubmit);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formEditProfileSubmit(evt) {
  //находим поля формы в DOM
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей nameInput  и jobInput из свойства value
  const newNameValue = nameInput.value;
  const newJobValue = jobInput.value;
  const buttonElement = evt.target.querySelector(".popup__button");
  editProfileRequest(newNameValue, newJobValue, buttonElement)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      popupClose();//Закрытие форм при сабмите нужно производить в методе then цепочки промисов обработки ответа сервера, так как форма должна закрыться только после прихода успешного ответа от сервера и заполнения элементов страницы информацией 
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
      alert("Не удалось загрузить данные профиля");
    });
}

// функция редактирования профиля которая передаётся в колбек кнопки редактирования профиля
function editProfile(evt) {
  evt.preventDefault();
  // при открытии формы поля «Имя» и «О себе» должны быть заполнены теми значениями, которые отображаются на странице.
  // приравниваем значениям импутов имени и о себе текстовым значения со страницы
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, config);
  openPopup(popupEdit);
}
// функция добавленя новой карточки на страницу
function newCardSubmit(evt) {
  evt.preventDefault();
  //находим поля формы в ДОМ
  const cardForm = evt.target;
  //присваиваем им значения полей формы
  const newPlaceNameValue = newPlaceName.value;
  const newPlaceSrcValue = newPlaceSrc.value;
  const buttonElement = evt.target.querySelector(".popup__button");
  createCardRequest(newPlaceNameValue, newPlaceSrcValue, buttonElement)
    .then((cardData) => {
      // Создаем и добавляем карточку на страницу
      console.log("add card");
      console.log(cardData._id);
      const newCard = makeCard(cardData, openConfirmPopup, openCardIMG);
      cardList.prepend(newCard);
      // Закрываем попап и сбрасываем форму
      popupClose(popupNewCard);
      formNewPlace.reset();
      clearValidation(formNewPlace, config);
    })
    .catch((error) => {
      console.error("Ошибка при создании карточки:", error);
      alert(
        "Не удалось создать карточку. Проверьте URL изображения и попробуйте снова."
      );
    });
}
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
  imgElement.src = imgLink;
  imgElement.alt = imgName;
  imgCaption.textContent = imgName;
  openPopup(imagePopup);
}

// функция открытия попапа редактировать аватар
  function openEditAvatarPopup(evt) {
  if (!evt.target.classList.contains("profile__image")) {
    return;
  }
  popupEditAvatar
    .querySelector(".popup__button-edit-avatar")
    .addEventListener("click", editAvatarSubmit);
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
      editAvatarOpen.style.backgroundImage = `url('${profile.avatar}')`;
      popupClose(popupEditAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
      alert("Не удалось обновить аваьар профиля");
    });
}

// вывызваем функцию валидации полей
enableValidation(config);

popupConfirm.querySelector(".popup__button-confirm").addEventListener("click", deleteCard);
 