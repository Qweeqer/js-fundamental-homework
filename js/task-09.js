function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.body;
const btnStart = document.querySelector('.change-color');
const inputSpanColor = document.querySelector(`.color`)

btnStart.addEventListener('click', changeColor);
function changeColor() {
  const randomColor = getRandomHexColor()
  body.style.backgroundColor = randomColor;
  inputSpanColor.textContent = randomColor;
  console.log(randomColor);
};

