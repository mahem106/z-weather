'use strict'

var favs;

$(function(init){
  loadFromLocalStorage();
  $('#submit').click(sendRequest);
  $('#favSubmit').click(addFavorite);
  $('#fav1').click(getFavorite1);
  $('#fav2').click(getFavorite2);
  $('#fav3').click(getFavorite3);
  $('#removefav1').click(remove1);
  $('#removefav2').click(remove2);
  $('#removefav3').click(remove3);
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


function remove1() {
  var favArray = JSON.parse(localStorage.favs);
  favArray.splice(0,1);
  console.log(favArray);
  $('#fav1').addClass('invisible');
  $('#fo1').addClass('invisible');
  $('#removefav1').addClass('invisible');
  localStorage.favs = JSON.stringify(favArray);
  console.log(localStorage.favs);
}

function remove2() {
  var favArray = JSON.parse(localStorage.favs);
  favArray.splice(1,1);
  console.log(favArray);
  $('#fav2').addClass('invisible');
  $('#fo2').addClass('invisible');
  $('#removefav2').addClass('invisible');
  localStorage.favs = JSON.stringify(favArray);
  console.log(localStorage.favs);
}

function remove3() {
  var favArray = JSON.parse(localStorage.favs);
  favArray.splice(2,1);
  console.log(favArray);
  $('#fav3').addClass('invisible');
  $('#fo3').addClass('invisible');
  $('#removefav3').addClass('invisible');
  localStorage.favs = JSON.stringify(favArray);
  console.log(localStorage.favs);
}

function loadFromLocalStorage() {
  if(localStorage.favs === undefined) {
    localStorage.favs = '[]';
  }
  favs = JSON.parse(localStorage.favs);
  if(favs[0] !== undefined) {
    $('.fav1').text(favs[0]);
    $('#fav1').removeClass('invisible');
    $('#removefav1').removeClass('invisible');
    $('#fo1').removeClass('invisible');
    var fav1 = $('#fav1').text();
    var newSearch1 = fav1.split(', ');
    units = $('#unitInput').val();
    showFavorite1(newSearch1[0], newSearch1[1]);
  }
  if(favs[1] !== undefined) {
    $('.fav2').text(favs[1]);
    $('#fav2').removeClass('invisible');
    $('#removefav2').removeClass('invisible');
    $('#fo2').removeClass('invisible');
    var fav2 = $('#fav2').text();
    var newSearch2 = fav2.split(', ');
    units = $('#unitInput').val();
    showFavorite2(newSearch2[0], newSearch2[1]);
  }
  if(favs[2] !== undefined) {
    $('.fav3').text(favs[2]);
    $('#fav3').removeClass('invisible');
    $('#removefav3').removeClass('invisible');
    $('#fo3').removeClass('invisible');
    var fav3 = $('#fav3').text();
    var newSearch3 = fav3.split(', ');
    units = $('#unitInput').val();
    showFavorite3(newSearch3[0], newSearch3[1]);
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
    var newSave1 = $('#f1Button').text().split(', ');
    console.log('newSave1: ', newSave1);
    var newSave2 = $('#f2Button').text().split(', ');
    console.log('newSave2: ', newSave2);
    var newSave3 = $('#f3Button').text().split(', ');
    console.log('newSave3: ', newSave3);
    showFavorite1(newSave1[0], newSave1[1]);
    showFavorite2(newSave2[0], newSave2[1]);
    showFavorite3(newSave3[0], newSave3[1]);
    console.log(favs.length);
  }
}

function getWeather(a, b, c) {
  if(b !== ''){
  var b = ',' + b;
  }
  $.ajax({
    method: 'GET',
    url: 'http://api.wunderground.com/api/7b619ea43af98860/conditions/forecast/q/'+ a + b + c + '.json',
    success: function(response) {
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
    $('#removefav1').removeClass('invisible');
    $('#fo1').removeClass('invisible');
  } else if($('.fav2').text() == ''){
    $('.fav2').text(cityName);
    $('#fav2').removeClass('invisible');
    $('#removefav2').removeClass('invisible');
    $('#fo2').removeClass('invisible');
  } else if($('.fav3').text() == ''){
    $('.fav3').text(cityName);
    $('#fav3').removeClass('invisible');
    $('#removefav3').removeClass('invisible');
    $('#fo3').removeClass('invisible');
  }
}

function getFavorite1() {
  var fav1 = $('#fav1').text();
  var newSearch = fav1.split(', ');
  units = $('#unitInput').val();
  getWeather(newSearch[0], newSearch[1], '');
  console.log('get 1');
}

function getFavorite2() {
  var fav2 = $('#fav2').text();
  var newSearch = fav2.split(', ');
  units = $('#unitInput').val();
  getWeather(newSearch[0], newSearch[1], '');
  console.log('get 2');
}

function getFavorite3() {
  var fav3 = $('#fav3').text();
  var newSearch = fav3.split(', ');
  units = $('#unitInput').val();
  getWeather(newSearch[0], newSearch[1], '');
  console.log('get 3');
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

function showFavorite1(y, z) {
  var data;
  var x = y +','+ z;
  $.ajax({
    method: 'GET',
    url: 'http://api.wunderground.com/api/7b619ea43af98860/conditions/q/' + x + '.json',
    success: function(response) {
      console.log('fav1', response);
      data = response.current_observation;
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
  setTimeout(function() {
    console.log('fav1 called', data);
    var $favs = $('#favsTemplate');
    $('#favsPanel').removeClass('invisible');
    if(units === 'metric') {
      $favs.find('#favorite1').text(data.display_location.full);
      $favs.find('#fav1Temp').text(data.temp_c + ' °C');
      $favs.find('#fav1Type').text(data.weather);
      $favs.find('#fav1Icon').attr('src', function() {
        return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
      });
    return $favs;
    } else if(units === 'imperial') {
      $favs.find('#favorite1').text(data.display_location.full);
      $favs.find('#fav1Temp').text(data.temp_f + ' °F');
      $favs.find('#fav1Type').text(data.weather);
      $favs.find('#fav1Icon').attr('src', function() {
        return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
      });
    return $favs;
    }
  }, 2000);
}

function showFavorite2(y, z) {
  var data;
  var x = y +','+ z;
  $.ajax({
    method: 'GET',
    url: 'http://api.wunderground.com/api/7b619ea43af98860/conditions/q/' + x + '.json',
    success: function(response) {
      console.log('fav2', response);
      data = response.current_observation;
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
  setTimeout(function() {
    console.log('fav2 called', data);
    var $favs = $('#favsTemplate');
    $('#favsPanel').removeClass('invisible');
    if(units === 'metric') {
      $favs.find('#favorite2').text(data.display_location.full);
      $favs.find('#fav2Temp').text(data.temp_c + ' °C');
      $favs.find('#fav2Type').text(data.weather);
      $favs.find('#fav2Icon').attr('src', function() {
        return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
      });
    return $favs;
    } else if(units === 'imperial') {
      $favs.find('#favorite2').text(data.display_location.full);
      $favs.find('#fav2Temp').text(data.temp_f + ' °F');
      $favs.find('#fav2Type').text(data.weather);
      $favs.find('#fav2Icon').attr('src', function() {
        return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
      });
    return $favs;
    }
  }, 2000);
}

function showFavorite3(y, z) {
  var data;
  var x = y +','+ z;
  $.ajax({
    method: 'GET',
    url: 'http://api.wunderground.com/api/7b619ea43af98860/conditions/q/' + x + '.json',
    success: function(response) {
      console.log('fav3', response);
      data = response.current_observation;
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
  setTimeout(function() {
    console.log('fav3 called', data);
    var $favs = $('#favsTemplate');
    $('#favsPanel').removeClass('invisible');
    if(units === 'metric') {
      $favs.find('#favorite3').text(data.display_location.full);
      $favs.find('#fav3Temp').text(data.temp_c + ' °C');
      $favs.find('#fav3Type').text(data.weather);
      $favs.find('#fav3Icon').attr('src', function() {
        return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
      });
    return $favs;
    } else if(units === 'imperial') {
      $favs.find('#favorite3').text(data.display_location.full);
      $favs.find('#fav3Temp').text(data.temp_f + ' °F');
      $favs.find('#fav3Type').text(data.weather);
      $favs.find('#fav3Icon').attr('src', function() {
        return 'http://icons-ak.wxug.com/i/c/i/' + data.icon + '.gif';
      });
    return $favs;
    }
  }, 2000);
}
