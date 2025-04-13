import "./index.css"; // импорт главного файла стилей
import { makeCard, likeCard, deleteCard } from "./components/card.js";
import { openPopup, popupClose, openConfirmPopup } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  createCardRequest,
  editProfileRequest,
  editProfileAvatarRequest,
  getMyInfo,
  getInitialCards,
  promiseAllRequest,
} from "./components/api.js";

export const config = {
  inputErrorClass: ".type_error",
  inputErrorSelector: "type_error",
  errorMassageClass: ".popup_input-error_active",
  errorMassageSelector: "popup_input-error_active",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  formSelector: ".popup__form",
  submitButtonErrorClass: "popup__button_inactive",
};

// находим элементы в DOM
const editButtonOpen = document.querySelector(".profile__edit-button");
const addButtOnopen = document.querySelector(".profile__add-button");
const popupButtonClose = document.querySelectorAll(".popup__close");
const popup = document.querySelectorAll(".popup");
const formEditProfile = document.querySelector('[name ="edit-profile"]');
const formNewPlace = document.querySelector('[name ="new-place"]');
const editAvatarOpen = document.querySelector(".profile__image");
const popupNewCard = document.querySelector(".popup_type_new-card");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
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
popupConfirm
  .querySelector(".popup__button-confirm")
  .addEventListener("click", deleteCard);

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
  const oginalButtonElement = buttonElement.textContent;
  buttonElement.textContent = "Сохранение...";
  editProfileRequest(newNameValue, newJobValue)
    .then((profile) => {
      profileTitle.textContent = profile.name;
      profileDescription.textContent = profile.about;
      popupClose(); //Закрытие форм при сабмите нужно производить в методе then цепочки промисов обработки ответа сервера, так как форма должна закрыться только после прихода успешного ответа от сервера и заполнения элементов страницы информацией
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
      alert("Не удалось загрузить данные профиля");
    })
    .finally(restoreButtonText(buttonElement, oginalButtonElement));
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
  //присваиваем им значения полей формы
  const newPlaceNameValue = newPlaceName.value;
  const newPlaceSrcValue = newPlaceSrc.value;
  const buttonElement = evt.target.querySelector(".popup__button");
  const oginalButtonElement = buttonElement.textContent;
  buttonElement.textContent = "Сохранение...";
  createCardRequest(newPlaceNameValue, newPlaceSrcValue)
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
    })
    .finally(restoreButtonText(buttonElement, oginalButtonElement));
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
  const oginalButtonElement = buttonElement.textContent;
  buttonElement.textContent = "Сохранение...";
  editProfileAvatarRequest(newAvatarValue)
    .then((profile) => {
      editAvatarOpen.style.backgroundImage = `url('${profile.avatar}')`;
      popupClose(popupEditAvatar);
    })
    .catch((error) => {
      console.error("Ошибка при загрузке данных:", error);
      alert("Не удалось обновить аваьар профиля");
    })
    .finally(restoreButtonText(buttonElement, oginalButtonElement));
}

// вывызваем функцию валидации полей
enableValidation(config);

// возврат исходного текста кнопки сабмита

function restoreButtonText(buttonElement, oginalButtonElement) {
  setTimeout(() => {
    buttonElement.textContent = oginalButtonElement;
  }, 1000);
}
// вызов Promise.all
Promise.all([getMyInfo(), getInitialCards()])
  .then(promiseAllRequest)
  .catch((err) => {
    console.error("Ошибка при инициализации:", err);
  });
