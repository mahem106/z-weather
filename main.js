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
  console.log(city, country, zipCode, units);
  searchCities(city, country, zipCode, units);

}

function searchCities(a, b, c, d) {
  var city = 'q=' + a;
  var country = ',' + b;
  var zip = '&zip=' + c;
  var units = '&units=' + d;
  console.log(city, country, zipCode, units);
  $.ajax({
    method: 'GET',
    url: 'http://api.openweathermap.org/data/2.5/find?' + city + country + zip + units + '&APPID=48bfdad1557309316103e40e659956ac',
    success: function(data) {
      console.log('succes: ', data);

    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}
