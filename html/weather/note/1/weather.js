import {
  apiKey,
  apiUrlWeather,
  apiUrlForecast,
  cityInput,
  weatherList,
  todayButton,
  threeDaysButton,
  sevenDaysButton,
} from './weatherVariables.js';
import './modalWeather.js';
import './themSwitch.js';
import { getWeatherData } from './getWeatherData.js';
import { clearWeather } from './clearWeather.js';
import {
  mapElement,
  currentMarker,
  initMap,
  addMarkerToMap,
  updateMapCenter,
  map,
  fetchCityByGeolocationAndUpdateMap,
  fetchCityByGeolocation,
} from './mapService.js';
// ********************************************************************************************
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
    // console.log('numDays', numDays);
    if (numDays === 1) {
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

