//test for queryURL  api.openweathermap.org/data/2.5/weather?q=chicago&appid=9a44300c45b75aea6daff91cc878fd61

$(document).ready(function() {
    var search = $(".search");
    var listHistory = $(".list-group");
    var today = $("#today");
    var forecast = $("#forecast");
    var cityInput = $("#search-value");    
    var citySearch = "";
    var cityArray = [];

    //init();
    
    search.on("submit",startSearch);

    function startSearch(event) {    
        event.preventDefault();
        citySearch = $("#search-value").val().trim();
        if (citySearch === "") {
    		return;
      	} else today.empty();

        cityArray = [];

        var apiKey = "9a44300c45b75aea6daff91cc878fd61";
        var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;

    //    cityArray.push(citySearch);
    //    console.log(cityArray);
    //    cityInput = "";

            $.ajax({
                method: "GET",
                url: todayURL
            }).then(function(response) {
                console.log(response);  
                
        /*            if (cityArray.includes(citySearch) == "false") {
                        cityArray.push(citySearch);
                            console.log(cityArray);
                    }       */
                          
                cityArray.splice(0,0,citySearch);
                console.log(cityArray);
                ///////////////////////////////////////////////////////////////////////////
                cityInput.empty();

            var cityTodayHeadline = $("<h2>")
                .text(citySearch + " (" + (moment().format('dddd, MMMM Do YYYY')) + ")");
            var weatherType = response.weather[0].main;
            console.log(weatherType);
            weatherType = $("<img>")    
            var currentTime = $("<h4>") 
                .text(moment().format('h:mm a')); 
            var currentTemp = $("<p>").text("Temperature: " + Math.round(tempConvertKelvinToFahrenheit(response.main.temp)) + " degrees F");   
                // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
                // converts to Celsius and then Fahrenheit
                function tempConvertKelvinToFahrenheit(kelvin) {
                    return ((kelvin - 273.15) * 9/5) + 32;
                }    
            var todayHighTemp = $("<p>").text("High: " + Math.round(tempConvertKelvinToFahrenheit(response.main.temp_max)) + " degrees F").addClass("class","tempdetail");   
            var todayLowTemp = $("<p>").text("Low: " + Math.round(tempConvertKelvinToFahrenheit(response.main.temp_min)) + " degrees F").addClass("class","tempdetail");       

            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windspeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH");
            //UV index    

            today.append(cityTodayHeadline,currentTime,currentTemp,todayHighTemp,todayLowTemp,humidity,windspeed);

        });
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + apiKey;

            //    cityArray.push(citySearch);
            //    console.log(cityArray);
            //    cityInput = "";
        
                $.ajax({
                    method: "GET",
                    url: forecastURL
                }).then(function(response) {
                    console.log(response);

                    for (var j = 6; j < 40; j+8) {
                    var forecastDate = $("<h4>").text(response.list[j].dt_txt);    
                    var forecastTemp = $("<p>").text("Temperature: " + Math.round(tempConvertKelvinToFahrenheit(response.list[j].main.temp)) + " degrees F");   
                        // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
                        // converts to Celsius and then Fahrenheit
                    function tempConvertKelvinToFahrenheit(kelvin) {
                        return ((kelvin - 273.15) * 9/5) + 32;
                    }    
                    var forecastHumidity = $("<p>").text("Humidity: " + response.list[j].main.humidity + "%");        

                    forecast.append(forecastDate,forecastTemp,forecastHumidity);

                    }

                });    

                

        renderList();
        storeCities();
    };

    function renderList(){

        listHistory.innerHTML = "";
                        
        for (var i = 0; i < cityArray.length; i++) { 
            var city = cityArray[i];           
            var li = $("<li>");
            li.text(city);
            listHistory.append(li);
        } 
    }

    function storeCities() {
        // Stringify and set "todos" key in localStorage to todos array
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }

    function init() {
        // Get stored todos from localStorage
        // Parsing the JSON string to an object
        var storedCities = JSON.parse(localStorage.getItem("cityArray"));
    
        // If todos were retrieved from localStorage, update the todos array to it
        if (storedCities !== null) {
        cityArray = storedCities;
        }
    }
    init();              
    renderList();
});    