// ***************1**********************************************************
// обробник подій для перемикача теми у JavaScript-файлі:
const themeSwitch = document.querySelector('#theme-switch');

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});

// Для динамічної зміни назви міста в елементі <h4 class="city-name"></h4>
const cityNameElement = document.querySelector('.city-name');

const updateCityName = newCityName => {
  cityNameElement.textContent = newCityName;
};

// **************************************************************************************************
