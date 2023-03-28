export const clearWeather = () => {
  const weatherContainer = document.querySelector('.weather-container');
  if (weatherContainer) {
    weatherContainer.innerHTML = '';
  }
};
// **********************************************************
