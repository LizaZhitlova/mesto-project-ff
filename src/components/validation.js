// в данном файле описана логика валидации форм


// функции валидации
const formEditProfile = document.querySelector('[name ="edit-profile"]');
const popupInputTypeName =formEditProfile.querySelector('.popup__input_type_name');
// const popupInputTypeDescription = formEditProfile.querySelector('.popup__input_type_description');
const formEditProfileError=formEditProfile.querySelector(`.${popupInputTypeName.id}-error`);

//Эта функция должна принимать как параметры DOM-элемент формы, для которой очищаются ошибки валидации и объект с настройками валидации. Используйте функцию clearValidation при заполнении формы профиля во время её открытия и при очистке формы добавления карточки.
function clearValidation(){};

// показывает элемент ошибки, подсвечивает поле с ошибкой
function showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('type_error');
    errorElement.textContent=errorMessage;
    errorElement.classList.add('popup_input-error_active');
}
//скрывает элемент ошибки
function hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('type_error');
    errorElement.classList.remove('popup_input-error_active');
    errorElement.textContent = '';
};
//проверяет валидность поля, внутри вызывает showInputError или hideInputError.
 function isValid (formElement, inputElement){
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
        const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
      
        // Обойдём все элементы полученной коллекции
        inputList.forEach((inputElement) => {
          // каждому полю добавим обработчик события input
          inputElement.addEventListener('input', () => {
            // Внутри колбэка вызовем isValid,
            // передав ей форму и проверяемый элемент
            isValid(formElement, inputElement)
          });
        });
      };

      // необходимо найти все формы на странице и добавить им слушателеи собыйтий для этого создаём функцию enableValidation
      export const enableValidation = () => {
        // Найдём все формы с указанным классом в DOM,
        // сделаем из них массив методом Array.from
        const formList = Array.from(document.querySelectorAll('.popup__form'));
      
        // Переберём полученную коллекцию
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
              evt.preventDefault();
            });
          // Для каждой формы вызовем функцию setEventListeners,
          // передав ей элемент формы
          setEventListeners(formElement);
        });
      };
      
      