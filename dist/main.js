/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("//  import \"../pages/index.css\";// импорт главного файла стилей \n\n// @todo: Темплейт карточки\n\n//в переменную cardTemplate присваивается содержимое элемента с идентификатором. querySelector - ищет элемент с идентификатором.\n// content - если найденный элемент это шаблон, то его содержимое доступно через это свойство content.\n\nvar cardTemplate = document.querySelector(\"#card-template\").content;\n\n// @todo: DOM узлы\n\nvar cardList = document.querySelector(\".places__list\");\n\n// @todo: Функция создания карточки\n\n//initCard - это функция предназначенная для создания карточки\n// переменные\n// a - заголовок картинки, строка string\n// b - ссылка картинки,string\n// с - функция колбек для удаления карточки со страницы\n// возвращаемое значение:\n//  шаблон элемента списка\n\nfunction initCard(arrayEl, arrayIt, delFunction) {\n  // ищем элемент с классом .places__item, клонируем элемент вместе с его содержимым,\n  // присваимаем склонированный элемент вмсете с его содержимым в переменную cardElement\n\n  var cardElement = cardTemplate.querySelector(\".places__item\").cloneNode(true);\n\n  //ищем элемент с классом .card__title, присваиваем приваиваем совйству элемента textContent значение аргумента arrayEl\n\n  cardElement.querySelector(\".card__title\").textContent = arrayEl;\n  var imgEl = cardElement.querySelector(\".card__image\");\n  imgEl.src = arrayIt;\n  imgEl.alt = arrayEl;\n\n  // ищем элемент с классом .card__delete-button, addEventListener - устанвливает метод с для найденного элемента при событии click\n\n  cardElement.querySelector(\".card__delete-button\").addEventListener(\"click\", delFunction);\n\n  // возвращаем перменную содержащую шаблон элемента списка\n\n  return cardElement;\n}\n\n// @todo: Функция удаления карточки\n\nfunction deleteCard(event) {\n  var eventElement = event.target;\n  var listItem = eventElement.closest(\".places__item\");\n  listItem.remove();\n}\n\n// @todo: Вывести карточки на страницу\n\n//forEach передаётся функция, которая вызывается на каждом элементе массива.\n//в качестве агрумента функции присваивается текущий элемент массива - item.\n\ninitialCards.forEach(function (item) {\n  // функция переданная в метод forEach вызывает функцию initCard, которой переданы агрумены:\n  //item.name - элемент массива со сзначением name,item.link - элемент массива со значением link, функция deleteCard- выполняющая удаление карточки\n\n  var appendCard = initCard(item.name, item.link, deleteCard);\n  cardList.append(appendCard);\n});\n\n//# sourceURL=webpack://mesto-project-ff/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;