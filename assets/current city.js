var currentCityLocationURL = "http://api.ipstack.com/67.247.17.222?access_key=a8b0780a1adf42e5ae25e26e6b2bafc8";

$.ajax({
    method: "GET",
    url: queryURL
}).then(function(response) {
    console.log(response); 

var currentCity = response.city;  

var apiKey = "9a44300c45b75aea6daff91cc878fd61";   //FOR WEATHER API 
var currentCityWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + apiKey;
console.log(currentCityURL);

$.ajax({
    method: "GET",
    url: queryURL
}).then(function(response) {
    console.log(response); 
