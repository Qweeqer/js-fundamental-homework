import { apiKey, weatherList } from './weatherVariables.js';
import { mapElement } from './mapService.js';
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
  if (window.location.href.includes('profile.html')) {
    const weatherWrapper = event.target.closest('.WeatherWrapper');
    if (weatherWrapper && weatherList.childElementCount === 1) {
      const latitude = weatherWrapper.dataset.latitude; // отримуємо широту
      const longitude = weatherWrapper.dataset.longitude; // отримуємо довготу
      await showWeatherDetailsInModal(latitude, longitude);
      modal.style.display = 'block';
      mapElement.style.zIndex = -1; // зміна змінної на -1
    }
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
