// 1) Задано сторінку з 3 кнопками і 1 лінкою. Напишіть Javascript код і реалізуйте HTML-сторінку з відповідними подіями на кожному елементові:
//         1) 1-ша кнопка – при кліку на неї колір фону сторінки міняється на синій
//         2) 2-га кнопка – при подвійному кліку на неї колір фону сторінки міняється на рожевий
//         3) 3-я кнопка – при натисненні і утримуванні кнопки колір фону сторінки стає коричневий. При відпусканні – білий.
//         4) При наведенні на лінку – колір фону стає жовтим, при відведенні – білим.
//         Приклад – курсор наведений на лінку.
// Отримуємо посилання на елементи сторінки
// const button1 = document.getElementById('button1');
// const button2 = document.getElementById('button2');
// const button3 = document.getElementById('button3');
// const link = document.getElementById('link');
// const body = document.body;

// // Додаємо обробники подій для кожного елемента
// button1.addEventListener('click', function() {
//     body.style.backgroundColor = 'blue';
// });
// // hover button
// // Додаємо обробник події для кнопки
// button1.addEventListener('mouseover', function() {
//     button1.style.backgroundColor = 'green';
// });

// // Додаємо обробник події для кнопки
// button1.addEventListener('mouseout', function() {
//     button1.style.backgroundColor = '';
// });
// /////////////
// button2.addEventListener('dblclick', function() {
// 	body.style.backgroundColor = 'pink';
// });

// button3.addEventListener('mousedown', function() {
// 	body.style.backgroundColor = 'brown';
// });

// button3.addEventListener('mouseup', function() {
// 	body.style.backgroundColor = 'white';
// });

// link.addEventListener('mouseover', function() {
//     body.style.backgroundColor = 'yellow';
//     button1.style.backgroundColor = 'green';
//     console.log('button1', button1)
// });

// link.addEventListener('mouseout', function() {
// 	body.style.backgroundColor = 'white';
// });
// ************ Akardeon *******************
// // Отримуємо посилання на елементи сторінки
//   const items = document.querySelectorAll('.acrd-item-name');
//   // Додаємо обробники подій для кожного елемента аккордеону
//   items.forEach((item) => {
//     item.addEventListener('click', () => {
//       // Перевіряємо, чи має елемент клас "active"
//       const isActive = item.classList.contains('active');
//       // Знімаємо клас "active" у всіх елементів акордеону
//       items.forEach((el) => {
//         el.classList.remove('active');
//       });
//       // Додаємо або знімаємо клас "active" в залежності від того, чи має елемент клас "active"
//       item.classList.toggle('active', !isActive);
//     });
//   });

// 2) Зробити поле для введення тексту. Після натиснення кнопки addPost введений текст вставляти в блок нижче поля для введення тексту.
// Зробити додатково вивід кнопки збільшити та зменшити розмір шрифту, змінити колір шрифту та
// селект де можна вибрати тип форматування тексту(Uppercase і тд).

const inputText = document.getElementById('input-text');
const addPostBtn = document.getElementById('add-post');
const postContainer = document.getElementById('post-container');
const increaseFontBtn = document.getElementById('increase-font');
const decreaseFontBtn = document.getElementById('decrease-font');
const fontSize = document.getElementById('font-size');
const textFormat = document.getElementById('text-format');
const textColor = document.getElementById('text-color');

let currentFontSize = 16;
let isEditing = false;
let editingPost;

// Функція для додавання нового посту
function addPost() {
  const text = inputText.value;
  // Перевірка, що текст не пустий
  if (text.length < 1) {
    alert('Введіть текст поста');
    return;
  }
  // Створюємо новий елемент div з текстом
  const post = document.createElement('div');
  post.innerText = text;
  post.style.fontSize = `${currentFontSize}px`;
  // Застосовуємо форматування тексту
  switch (textFormat.value) {
    case 'uppercase':
      post.style.textTransform = 'uppercase';
      break;
    case 'lowercase':
      post.style.textTransform = 'lowercase';
      break;
    case 'capitalize':
      post.style.textTransform = 'capitalize';
      break;
    default:
      post.style.textTransform = 'none';
      break;
  }
  // Застосовуємо колір тексту
  post.style.color = textColor.value;
  // Додаємо обробник події для редагування посту
  post.addEventListener('click', () => {
    isEditing = true;
    editingPost = post;
    inputText.value = post.innerText;
    addPostBtn.innerText = 'Save';
  });
  // Додаємо елемент в контейнер
  postContainer.appendChild(post);
  // Очищаємо поле введення
  inputText.value = '';
}

// Додаємо обробник події для кнопки Add Post / Save
addPostBtn.addEventListener('click', () => {
if (isEditing) {
// Збереження змін вже існуючого посту
editingPost.innerText = inputText.value;
isEditing = false;
editingPost = null;
addPostBtn.innerText = 'Add Post';
} else {
// Додавання нового посту
addPost();
}
});
// Додаємо обробники подій для кнопок Increase Font та Decrease Font
increaseFontBtn.addEventListener('click', () => {
currentFontSize += 1;
fontSize.innerText = `${currentFontSize}px`;
});
decreaseFontBtn.addEventListener('click', () => {
if (currentFontSize > 1) {
currentFontSize -= 1;
fontSize.innerText = `${currentFontSize}px`;
}
});

// Додаємо обробник події для select Text Format
textFormat.addEventListener('change', () => {
switch (textFormat.value) {
case 'uppercase':
postContainer.style.textTransform = 'uppercase';
break;
case 'lowercase':
postContainer.style.textTransform = 'lowercase';
break;
case 'capitalize':
postContainer.style.textTransform = 'capitalize';
break;
default:
postContainer.style.textTransform = 'none';
break;
}
});

// Додаємо обробник події для input Text Color
textColor.addEventListener('input', () => {
postContainer.style.color = textColor.value;
});

// Функція для видалення посту
function deletePost(post) {
post.remove();
}

// Додаємо обробник події для видалення посту
postContainer.addEventListener('click', (event) => {
if (event.target.tagName === 'DIV') {
deletePost(event.target);
}
});
// *****3*****************************************************************


// ***********************************************************************************
// 3)Реалізуйте програму, яка відслідковуватиме зміну розміру(ширини і висоти)
// вікна браузера і виводитиме на поточну сторінку при її розтязі / стисканні відповідні значення.
let windowSize = document.getElementById('windowSize');

function updateWindowSize() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  console.log('Розмір вікна: ' + width + ' x ' + height);
  windowSize.textContent = width + ' x ' + height;
  // На основі попередньої задачі відкрити в новому вікні гугл при ширині екрану менше 1000px
  if (width < 1000) {
    let googleWindow = window.open('https://www.google.com', '_blank');
    if (googleWindow) {
      googleWindow.focus();
    }
  }
  /////////////////////
}

window.addEventListener('resize', updateWindowSize);
// 4) Створити сторінку із  2 кнопками(goToGoogle та goToBing), перша при кліку відкриває гугл в поточній вкладці
//  за допомогою assign а при кліку на goToBing ми відкриваємо bing  за допомогою методу replace об'єкту location
let goToGoogle = document.getElementById('goToGoogle');
goToGoogle.addEventListener('click', function () {
  window.location.assign('https://www.google.com');
});

let goToBing = document.getElementById('goToBing');
goToBing.addEventListener('click', function () {
  window.location.replace('https://www.bing.com');
});
let reload = document.getElementById('reload');
reload.addEventListener('click', function () {
  // перезавантаження
  // console.log('reload', reload);
  location.reload();
});
let forwardOnePage = document.getElementById('forwardOnePage');
forwardOnePage.addEventListener('click', function () {
  window.history.forward();
});
let backOnePage = document.getElementById('backOnePage');
backOnePage.addEventListener('click', function () {
  window.history.go(-2);
  console.log('window.history.length', window.history.length);
});
////////////---------------/////
updateWindowSize();

function validateCardNumber() {
  let input1 = document.getElementById('cardNumber1');
  // let input2 = document.getElementById('cardNumber2');
  // let input3 = document.getElementById('cardNumber3');
  // let input4 = document.getElementById('cardNumber4');
  // let cardNumber = input1.value + input2.value + input3.value + input4.value;
  let cardNumber = input1.value;
  let regex = /^(?:\d{4}[-\s]?){4}$/;
  if (!regex.test(cardNumber)) {
    document.getElementById('validationResult').textContent =
      'Номер карти невалідний:' + cardNumber;
    document.getElementById('validationResult').classList.add('invalid');
    document.getElementById('validationResult').classList.remove('valid');
  } else {
    document.getElementById('validationResult').textContent = 'Номер карти валідний: ' + cardNumber;
    document.getElementById('validationResult').classList.add('valid');
    document.getElementById('validationResult').classList.remove('invalid');
  }
}

let validateButton = document.getElementById('validateButton');
validateButton.addEventListener('click', validateCardNumber);
// 5) Напишіть функцію, яка приймає рядкові дані і виконує перевірку на їх відповідність емейлу.
//         Вимоги:
// •  Цифри (0-9).
// •  Тільки латинські літери в великому (A-Z) і малому (a-z) регістрах.
// •  В тілі емейла допустимі лишеі символи “_” і “-”. Але вони не можуть бути 1-им символом емейлу.
//  •  Символ “-” не може повторюватися.

// checkEmail('my_mail@gmail.com');
// Email is correct!
// checkEmail('#my_mail@gmail.com');
// Email is not correct!
// checkEmail('my_ma--il@gmail.com');
// Email is not correct!
function checkEmail(email) {
  const regex = /^[A-Za-z0-9]+([._-][A-Za-z0-9]+)*@[A-Za-z0-9]+([.-][A-Za-z0-9]+)*\.[A-Za-z]{2,}$/;
  if (regex.test(email)) {
    document.getElementById('result').textContent = 'Email is correct!';
  } else {
    document.getElementById('result').textContent = 'Email is not correct!';
  }
}
// 5)Реалізувати валідацію значень поля, якщо значення більше - рівне 8 символів, містить числа,
//   літери у верхньому  і нижньому регістрі та  хоч 1 символ(_#!)
// то бекграунд закрашувати зеленим кольором
// а в  іншому випадку червоним(закрашування бекграунду відбувається при введені даних)
// const input = document.getElementById('input');
input.addEventListener('input', function () {
  const value = input.value;
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_#!])[0-9a-zA-Z_#!]{8,}$/;
  if (regex.test(value)) {
    input.style.backgroundColor = 'green';
  } else {
    input.style.backgroundColor = 'red';
  }
});



// ***********************Нотатки*************************************
// const inputText = document.getElementById('input-text');
// const addPostBtn = document.getElementById('add-post');
// const postContainer = document.getElementById('post-container');
// const increaseFontBtn = document.getElementById('increase-font');
// const decreaseFontBtn = document.getElementById('decrease-font');
// const fontSize = document.getElementById('font-size');
// const textFormat = document.getElementById('text-format');
// const textColor = document.getElementById('text-color');

// let currentFontSize = 16;

// // Додаємо обробник події для кнопки Add Post
// addPostBtn.addEventListener('click', () => {
//   // Отримуємо введений текст з поле введення
//   const text = inputText.value;
//   // Перевірка, що текст не пустий
//   if (text.length < 1) {
//     alert('Введіть текст поста');
//     return;
//   }
//   // Створюємо новий елемент div з текстом
//   const post = document.createElement('div');
//   post.innerText = text;
//   post.style.fontSize = `${currentFontSize}px`;
//   // Застосовуємо форматування тексту
//   switch (textFormat.value) {
//     case 'uppercase':
//       post.style.textTransform = 'uppercase';
//       break;
//     case 'lowercase':
//       post.style.textTransform = 'lowercase';
//       break;
//     case 'capitalize':
//       post.style.textTransform = 'capitalize';
//       break;
//     default:
//       post.style.textTransform = 'none';
//       break;
//   }
//   // Застосовуємо колір тексту
//   post.style.color = textColor.value;
//   // Додаємо елемент в контейнер
//   postContainer.appendChild(post);
//   // Очищаємо поле введення
//   inputText.value = '';
// });
// // Додаємо обробники подій для кнопок Increase Font та Decrease Font
// increaseFontBtn.addEventListener('click', () => {
//   currentFontSize += 1;
//   fontSize.innerText = `${currentFontSize}px`;
// });
// decreaseFontBtn.addEventListener('click', () => {
//   if (currentFontSize > 1) {
//     currentFontSize -= 1;
//     fontSize.innerText = `${currentFontSize}px`;
//   }
// });
// *******2************************************************************
