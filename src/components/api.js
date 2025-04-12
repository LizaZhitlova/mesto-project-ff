// файл для запросов на сервер

import { appendCarsAPI } from "../index.js";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-35",
  headers: {
    authorization: "cc15c7c0-115a-417c-9697-eca1b1849815",
    "Content-Type": "application/json",
  },
};
let myId;

// загрузка данный о пользователе
function getMyInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
}

// загрузка начальных карточек  с сервера
const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
};

function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getMyId = () => {
  return myId;
};

export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
};

export const createCardRequest = (name, link, buttonElement) => {
  const oginalButtonElement = buttonElement.textContent;
  buttonElement.textContent = "Сохранение...";
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link, // URL, который ввел пользователь
    }),
  })
    .then(handleResponse)
    .finally(() => {
      setTimeout(() => {
        buttonElement.textContent = oginalButtonElement;
      }, 1000);
    });
};

export const likeButtonRequest = (cardId, isSelected) => {
  const command = isSelected ? "PUT" : "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: command,
    headers: config.headers,
  }).then(handleResponse);
};

// Редактирование профиля - сохранение обновлённых данных на сервере

export const editProfileRequest = (name, job, buttonElement) => {
  const oginalButtonElement = buttonElement.textContent;
  buttonElement.textContent = "Сохранение...";
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  })
    .then(handleResponse)
    .finally(() => {
      setTimeout(() => {
        buttonElement.textContent = oginalButtonElement;
      }, 1000);
    });
};

export const editProfileAvatarRequest = (avatar, buttonElement) => {
  const oginalButtonElement = buttonElement.textContent;
  buttonElement.textContent = "Сохранение...";
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  })
    .then(handleResponse)
    .finally(() => {
      setTimeout(() => {
        buttonElement.textContent = oginalButtonElement;
      }, 1000);
    });
};
// для загрузки каптикок с сервера нам необходимо запустить несколько промисов параллельно и получить и дождаться их выполнения
// Promise.All принимаеи объект промисов
Promise.all([getMyInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    console.log("Пользователь:", userData);
    console.log("Карточки:", cards);

    // Обновляем профиль
    document.querySelector(".profile__title").textContent = userData.name;
    document.querySelector(".profile__description").textContent =
      userData.about;
    document.querySelector(
      ".profile__image"
    ).style.backgroundImage = `url('${userData.avatar}')`;
    myId = userData._id;
    appendCarsAPI(cards);
  })
  .catch((err) => {
    console.error("Ошибка при инициализации:", err);
  });
