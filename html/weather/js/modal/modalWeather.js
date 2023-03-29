import { apiKey, weatherList } from '../weather/weatherVariables.js';
import { mapElement, getCityName } from '../map/mapService.js';
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
  const hourlyWeather = data.hourly.slice(0, 12); // отримати перші 12 годин годинного прогнозу


  // Форматування даних
  const temperature = Math.round(currentWeather.temp) + '°C';
  const feelsLike = Math.round(currentWeather.feels_like) + '°C';
  const humidity = currentWeather.humidity + '%';
  const windSpeed = currentWeather.wind_speed + ' м/с';
  const uvi = currentWeather.uvi;
  const skyStatus = currentWeather.weather[0].description;
  //для отримання данних про місто та дату
  const cityName = await getCityName(latitude, longitude);
  const currentDate = new Date();
  const currentDateString = currentDate.toLocaleDateString();
  const currentTimeString = currentDate.toLocaleTimeString();
  //Для додавання часу сходу та заходу сонця
  const sunriseTimestamp = new Date(dailyWeather.sunrise * 1000);
  const sunriseHours = sunriseTimestamp.getHours();
  const sunriseMinutes = sunriseTimestamp.getMinutes().toString().padStart(2, '0');
  const sunsetTimestamp = new Date(dailyWeather.sunset * 1000);
  const sunsetHours = sunsetTimestamp.getHours();
  const sunsetMinutes = sunsetTimestamp.getMinutes().toString().padStart(2, '0');
  // виклик
  const hourlyForecastHtml = displayHourlyForecast(hourlyWeather);
  // Вставка даних в modalWeatherInfo
  modalWeatherInfo.innerHTML = `
  <h1><i class="wi wi-horizon-alt"></i>Прогноз погоди</h1>
  <div class='mainInfoHead'>
  <p>Місто: ${cityName}</p>
    <p>Дата: ${currentDateString}</p>
    <p>Час: ${currentTimeString}</p>
  </div>
    <p><i class="wi wi-thermometer"></i>  Температура: ${temperature}</p>
    <p>Відчувається як: ${feelsLike}</p>
    <p><i class="wi wi-humidity"></i>  Вологість: ${humidity}</p>
    <p><i class="wi wi-strong-wind"></i>  Швидкість вітру: ${windSpeed}</p>
    <p><i class="wi wi-hot"></i>  Індекс УФ-випромінювання: ${uvi}</p>
    <p><i class="wi wi-cloudy"></i>  Стан неба: ${skyStatus}</p>
    <p><i class="wi wi-horizon-alt"></i>  Схід сонця: ${sunriseHours}:${sunriseMinutes}</p>
    <p><i class="wi wi-horizon"></i>  Захід сонця: ${sunsetHours}:${sunsetMinutes}</p>
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
    const skyStatus = hour.weather[0].description;
    const precipitationProbability = (hour.pop * 100).toFixed(0) + '%';
    const pressure = hour.pressure + ' гПа';
    const visibility = hour.visibility / 1000 + ' км';

    hourlyForecastHtml += `
      <div class="hourly-forecast-item">
        <p>Час:<br>${hours}:00</p>
        <p>Температура:<br> ${temperature}</p>
        <p>Стан неба: <br> ${skyStatus}<i class="wi wi-cloudy"></i></p>
        <p>Ймовірність опадів:<br> ${precipitationProbability} <i class="wi wi-raindrops"></i></p>
        <p>Тиск:<br>${pressure} <i class="wi wi-barometer"></i></p>
        <p>Видимість: ${visibility} <i class="wi wi-fog"></i></p>

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
