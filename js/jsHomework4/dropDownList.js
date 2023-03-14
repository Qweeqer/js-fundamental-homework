var citiesByCountry = {
  ger: ['Berlin', 'Munich', 'Frankfurt'],
  usa: ['New York', 'Los Angeles', 'Chicago'],
  ukr: ['Kyiv', 'Kharkiv', 'Lviv'],
};

var countryList = document.getElementById('country');
var cityList = document.getElementById('cities');
var selectedCountry = document.getElementById('selectedCountry');
var selectedCity = document.getElementById('selectedCity');

function updateCityList() {
  var selectedCountryValue = countryList.value;

  while (cityList.options.length) {
    cityList.remove(0);
  }

  var cities = citiesByCountry[selectedCountryValue];
  if (!cities) {
    return;
  }

  cities.forEach(function (city) {
    var option = new Option(city, city);
    cityList.add(option);
  });
}

countryList.addEventListener('change', function () {
  selectedCountry.textContent =
    'Обрано країну: ' + countryList.options[countryList.selectedIndex].text;
  updateCityList();
});

cityList.addEventListener('change', function () {
  selectedCity.textContent = 'Обрано місто: ' + cityList.options[cityList.selectedIndex].text;
});

updateCityList();
