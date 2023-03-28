import { apiKey, cityInput } from './weatherVariables.js';
import { fetchWeatherData } from './weather.js';
// ****************2*******************************************************************
// ..
export const fetchCityByGeolocation = async (latitude, longitude) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
  );
  const data = await response.json();
  if (data.length > 0) {
    cityInput.value = data[0].name;
    updateMapCenter(map, latitude, longitude);
    addMarkerToMap(map, latitude, longitude);

    fetchWeatherData(1);
  }
};
// додавання інтерактивної карти з погодними умовами API карти openstreetmap.org
export const mapElement = document.getElementById('map');

// Ініціалізація карти з координатами та масштабом
export let currentMarker;
export const initMap = (latitude, longitude) => {
  const map = L.map('map').setView([latitude, longitude], 13);
  const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(map);

  addMarkerToMap(map, latitude, longitude);

  return map;
};

export const addMarkerToMap = (map, lat, lng) => {
  if (currentMarker) {
    currentMarker.remove();
  }
  currentMarker = L.marker([lat, lng]).addTo(map);
};

export const updateMapCenter = (map, latitude, longitude, zoom = 5) => {
  map.setView([latitude, longitude], zoom);
};

// Виклик initMap з поточними координатами та масштабом
export const map = initMap(50.450001, 30.523333, 5);

// Оновлення центру карти після вибору міста
export const fetchCityByGeolocationAndUpdateMap = async (
  latitude,
  longitude
) => {
  const response = await fetch(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
  );
  const data = await response.json();
  if (data.length > 0) {
    cityInput.value = data[0].name;
    updateCityName(data[0].name); // цей рядок для оновлення назви міста
    updateMapCenter(map, latitude, longitude);
    addMarkerToMap(map, latitude, longitude);
    fetchWeatherData(1);
  }
};
