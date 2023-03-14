// Реалізуйте програму, яка по натисканню на кнопку виводитиме повідомлення 
// ""I was pressed!"", при наведенні на кнопку виводитиме повідомлення ""Mouse on me!"",
//   а при відведенні курсора миші виводитиме повідомлення ""Mouse is not on me!""."
// // Отримуємо посилання на кнопку
// let myButton = document.getElementById("myButton");

// // Додаємо подію "click"
// myButton.addEventListener('click', function () {
//   alert('I was pressed!');
// });

// // Додаємо подію "mouseover"
// myButton.addEventListener('mouseover', function () {
//   alert('Mouse on me!');
// });

// // Додаємо подію "mouseout"
// myButton.addEventListener('mouseout', function () {
//   alert('Mouse is not on me!');
// });
let myButton = document.getElementById('myButton');

function showMessage(event) {
  let message = '';

  if (event.type === 'click') {
    message = 'I was pressed!';
  } else if (event.type === 'mouseover') {
    message = 'Mouse on me!';
  } else if (event.type === 'mouseout') {
    message = 'Mouse is not on me!';
  }

  alert(message);
}

myButton.addEventListener('click', showMessage);
myButton.addEventListener('mouseover', showMessage);
myButton.addEventListener('mouseout', showMessage);
