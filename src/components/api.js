// файл для запросов на сервер 

import {appendCarsAPI} from "../index.js";

// реализация загрузки информации о пользователе 

fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', { 
    headers:{
         authorization:'cc15c7c0-115a-417c-9697-eca1b1849815'
        }
  })
  
  .then((res) => {
    return result = res.json();// возвращаем результат работы метода и идём в следующий then
  })
  .then((data) => { // если мы попали в этот then, data — это объект, полученный в предыдущем промисе 
    console.log('Данные пользователя:',data);
    document.querySelector('.profile__title').textContent = data.name;
    document.querySelector('.profile__description').textContent = data.about;
       // Вставляем ссылку на аватар в background-image
    const avatarImage = document.querySelector('.profile__image');
    avatarImage.style.backgroundImage = `url('${data.avatar}')`;

  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
    alert('Не удалось загрузить данные профиля');
  });

  // загрузка начальных карточек  с сервера 

  // для загрузки каптикок с сервера нам необходимо запустить несколько промисов параллельно и получить и дождаться их выполнения 
  // Promise.All принимаеи объект промисов 
  Promise.all([
    fetch('https://nomoreparties.co/v1/wff-cohort-35/users/me', { 
        headers:{
             authorization:'cc15c7c0-115a-417c-9697-eca1b1849815'
            }
      }),
    fetch('https://nomoreparties.co/v1/wff-cohort-35/cards', { 
    headers:{
         authorization:'cc15c7c0-115a-417c-9697-eca1b1849815'
        }
  })
    ])

    // здесь мы получаем два обекта с данными массив карточек и информацию о пользователе включая Id
    .then(([userIdRes,cardRes]) =>{

        if (userIdRes.ok || cardRes.ok) {
            return Promise.all([userIdRes.json(), cardRes.json()]);
            
          }else{
            reject();
          }
    }
    
    )
    // если у нас оба запроса выполнились, то мы попадаем в следующий then, где вызываем функцию выведения карточек на страницу.
    .then (([userIdData,cardData]) =>{
// проверяем в косоли полученные обекты - в кончоли объекты появляются
        console.log('Данные пользователя:', userIdData);
        console.log('Загруженные карточки:', cardData);
        appendCarsAPI(cardData);

    })
    
    .catch(error => {
        console.error('Ошибка при загрузке данных:', error);
        alert('Не удалось загрузить данные профиля');
      });
    