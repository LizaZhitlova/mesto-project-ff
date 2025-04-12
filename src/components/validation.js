// в данном файле описана логика валидации форм

//объект настроек
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
// функции валидации

//Эта функция должна принимать как параметры DOM-элемент формы, для которой очищаются ошибки валидации и объект с настройками валидации. Используйте функцию clearValidation при заполнении формы профиля во время её открытия и при очистке формы добавления карточки.
export function clearValidation(formElement, validationConfig) {
  const errorElements = formElement.querySelectorAll(
    validationConfig.errorMassageClass
  );
  errorElements.forEach(function (errorElement) {
    errorElement.classList.remove(validationConfig.errorMassageSelector);
    errorElement.textContent = "";
  });
  const inputElements = formElement.querySelectorAll(
    validationConfig.inputErrorClass
  );
  inputElements.forEach(function (inputElement) {
    inputElement.classList.remove(validationConfig.inputErrorSelector);
  });

  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );
  submitButton.disabled = true;
  submitButton.classList.add(validationConfig.submitButtonErrorClass);
}

// показывает элемент ошибки, подсвечивает поле с ошибкой
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorMassageSelector);
}
//скрывает элемент ошибки
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorSelector);
  errorElement.classList.remove(config.errorMassageSelector);
  errorElement.textContent = "";
}
//проверяет валидность поля, внутри вызывает showInputError или hideInputError.
function isValid(formElement, inputElement) {
  // проверяем связана ли ошибка с регулярным выражением чререз втроенное свойство patternMismatch
  if (inputElement.validity.patternMismatch) {
    // данные атрибута доступны у элемента инпута через ключевое слово dataset.
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
}

//gусть слушатель событий добавится всем полям ввода внутри формы. Для этого создадим функцию setEventListeners,
// которая примет параметром элемент формы и добавит её полям нужные обработчики:
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  // находим кнопку в текущей форме
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  //   // вызываем toggleButtonState до начала ввода данных, чтоы бы конпка была не активной при открытии пустой формы
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// необходимо найти все формы на странице и добавить им слушателеи собыйтий для этого создаём функцию enableValidation
export const enableValidation = (validationConfig) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};

// настраиваем кнопку

// создадим функцию hasInvalidInput, которая принимает массив inputov перебирает каждый его элемент  и возвращать false , если все input валидные и true, если хотя бы один не валидный.

function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
}
// для изменения сатуса кнопки напишем функцию toggleButtonState, которая отключает и включает кнопку. Фнкция принимает на фход массив импутов и элемент кнопки
const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(config.submitButtonErrorClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.submitButtonErrorClass);
  }
};
