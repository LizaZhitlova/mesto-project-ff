// makeCard - это функция предназначенная для создания карточки
// переменные
// a - заголовок картинки, строка string
// b - ссылка картинки,string
// с - функция колбек для удаления карточки со страницы
// возвращаемое значение:
//  шаблон элемента списка

import {getMyId} from "./api.js";
import {openPopup,popupClose} from "./modal.js";

export function makeCard(
  name,
  link,
  likes,
  ownerId,
  cardId,
  functionConfirmPopup,
  functionOpenCardImg,
  functionLikeCard,
) {
  const myId= getMyId();
  //в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.
  // content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.
  const cardTemplate = document.querySelector("#card-template").content;
  // ищем элемент с классом .places__item, клонируем элемент вместе с его содержимым,
  // присваимаем склонированный элемент вмсете с его содержимым в переменную cardElement

  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  //ищем элемент с классом .card__title, присваиваем приваиваем совйству элемента textContent значение аргумента name

  cardElement.querySelector(".card__title").textContent = name;
  const imgElement = cardElement.querySelector(".card__image");
  imgElement.src = link;
  imgElement.alt = name;
  imgElement.id = cardId;
 

  // делаем проверку если мой ID не совпадает ID владельца карточки - удаляем кнопку удаленя с карточки 
  if(!(myId===ownerId)){
    cardElement.querySelector(".card__delete-button").classList.add("card__delete-button-hidden");
    }
  
    // работа с лайками 
    const likesCounter = cardElement.querySelector(".card__likes-number");
    // Устанавливаем начальное количество лайков
    likesCounter.textContent = likes.length;
   

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
    .addEventListener("click", functionLikeCard);

  return cardElement;
}

//Функция удаления карточки

export function deleteCard(cardId,cardElement) {

  fetch(`https://nomoreparties.co/v1/wff-cohort-35/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'cc15c7c0-115a-417c-9697-eca1b1849815'
    }
  })
  .then((res)=>{
    if (res.ok) {
      return res.json();
  }else{
    let i =10;
  }
})

 .then(()=>{
  cardElement.remove();
  const popupConfirm = document.querySelector(".popup_type_confirm")
  popupClose(popupConfirm);
})
  .catch((error) => {
    console.error("Ну удалось удалить карточку:", error);
})
}
// функция лайка

export function likeCard(evt) {
  if (!evt.target.classList.contains("card__like-button")) {
    return;
  }
  evt.target.classList.toggle("card__like-button_is-active");
  console.log(evt.target);
}


export function likeCounter(cardData){
    const likeCounter = document.querySelector(".card__likes-number");
    likeCounter.textContent=cardData.likes.length;
}

export function openConfirmPopup(evt){
  if (!evt.target.classList.contains("card__delete-button")) {
    return;
  }
  const cardElement = evt.target.closest('.places__item');
    
  // Получаем элемент изображения внутри этой карточки
  const imgElement = cardElement.querySelector('.card__image');
  // Получаем ID изображения
  const imageId = imgElement.id;
  const card = document.querySelector(".card");
  
 const popupConfirm = document.querySelector(".popup_type_confirm");
 popupConfirm.querySelector(".popup__button-confirm").addEventListener("click",(evt)=>{
deleteCard(imageId,card);
 });
  openPopup(popupConfirm);
}

