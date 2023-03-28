// ********Запит для обраного**************************
import { apiKey } from './weatherVariables.js';
export const getWeatherData = async city => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  const data = await response.json();
  return data;
};
// *******************END*********************************
