// makeCard - это функция предназначенная для создания карточки
// переменные
// a - заголовок картинки, строка string
// b - ссылка картинки,string
// с - функция колбек для удаления карточки со страницы
// возвращаемое значение:
//  шаблон элемента списка

export function makeCard(
  name,
  link,
  functionDeleteCard,
  functionOpenCardImg,
  functionLikeCard
) {
  //в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.
  // content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.
  let cardTemplate = document.querySelector("#card-template").content;
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

  // ищем элемент с классом .card__delete-button, addEventListener - устанвливает метод с для найденного элемента при событии click

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", functionDeleteCard);

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

export function deleteCard(event) {
  const eventElement = event.target;
  const listItem = eventElement.closest(".places__item");
  listItem.remove();
}

// функция лайка

export function likeCard(evt) {
  if (!evt.target.classList.contains("card__like-button")) {
    return;
  }
  evt.target.classList.toggle("card__like-button_is-active");
  console.log(evt.target);
}
