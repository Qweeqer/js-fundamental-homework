// import { apiKey, cityInput } from './weatherVariables.js';
// import {
//   updateMapCenter,
//   addMarkerToMap,
//   initMap,
//   fetchCityByGeolocationAndUpdateMap,
// } from './mapService.js';
// // ..
// export const fetchCityByGeolocation = async (latitude, longitude) => {
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
