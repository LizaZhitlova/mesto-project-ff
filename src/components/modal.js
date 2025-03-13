
// в файл modal.js помещаем функции отвечающе за работу попапов



let CurrentOpenedPopup = null; //создаём переменную CurrentOpenedPopup, данная переменная будет хранить текущий открытй попап.
// функция открытия попапа

export function OpenPopup(popupElement) {
    // popupElement.classList.add("popup_is-animated");
    popupElement.classList.add("popup_is-opened");
    CurrentOpenedPopup = popupElement;
    CurrentOpenedPopup.addEventListener("click", closePopupbyOverlay); // при открытии попапа вешаем на текущий открытый попап прослушиватель событий, в колбэк
    // прослушивателя передаём функцию, которая закрывает попапа по нажанию на оверлей.
    //СПОСИТЬ Почему при нажатии на сам попапа оне не закрывается?
  };


  // функция закрытия попапа, которая записывается в колбэк прослушивателя событий- с текущего открытого попапа снимаем класс .popup_is-opened
export function PopupClose() {
    CurrentOpenedPopup.classList.remove("popup_is-opened",);
    CurrentOpenedPopup.removeEventListener("click", closePopupbyOverlay);
    CurrentOpenedPopup = null;
  };

  // функция closePopupbyOverlay передаётся в прослуiиватель событий, который навешивается на текущий открытый попап (CurrentOpenedPopup)
function closePopupbyOverlay(evt) {
    if (evt.currentTarget === evt.target) {
      PopupClose();
    }
  };


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
export function handleFormSubmit(evt) {
let newNameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
let newJobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  
    // Получите значение полей newNameInput  и newJobInput из свойства value
    const newNameValue = newNameInput.value;
    const newJobValue = newJobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей. выбирвем элементы зголовка и параграфа на странице
    const newprofileTitle = document.querySelector(".profile__title");
    const newprofileDescription = document.querySelector(".profile__description");
    // Вставьте новые значения с помощью textContent
    newprofileTitle.textContent = newNameValue;
    newprofileDescription.textContent = newJobValue;
    PopupClose();
    CurrentOpenedPopup = null; // обнуляем переменную CurrentOpenedPopup, чтобы после закрытия формы в ней ничего не хранилось
  };