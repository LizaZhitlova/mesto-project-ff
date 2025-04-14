// файл для запросов на сервер

import { appendCarsAPI } from "../index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "cc15c7c0-115a-417c-9697-eca1b1849815",
    "Content-Type": "application/json",
  },
};
 
  // let myId;
  export let myId;

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// загрузка данный о пользователе
export function getMyInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

// загрузка начальных карточек  с сервера
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getMyId = () => {
  return myId;
};

export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const createCardRequest = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link, // URL, который ввел пользователь
    }),
  }).then(handleResponse);
};

export const likeButtonRequest = (cardId, isSelected) => {
  const command = isSelected ? "PUT" : "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: command,
    headers: config.headers,
  }).then(handleResponse);
};

// Редактирование профиля - сохранение обновлённых данных на сервере

export const editProfileRequest = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(handleResponse);
};

export const editProfileAvatarRequest = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then(handleResponse);
};

//TODO  Не могу перенести этот запрос в index.js , 
//так как опять не понимаю как мы получаем myId, проблема именно в этом, уже сто раз проверила
// пробовала делать вызов  getMyId () внутри запроса, всё равно не получается 
export const promiseAllRequest = ([userData, cards]) => {
  console.log("Пользователь:", userData);
  console.log("Карточки:", cards);

  // Обновляем профиль
  document.querySelector(".profile__title").textContent = userData.name;
  document.querySelector(".profile__description").textContent = userData.about;
  document.querySelector(
    ".profile__image"
  ).style.backgroundImage = `url('${userData.avatar}')`;
  myId = userData._id;
  appendCarsAPI(cards);
};
