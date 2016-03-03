'use strict'

var favs;

$(function(init){
  loadFromLocalStorage();
  $('#submit').click(sendRequest);
  $('#favSubmit').click(addFavorite);
  $('#fav1').click(getFavorite1);
  $('#fav2').click(getFavorite2);
  $('#fav3').click(getFavorite3);
});

var cityName;
var units;
var latLong;

function sendRequest(event) {
  event.preventDefault();
  units = $('#unitInput').val();

  getWeather($('#searchCity').val(), $('#searchCountry').val(), $('#searchZip').val());
  $('#searchCity').val('');
  $('#searchCountry').val('');
  $('#searchZip').val('');

}

function loadFromLocalStorage() {
  if(localStorage.favs === undefined) {
    localStorage.favs = '[]';
  }
  favs = JSON.parse(localStorage.favs);
  if(favs[0] !== undefined) {
    $('.fav1').text(favs[0]);
    $('#fav1').removeClass('invisible');
  }
  if(favs[1] !== undefined) {
    $('.fav2').text(favs[1]);
    $('#fav2').removeClass('invisible');
  }
  if(favs[2] !== undefined) {
    $('.fav3').text(favs[2]);
    $('#fav3').removeClass('invisible');
  }
}

function saveToLocalStorage() {
  localStorage.favs = JSON.stringify(favs);
}

function addFavorite() {
  var newFav = cityName;
  if(favs.length === 3) {
    alert('Maximum of three (3) favorites, please remove one (1)');
  } else {
    favs.push(newFav);
    saveToLocalStorage();
    setFavorite();
    console.log(favs.length);
  }
}

function getWeather(a, b, c) {
  if(b !== ''){
  var b = ',' + b;
  console.log('a, b, c: ', a, b, c);
  }
  $.ajax({
    method: 'GET',
    url: 'http://api.wunderground.com/api/7b619ea43af98860/conditions/forecast/q/'+ a + b + c + '.json',
    success: function(response) {
      console.log('success', response);
      addWeatherInfo(response.current_observation);
      addForecastInfo(response.forecast.txt_forecast.forecastday);
      cityName = response.current_observation.display_location.full;
      var lat = response.current_observation.display_location.latitude;
      var long = response.current_observation.display_location.longitude;
      latLong = parseFloat(lat).toFixed(1) +','+ parseFloat(long).toFixed(1);
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function setFavorite() {
  if($('.fav1').text() == ''){
    $('.fav1').text(cityName);
    $('#fav1').removeClass('invisible');
  } else if($('.fav2').text() == ''){
    $('.fav2').text(cityName);
    $('#fav2').removeClass('invisible');
  } else if($('.fav3').text() == ''){
    $('.fav3').text(cityName);
    $('#fav3').removeClass('invisible');
  }
}

function getFavorite1() {
  var fav1 = $('#fav1').text();
  var newSearch = fav1.split(', ');
  getWeather(newSearch[0], newSearch[1], '');
}

function getFavorite2() {
  var fav2 = $('#fav2').val();
  var fav2 = $('#fav2').text();
  var newSearch = fav2.split(', ');
  getWeather(newSearch[0], newSearch[1], '');
}

function getFavorite3() {
  var fav3 = $('#fav3').val();
  var fav3 = $('#fav3').text();
  var newSearch = fav3.split(', ');
  getWeather(newSearch[0], newSearch[1], '');
}

function addWeatherInfo(data) {
  var $weather = $('#conditionsTemplate');
  var $loc = $('#titleTemplate');
  $('#wPanel').removeClass('invisible');
  if(units === 'metric') {
    $loc.find('#location').text(data.display_location.full);
    $weather.find('#tempurature').text(data.temp_c + ' °C');
    $weather.find('#precip').text(data.precip_today_metric + ' mm');
    $weather.find('#humidity').text(data.relative_humidity);
    $weather.find('#wind').text(data.wind_kph + ' KPH');
    $weather.find('#type').text(data.weather);
    $weather.find('#wIcon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
    });
  return $weather;
  } else if(units === 'imperial') {
    $loc.find('#location').text(data.display_location.full);
    $weather.find('#tempurature').text(data.temp_f + ' °F');
    $weather.find('#precip').text(data.precip_today_in + ' in');
    $weather.find('#humidity').text(data.relative_humidity);
    $weather.find('#wind').text(data.wind_mph + ' MPH');
    $weather.find('#type').text(data.weather);
    $weather.find('#wIcon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
    });
  return $weather;
  }
}
function addForecastInfo(data) {
  var $forecast = $('#forecastTemplate');
  $('#fPanel').removeClass('invisible');
  if(units === 'metric') {
    $forecast.find('#day1').text(data[2].title);
    $forecast.find('#day2').text(data[4].title);
    $forecast.find('#day3').text(data[6].title);
    $forecast.find('#day1Text').text(data[2].fcttext_metric);
    $forecast.find('#day2Text').text(data[4].fcttext_metric);
    $forecast.find('#day3Text').text(data[6].fcttext_metric);
    $forecast.find('#day1Icon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data[2].icon + '.gif';
    })
    $forecast.find('#day2Icon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data[4].icon + '.gif';
    })
    $forecast.find('#day3Icon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data[6].icon + '.gif';
    })
  return $forecast;
  } else if(units === 'imperial') {
    $forecast.find('#day1').text(data[2].title);
    $forecast.find('#day2').text(data[4].title);
    $forecast.find('#day3').text(data[6].title);
    $forecast.find('#day1Text').text(data[2].fcttext);
    $forecast.find('#day2Text').text(data[4].fcttext);
    $forecast.find('#day3Text').text(data[6].fcttext);
    $forecast.find('#day1Icon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data[2].icon + '.gif';
    })
    $forecast.find('#day2Icon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data[4].icon + '.gif';
    })
    $forecast.find('#day3Icon').attr('src', function() {
      return 'http://icons-ak.wxug.com/i/c/i/' + data[6].icon + '.gif';
    })
  return $forecast;
  }
}
