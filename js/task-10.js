// 'use strict';
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
// <--------1------->
const createButton = document.querySelector('button[data-create]');
const removeButton = document.querySelector('button[data-destroy]');
const input = document.querySelector('input');
const boxes = document.querySelector('#boxes');
let amount = 0;

input.addEventListener('input', (event) => handelInput(event));
createButton.addEventListener('click', () => createBoxes(amount));
removeButton.addEventListener('click', () => removeBoxes(amount));

function createBoxes(amount) {  
  let size = 30;
  for (let i = 0; i < amount; i += 1, size += 10) {
    const container = document.createElement('div');    
    container.style.height = `${size}px`;
    container.style.width = `${size}px`;
    container.style.background = getRandomHexColor();
    boxes.append(container);
  }
}
function removeBoxes() {
  boxes.textContent = '';
}
function handelInput(event) {
  amount = event.target.value;
}

// < --------2------->
// const createButton = document.querySelector('button[data-create]')
// const removeButton=document.querySelector('button[data-destroy]')
// const input = document.querySelector('input[type="number"]')
// const boxes = document.querySelector('#boxes')

// createButton.addEventListener('click',createBoxes)
// removeButton.addEventListener('click', removeBoxes)

// function removeBoxes() {
//   boxes.innerHTML = '';
// }
// function createBoxes(amount) {  
//   const numberOfBoxes = [];
//   for (let i = 1; i < input.value; i +=1) {
//     numberOfBoxes.push(i);
//   }
//   const divBoxes = numberOfBoxes.map((number, index) => {
//     const randomBackgroundColor = getRandomHexColor();
//     const divWidth = 30 + 10 * index;
//     const divHeight = 30 + 10 * index; 
//     return `<div style = width: "${divWidth}"px; height:"${divHeight}"; 
//     background-color:"${randomBackgroundColor}" id="boxes"></div>`
//   });
//   input.insertAdjacentHTML("beforeend", numberOfBoxes.join(""));
// }

