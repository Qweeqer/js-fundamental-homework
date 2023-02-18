const input = document.querySelector("#name-input");
const nameOutput = document.querySelector("#name-output");
input.addEventListener("input", (event) => {
  console.log(event.currentTarget.value);
   if (event.currentTarget.value.trim() === '') {
       return nameOutput.innerHTML = 'Anonymous';
    } 
  nameOutput.textContent = event.currentTarget.value;
});