// Домашне завдання №3
// 1) реалізувати функціонал завантаження лоадера
// https://codepen.io/qweeqer/pen/ExewyeG
// 2) реалізувати вивід даних із полів при кліку на кнопку "Надіслати" в поле outBlock
// https://codepen.io/qweeqer/pen/OJoxXvX
// 3) Реалізувати логіку підрахунку ціни товару по його варіаціях(при кліку на колір змінювати ціну товару).
// https://codepen.io/qweeqer/pen/bGxoewe
let container = document.querySelector('.container');
let loader = document.querySelector('.block');
let loaderWidth = (loader.style.width = '0px');
let percent = document.querySelector('.percent');
let startBtn = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let intervalId;
let containerWidth = container.offsetWidth - 10;

startBtn.addEventListener('click', () => {
  if (intervalId === undefined) {
    intervalId = setInterval(() => {
      let currentWidth = Math.min(loader.offsetWidth + 10, containerWidth);

      if (currentWidth > containerWidth) {
        currentWidth = containerWidth;
      }
      loader.style.width = currentWidth + 'px';
      let currentPercent = Math.round((currentWidth / containerWidth) * 100);
      percent.innerHTML = currentPercent + '%';
      if (currentWidth >= containerWidth) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    }, 100);
  }
});

stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = undefined;
  if (loader.offsetWidth === containerWidth) {
    loader.style.width = 0;
    percent.innerHTML = '0%';
  }
});
