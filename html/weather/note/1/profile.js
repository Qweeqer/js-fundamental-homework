import { getCurrent, getLogOut, setToken, getHeaders } from './auth.js';
import { getWeatherData } from './getWeatherData.js';

// знайти елемент з id "map"
const mapElement = document.getElementById('map');

document.getElementById('home-button').addEventListener('click', () => {
  window.location.href = './weather.html';
});

const showProfileInfo = async () => {
  const currentUser = await getCurrent();

  if (!currentUser) {
    console.error('No user found');
    return;
  }

  const username = currentUser.name;
  const userEmail = currentUser.email;
  const userPassword = currentUser.password;

  const userInfo = document.getElementById('user-info');
  userInfo.innerHTML = `
    <p>Ім'я: ${username}</p>
    <p>Email: ${userEmail}</p>
    <p>Пароль: ${userPassword}</p>
  `;
  userInfo.style.display = 'block';
};

const handleLogout = async () => {
  try {
    await getLogOut();
    hideUserInfo();
    const logOutForm = document.getElementById('logout-button');
    window.location.href = './weather.html';
  } catch (error) {
    console.error(error);
    alert('Log Out Error');
  }
};
document
  .getElementById('profile-button')
  .addEventListener('click', showProfileInfo);

document
  .getElementById('logout-button')
  .addEventListener('click', handleLogout);

const hideUserInfo = () => {
  const userInfo = document.getElementById('UserInfo');
  userInfo.style.display = 'none';

  const logoutButton = document.getElementById('logout-button');
  logoutButton.style.display = 'none';
};
// Ми використаємо localStorage для зберігання списку обраних міст.
const selectedCitiesKey = 'selectedCities';

const getSelectedCities = () => {
  const cities = localStorage.getItem(selectedCitiesKey);
  return cities ? JSON.parse(cities) : [];
};

const addCityToSelected = city => {
  const cities = getSelectedCities();
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem(selectedCitiesKey, JSON.stringify(cities));
  }
};

const removeCityFromSelected = city => {
  const cities = getSelectedCities();
  const index = cities.indexOf(city);
  if (index > -1) {
    cities.splice(index, 1);
    localStorage.setItem(selectedCitiesKey, JSON.stringify(cities));
  }
};
// обробники подій для кнопок "addToSelected" та "selected-button":
const addToSelectedButton = document.querySelector('.addToSelected');
const cityInput = document.getElementById('city-input');
const selectedButton = document.getElementById('selected-button');
const selectedModal = document.getElementById('Selected');

addToSelectedButton.addEventListener('click', () => {
  const cityName = cityInput.value.trim();
  if (cityName) {
    addCityToSelected(cityName);
  }
});

const selectedCloseButton = document.getElementById('button-x2');
const darkOverlay = document.getElementById('dark');

selectedCloseButton.addEventListener('click', () => {
  selectedModal.style.display = 'none';
  darkOverlay.style.display = 'none';
});

selectedButton.addEventListener('click', async () => {
  const selectedCities = getSelectedCities();
  // Додаємо перевірку на кількість міст у selectedCities
  if (selectedCities.length === 0) {
    alert('Ви ще не додали будь-яке місто в обране');
    return;
  }
  mapElement.style.zIndex = -1;
  const cityList = document.createElement('ul');
  cityList.classList.add('cityList');
  document.body.classList.add('modal-open');
  for (const city of selectedCities) {
    const listItem = document.createElement('li');
    listItem.textContent = `Місто:` + city;

    try {
      const weatherData = await getWeatherData(city);
      const weatherInfo = document.createElement('div');
      weatherInfo.innerHTML = `
        <p>Температура: ${weatherData.main.temp}°C</p>
        <p>Вітер: ${weatherData.wind.speed} м/с <i class="wi wi-strong-wind"></i></p>
        <p>Вологість: ${weatherData.main.humidity}%</p>
        <p>Тиск: ${weatherData.main.pressure} <i class="wi wi-barometer"></i></p>
        <p>Стан неба: ${weatherData.weather[0].description} <i class="wi wi-cloudy"></i></p>
        
      `;
      listItem.appendChild(weatherInfo);
    } catch (error) {
      console.error(error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Не вдалося отримати дані про погоду';
      alert(`Не вдалося отримати дані про погоду ${city}`);
      listItem.appendChild(errorMessage);
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.classList.add('deleteCityButton');
    deleteButton.addEventListener('click', () => {
      removeCityFromSelected(city);
      listItem.remove();
      // Перевірка, чи залишилися міста у списку обраних
      const remainingCities = getSelectedCities();
      if (remainingCities.length === 0) {
        alert('Ви ще не додали будь-яке місто в обране');
        selectedModal.style.display = 'none';
        darkOverlay.style.display = 'none';
        document.body.classList.remove('modal-open');
      }
    });

    listItem.appendChild(deleteButton);
    cityList.appendChild(listItem);
  }

  selectedModal.innerHTML = '';
  selectedModal.appendChild(cityList);
  // Додаємо кнопку закриття модального вікна
  const closeButton = document.createElement('button');
  closeButton.id = 'button-x2';
  closeButton.innerHTML = '<div id="x-icon"></div>';
  closeButton.addEventListener('click', () => {
    selectedModal.style.display = 'none';
    darkOverlay.style.display = 'none';
    mapElement.style.zIndex = 0;
    document.body.classList.remove('modal-open');
  });

  // Додаємо кнопку закриття до модального вікна
  selectedModal.prepend(closeButton);

  // Показуємо модальне вікно та темний фон
  selectedModal.style.display = 'block';
  darkOverlay.style.display = 'block';
});

// ПРОФІЛЬ МОДАЛ
const profileButton = document.getElementById('profile-button');
const profileModal = document.getElementById('profile-modal');
const closeProfileModal = document.getElementById('close-profile-modal');
const userInfo = document.getElementById('user-info');

profileButton.addEventListener('click', async () => {
  const currentUser = await getCurrent();
  if (currentUser) {
    userInfo.innerHTML = `
      <p>Ім'я: ${currentUser.name}</p>
      <p>Email: ${currentUser.email}</p>
    `;
    profileModal.style.display = 'block';
  } else {
    alert('Будь ласка, увійдіть, щоб побачити інформацію про користувача');
  }
});

closeProfileModal.addEventListener('click', () => {
  profileModal.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target === profileModal) {
    profileModal.style.display = 'none';
  }
});
