let counterValue = 0;

const decrementButton = document.querySelector(`[data-action = "decrement"]`)
// console.log(decrementButton);
const incrementButton = document.querySelector(`[data-action = "increment"]`)
// console.log(incrementButton);
const value = document.querySelector(`#value`)

const decrValue = () =>  {
    counterValue -= 1
    value.textContent = counterValue;
    console.log(counterValue);
};
decrementButton.addEventListener('click', decrValue);

const incrValue = () =>  {
    counterValue += 1;
    value.textContent = counterValue;
    console.log(counterValue);
};
incrementButton.addEventListener('click', incrValue);

