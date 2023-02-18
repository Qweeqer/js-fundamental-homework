const validation = document.querySelector("#validation-input");
const addRemoveClass = (remove, add) => {
  validation.classList.remove(`${remove}`);
  validation.classList.add(`${add}`);
};
const validSymbol = (event) => {
  const { value } = event.currentTarget;
  const { length } = validation.dataset;
    console.log(value.length);
    console.log(Number(length) === value.length);
  if (Number(length) === value.length) {
    addRemoveClass("invalid", "valid");
  } else {
      addRemoveClass("valid", "invalid");
    }
};
validation.addEventListener("blur", validSymbol);
console.log(validation.textContent);