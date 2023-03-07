// 1) Створити додаток (html сайт) який буде переводити температуру із Цельсія в Фаренгейт та навпаки.
// Функція перетворення має працювати на подію input. Якщо вводяться значення в поле Цельсій то відбувається перетворення в Фаренгейт, якщщо вводимо дані в поле Фаренгейт, то запускається функція перетворення в Цельсій.
// 2) Створити додаток для розрахунку площі прямокутника. На основі значень введених в поля, при кліку на кнопку Побудувати, в div блоці із класом out потрібно відрисувати прямокутник із заданими параметрами (але в пікселях а не сантиметрах)
// 3) Створити гру для перевірки знання таблиці множення. Користувач має 3 спроби пройти тест (який складається із 5 прикладів). По завершенню виводити найкращий результат.
// 4) Зробити опитування користувача, кожна відповідь затерає наявне DOM дерево і відрисовує нове (із наступним питанням), всі відповіді зберігати в масиві, і в кінці на основі цих відповідей вивести інформацію про користувача на основі відповідей.
// 5) Реалізувати логіку підрахунку ціни товару по його варіаціях(при кліку на колір змінювати ціну товару).
// https://codepen.io/qweeqer/pen/bGxoewe
const shoesImgNodes = document.querySelectorAll('.shoe');
const shoeBckgrnddNodes = document.querySelectorAll('.gradient');
const btnsColorNodes = document.querySelectorAll('.color');
const sizeSelectNode = document.querySelector('#size-select');
const outPriceNode = document.querySelector('#outprice');

const priceObj = {
  blue: 189.99,
  red: 209.99,
  green: 179.99,
  orange: 169.99,
  black: 309.99,
};

let shoesImgArr = Array.from(shoesImgNodes);
let shoeBckgrndArr = Array.from(shoeBckgrnddNodes);
let btnsColorArr = Array.from(btnsColorNodes);

let activeColor = 'blue';
let activeSize = '38';

function updatePrice() {
  const price =
    priceObj[activeColor] +
    Number(
      sizeSelectNode.options[sizeSelectNode.selectedIndex].getAttribute(
        'data-price'
      )
    );
  outPriceNode.textContent = price.toFixed(2);
}

btnsColorArr.forEach(node => {
  node.addEventListener('click', () => {
    btnsColorArr.forEach(node => node.classList.remove('active'));
    node.classList.add('active');
    const color = node.getAttribute('color');
    activeColor = color;
    shoesImgArr.forEach(node => node.classList.remove('show'));
    shoesImgArr
      .find(node => node.getAttribute('color') === color)
      .classList.add('show');
    shoeBckgrndArr.forEach(node => node.classList.remove('second'));
    shoeBckgrndArr
      .find(node => node.getAttribute('color') === color)
      .classList.add('second');
    updatePrice();
  });
});

sizeSelectNode.addEventListener('change', () => {
  activeSize = sizeSelectNode.value;
  updatePrice();
});

updatePrice();

