// в данном файле описана логика валидации форм


// функции валидации

// Вынесение дублирующегося кода в функции
function getErrorElement(formElement, inputElement) {
  return formElement.querySelector(`.${inputElement.id}-error`);
}

function toggleErrorClass(element, className, isAdd) {
  if (isAdd) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

function setErrorContent(errorElement, message) {
  errorElement.textContent = message;
}

function setInputValidity(inputElement, message = "") {
  inputElement.setCustomValidity(message);
}

// Функции валидации
export function clearValidation(formElement, config) {
  const errorElements = formElement.querySelectorAll(config.errorMassageClass);
  errorElements.forEach((errorElement) => {
    toggleErrorClass(errorElement, config.errorMassageSelector, false);
    setErrorContent(errorElement, "");
  });

  const inputElements = formElement.querySelectorAll(config.inputErrorClass);
  inputElements.forEach((inputElement) => {
    toggleErrorClass(inputElement, config.inputErrorSelector, false);
    setInputValidity(inputElement);
  });

  const submitButton = formElement.querySelector(config.submitButtonSelector);
  toggleSubmitButton(submitButton, config, true);
}

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = getErrorElement(formElement, inputElement);
  toggleErrorClass(inputElement, config.inputErrorSelector, true);
  setErrorContent(errorElement, errorMessage);
  toggleErrorClass(errorElement, config.errorMassageSelector, true);
}

function hideInputError(formElement, inputElement, config) {
  const errorElement = getErrorElement(formElement, inputElement);
  toggleErrorClass(inputElement, config.inputErrorSelector, false);
  toggleErrorClass(errorElement, config.errorMassageSelector, false);
  setErrorContent(errorElement, "");
  setInputValidity(inputElement);
}

function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    setInputValidity(inputElement, inputElement.dataset.errorMessage);
  } else {
    setInputValidity(inputElement);
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Функции для работы с кнопкой
function toggleSubmitButton(buttonElement, config, isDisabled) {
  buttonElement.disabled = isDisabled;
  toggleErrorClass(buttonElement, config.submitButtonErrorClass, isDisabled);
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  const hasInvalid = hasInvalidInput(inputList);
  toggleSubmitButton(buttonElement, config, hasInvalid);
}

// Функции для настройки обработчиков событий
function setupInputEventListener(
  formElement,
  inputElement,
  buttonElement,
  config
) {
  inputElement.addEventListener("input", () => {
    isValid(formElement, inputElement, config);
    toggleButtonState(
      Array.from(formElement.querySelectorAll(config.inputSelector)),
      buttonElement,
      config
    );
  });
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    setupInputEventListener(formElement, inputElement, buttonElement, config);
  });
};

export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Обработка submit
    });
    setEventListeners(formElement, config);
  });
};
