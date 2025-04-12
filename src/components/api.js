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

//#region Functions
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

//#endregion

export const getMyId = () => {
  return myId;
};

export const deleteCardRequest = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(handleResponse);
}

export const createCardRequest = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link, // URL, который ввел пользователь
    }),
  }).then(handleResponse);
}

export const likeButtonRequest = (cardId, isSelected) => {
  const command = isSelected ? "PUT" : "DELETE";
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: command,
    headers: config.headers,
  }).then(handleResponse);
}

//#region Init
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

// Редактирование профиля - сохранение обновлённых данных на сервере
// TODO отправлять данные из формы
fetch("https://nomoreparties.co/v1/wff-cohort-35/users/me", {
  method: "PATCH",
  headers: {
    authorization: "cc15c7c0-115a-417c-9697-eca1b1849815",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Liza Zhitlova",
    about: "Logist, foreign trade specialist",
  }),
})
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Ошибка при загрузке данных:", error);
    alert("Не удалось загрузить данные профиля");
  });
//#endregion
