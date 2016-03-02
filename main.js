'use strict'

$(function(init){
  console.log('init');
  $('#submit').click(sendRequest);
});

var city;
var country;
var zipCode;
var units;

function sendRequest(event) {
  event.preventDefault();
  city = $('#searchCity').val();
  country = $('#searchCountry').val();
  zipCode = $('#searchZip').val();
  units = $('#unitInput').val();

  if(country.length > 2){
    alert('Please enter country code in two (2) character format!');
  } else {
  getCurrentWeather(city, country, zipCode, units);
  //getFiveDayForecast(city, country, zipCode, units);
  }
}

function getCurrentWeather(a, b, c, d) {
  var city = 'q=' + a;
  var country = ',' + b;
  var zip = '&zip=' + c;
  var units = '&units=' + d;
  console.log(city, country, zipCode, units);
  $.ajax({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/find?' + city + country + zip + units + '&APPID=48bfdad1557309316103e40e659956ac',
    success: function(data) {
      console.log('success: ', data.list);

    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function addWeatherInfo(data) {
      var $weather = $('#template').clone();

      $weather.find('#tempurature').text(data.main.main.temp);
      //$weather.find('#precip').text(data.rain.rain.3h);
      $weather.find('#humidity').text(data.main.main.humidity);
      $weather.find('#wind').text(data.wind.wind.speed)
      $weather.find('#wIcon').attr('href', function() {
        return 'http://openweathermap.org/img/w/' + data.weather.icon + '.png';
      })
      return $weather;
}
