import {
  apiKey,
  apiUrlWeather,
  apiUrlForecast,
  cityInput,
  weatherList,
  todayButton,
  threeDaysButton,
  sevenDaysButton,
} from '../weatherVariables.js';
import { getWeatherData } from '../getWeatherData.js';
import { clearWeather } from '../clearWeather.js';
// import { fetchCityByGeolocation } from './fetchCityByGeolocation.js';
import {
  mapElement,
  currentMarker,
  initMap,
  addMarkerToMap,
  updateMapCenter,
  map,
  fetchCityByGeolocationAndUpdateMap,
  fetchCityByGeolocation,
} from '../mapService.js';
// ********************************************************************************************
// const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
// const apiUrlWeather = 'https://api.openweathermap.org/data/2.5/weather';
// const apiUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast';
// const cityInput = document.querySelector('#city-input');
// const weatherList = document.querySelector('#weather-list');
// const todayButton = document.querySelector('#today-button');
// const threeDaysButton = document.querySelector('#three-day-button');
// const sevenDaysButton = document.querySelector('#seven-day-button');

// // ********Запит для обраного**************************
// const getWeatherData = async city => {
//   const response = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
//   );
//   if (!response.ok) {
//     throw new Error('Failed to fetch weather data');
//   }
//   const data = await response.json();
//   return data;
// };
// // *******************END*********************************

// *********************clearWeather*****************************************
// const clearWeather = () => {
//   const weatherContainer = document.querySelector('.weather-container');
//   if (weatherContainer) {
//     weatherContainer.innerHTML = '';
//   }
// };
// **********************************************************
export const fetchWeatherData = async (numDays, city = cityInput.value) => {
  const apiUrl = numDays === 1 ? apiUrlWeather : apiUrlForecast;
  if (!city) {
    return;
  }

  const response = await fetch(
    `${apiUrl}?q=${city}&units=metric&appid=${apiKey}`
  );

  if (!response.ok) {
    console.error(
      `Не вдалося отримати дані погоди. HTTP статус: ${
        response.status
      }, текст відповіді: ${await response.text()}`
    );

    return;
  }

  const data = await response.json();
  weatherList.innerHTML = '';

  let daysToShow = 1;
  if (numDays === 3) daysToShow = 3;
  else if (numDays === 7) daysToShow = 7;

  let weatherData;
  if (numDays === 1) {
    const pressureStr = data.main.pressure + ' гПа';
    const visibilityStr = (data.visibility / 1000).toFixed(1) + ' км';
    const skyStatusStr = data.weather[0].description;
    const uviResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${data.coord.lat}&lon=${data.coord.lon}`
    );
    const uviData = await uviResponse.json();
    const uviStr = uviData.value;
    const precipitationStr = data.weather[0].description.includes('дощ')
      ? 'Так'
      : 'Ні';

    weatherData = [
      {
        ...data,
        main: {
          ...data.main,
          pressure: pressureStr,
          visibility: visibilityStr,
        },
        weather: [
          {
            ...data.weather[0],
            skyStatus: skyStatusStr,
            precipitation: precipitationStr,
          },
        ],
        uvi: uviStr,
      },
    ];
  } else {
    weatherData = data.list
      .filter((_, index) => index % 8 === 0)
      .slice(0, daysToShow);
  }

  weatherData.forEach(weather => {
    const date = new Date(weather.dt * 1000);
    const dateStr = date.toLocaleDateString('uk-UA', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    const timeStr = date.toLocaleTimeString('uk-UA', {
      hour: 'numeric',
      minute: 'numeric',
    });
    const tempStr = Math.round(weather.main.temp) + '°C';
    const humidityStr = weather.main.humidity + '%';
    const windStr = weather.wind.speed + 'м/с';
    const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;
    const cityName = cityInput.value;

    const weatherItem = document.createElement('li');
    weatherItem.classList.add('WeatherWrapper');

    if (weather.coord !== undefined) {
      if (!weatherItem.hasAttribute('data-latitude')) {
        weatherItem.dataset.latitude = weather.coord.lat;
      }
      if (!weatherItem.hasAttribute('data-longitude')) {
        weatherItem.dataset.longitude = weather.coord.lon;
      }
    } else {
      if (weatherItem.hasAttribute('data-latitude')) {
        weatherItem.dataset.latitude =
          weatherItem.getAttribute('data-latitude');
      }
      if (weatherItem.hasAttribute('data-longitude')) {
        weatherItem.dataset.longitude =
          weatherItem.getAttribute('data-longitude');
      }
      console.error('Неможливо отримати координати погоди');
    }

    weatherItem.innerHTML = `
  <h3 class="DateWrapper">${dateStr} ${timeStr}</h3>
  <div class="city-marker-container">
    <svg class="city-marker" width="14" height="24" viewBox="0 0 14 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0C3.14038 0 0 3.14038 0 7C0 11.7 7 24 7 24C7 24 14 11.7 14 7C14 3.14038 10.8596 0 7 0ZM7 10.5C5.06863 10.5 3.5 8.93137 3.5 7C3.5 5.06863 5.06863 3.5 7 3.5C8.93137 3.5 10.5 5.06863 10.5 7C10.5 8.93137 8.93137 10.5 7 10.5Z" />
    </svg>
    <h4 class="city-name">${cityName}</h4>
  </div>
  <img class="IconStyled" src="${iconUrl}" alt="значок погоди">
  <p class="DegStyled">Температура: ${tempStr}</p>
  <p>Вологість: ${humidityStr}</p>
  <p class="WindStyled">Швидкість вітру: ${windStr} <i class="wi wi-strong-wind"></i></p>
  ${
    numDays === 1
      ? `<p>Тиск: ${weather.main.pressure} <i class="wi wi-barometer"></i></p>`
      : ''
  }
  ${
    numDays === 1
      ? `<p>Видимість: ${weather.main.visibility} <i class="wi wi-fog"></i></p>`
      : ''
  }
  ${
    numDays === 1
      ? `<p>Стан неба: ${weather.weather[0].skyStatus} <i class="wi wi-cloudy"></i></p>`
      : ''
  }
  ${
    numDays === 1
      ? `<p>Індекс УФ-випромінювання: ${weather.uvi} <i class="wi wi-hot"></i></p>`
      : ''
  }
  ${
    numDays === 1
      ? `<p>Ймовірність опадів: ${weather.weather[0].precipitation} <i class="wi wi-raindrops"></i></p>`
      : ''
  }
`;

    weatherList.appendChild(weatherItem);
  });
};

// Обробник подій на інпут
cityInput.addEventListener('change', async () => {
  const cityName = cityInput.value;
  if (!cityName) {
    return;
  }
  // Enter
  cityInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      event.preventDefault();
      clearWeather(); // Видалення попередньої погоди
      fetchWeatherData(1);
    }
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  );

  if (!response.ok) {
    console.error('Не вдалося отримати дані погоди');
    alert('Не вдалося отримати дані погоди');
    return;
  }

  const data = await response.json();
  const latitude = data.coord.lat;
  const longitude = data.coord.lon;

  updateMapCenter(map, latitude, longitude);
  addMarkerToMap(map, latitude, longitude);
});

// // ..
// const fetchCityByGeolocation = async (latitude, longitude) => {
//   const response = await fetch(
//     `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
//   );
//   const data = await response.json();
//   if (data.length > 0) {
//     cityInput.value = data[0].name;
//     updateMapCenter(map, latitude, longitude);
//     addMarkerToMap(map, latitude, longitude);

//     fetchWeatherData(1);
//   }
// };

const initApp = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        fetchCityByGeolocation(
          position.coords.latitude,
          position.coords.longitude
        );
      },
      error => {
        console.error(error);
        fetchWeatherData(1);
      }
    );
  } else {
    fetchWeatherData(1);
  }
};

todayButton.addEventListener('click', () => {
  fetchWeatherData(1);
});

threeDaysButton.addEventListener('click', () => {
  fetchWeatherData(3);
});

sevenDaysButton.addEventListener('click', () => {
  fetchWeatherData(7);
});

initApp();
// ***************1**********************************************************
// обробник подій для перемикача теми у JavaScript-файлі:
const themeSwitch = document.querySelector('#theme-switch');

themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-theme');
});
// ****************2*******************************************************************
// // додавання інтерактивної карти з погодними умовами API карти openstreetmap.org
// const mapElement = document.getElementById('map');

// // Ініціалізація карти з координатами та масштабом
// let currentMarker;
// const initMap = (latitude, longitude) => {
//   const map = L.map('map').setView([latitude, longitude], 13);
//   const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
//   const attribution =
//     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

//   const tiles = L.tileLayer(tileUrl, { attribution });
//   tiles.addTo(map);

//   addMarkerToMap(map, latitude, longitude);

//   return map;
// };

// const addMarkerToMap = (map, lat, lng) => {
//   if (currentMarker) {
//     currentMarker.remove();
//   }
//   currentMarker = L.marker([lat, lng]).addTo(map);
// };

// const updateMapCenter = (map, latitude, longitude, zoom = 5) => {
//   map.setView([latitude, longitude], zoom);
// };

// // Виклик initMap з поточними координатами та масштабом
// const map = initMap(50.450001, 30.523333, 5);

// // Оновлення центру карти після вибору міста
// const fetchCityByGeolocationAndUpdateMap = async (latitude, longitude) => {
//   const response = await fetch(
//     `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
//   );
//   const data = await response.json();
//   if (data.length > 0) {
//     cityInput.value = data[0].name;
//     updateCityName(data[0].name); // цей рядок для оновлення назви міста
//     updateMapCenter(map, latitude, longitude);
//     addMarkerToMap(map, latitude, longitude);
//     fetchWeatherData(1);
//   }
// };
// Для динамічної зміни назви міста в елементі <h4 class="city-name"></h4>
const cityNameElement = document.querySelector('.city-name');

const updateCityName = newCityName => {
  cityNameElement.textContent = newCityName;
};

// **************************************************************************************************
// Отримання елементів модального вікна
const modal = document.getElementById('myModal');
const closeModal = document.querySelector('.closeWeatherModal');
const modalWeatherInfo = document.getElementById('modalWeatherInfo');

// Функція для відображення детальної інформації про погоду в модальному вікні
const showWeatherDetailsInModal = async (latitude, longitude) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  // змінити z-index значення на -1
  mapElement.style.zIndex = '-1';

  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error('Не вдалося отримати деталі погоди');
    return;
  }

  const data = await response.json();
  const currentWeather = data.current;
  const dailyWeather = data.daily[0];
  const hourlyWeather = data.hourly.slice(0, 12); // отримайте перші 12 годин годинного прогнозу

  // Форматування даних
  const temperature = Math.round(currentWeather.temp) + '°C';
  const feelsLike = Math.round(currentWeather.feels_like) + '°C';
  const humidity = currentWeather.humidity + '%';
  const windSpeed = currentWeather.wind_speed + ' м/с';
  const uvi = currentWeather.uvi;
  const skyStatus = currentWeather.weather[0].description;
  // виклик
  const hourlyForecastHtml = displayHourlyForecast(hourlyWeather);
  // Вставка даних в modalWeatherInfo
  modalWeatherInfo.innerHTML = `
    <p>Температура: ${temperature}</p>
    <p>Відчувається як: ${feelsLike}</p>
    <p>Вологість: ${humidity}</p>
    <p>Швидкість вітру: ${windSpeed}</p>
    <p>Індекс УФ-випромінювання: ${uvi}</p>
    <p>Стан неба: ${skyStatus}</p>
    <div class="hourly-forecast">
    ${hourlyForecastHtml}
  </div>
  `;
};

// Відкриття модального вікна при натисканні на елемент з класом WeatherWrapper
document.addEventListener('click', async event => {
  const weatherWrapper = event.target.closest('.WeatherWrapper');
  if (weatherWrapper && weatherList.childElementCount === 1) {
    const latitude = weatherWrapper.dataset.latitude; // отримуємо широту
    const longitude = weatherWrapper.dataset.longitude; // отримуємо довготу
    await showWeatherDetailsInModal(latitude, longitude);
    modal.style.display = 'block';
    mapElement.style.zIndex = -1; // зміна змінної на -1
  }
});

// Закриття модального вікна при натисканні на хрестик
if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    mapElement.style.zIndex = 0; // зміна змінної на 0
  });
}

// Закриття модального вікна при натисканні поза його межами
window.addEventListener('click', event => {
  if (event.target === modal) {
    modal.style.display = 'none';
    mapElement.style.zIndex = 0; // зміна змінної на 0
  }
});

// Закриття модального вікна при натисканні клавіші "Escape"
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.style.display === 'block') {
    modal.style.display = 'none';
    mapElement.style.zIndex = 0; // зміна змінної на 0
  }
});
// функція для відображення годинного прогнозу в модальному вікні:
const displayHourlyForecast = hourlyWeather => {
  let hourlyForecastHtml = '';

  hourlyWeather.forEach(hour => {
    const timestamp = new Date(hour.dt * 1000);
    const hours = timestamp.getHours();
    const temperature = Math.round(hour.temp) + '°C';

    hourlyForecastHtml += `
      <div class="hourly-forecast-item">
        <p>${hours}:00</p>
        <p>Температура: ${temperature}</p>
      </div>
    `;
  });

  return hourlyForecastHtml;
};
//Відображення карти додавання слухача подій
const mapShow = document.getElementById('map');

weatherList.addEventListener('click', () => {
  mapShow.style.zIndex = -1;
});

window.addEventListener('click', event => {
  if (event.target === weatherList) {
    mapShow.style.zIndex = '';
  }
});
