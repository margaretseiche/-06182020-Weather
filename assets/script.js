//test for queryURL  api.openweathermap.org/data/2.5/weather?q=chicago&appid=9a44300c45b75aea6daff91cc878fd61

$(document).ready(function() {
    var body = $("#body");
    var search = $(".search");
    var listHistory = $(".list-group");
    var today = $("#today");
    var forecast = $("#forecast");
    var cityInput = $("#search-value");    
    var citySearch = "";  //set as empty string here so that whole script can access citySearch
    var cityArray = [];   //set as empty array here so that whole script can access cityArray

    init();

    function renderList() {
        listHistory.innerHTML = "";
                        
        for (var i = 0; i < cityArray.length; i++) { 
            var city = cityArray[i];           
            var li = $("<li>");
            li.text(city);
            li.attr("data-index", i);

            var button = document.createElement("button");
            button.textContent = "Remove from list";
        
            li.append(button);
            listHistory.append(li);
        } 
    }

    function init() {
        // Get stored todos from localStorage
        // Parse the JSON string to an object
        var storedCities = JSON.parse(localStorage.getItem("cityArray"));
        var storedLastSearch = JSON.parse(localStorage.getItem("citySearch"));
    
        // If todos were retrieved from localStorage, update the todos array to it
        if (storedCities !== null) {
        cityArray = storedCities;
        }
        if (storedLastSearch !== null) {
            citySearch = storedLastSearch;
        }
        renderList();
        startSearch();
    }

    function storeSearchHistory() {
        // Stringify and set "todos" key in localStorage to todos array
        localStorage.setItem("cityArray", JSON.stringify(cityArray));
    }

    search.on("submit",setArray);
    search.on("submit",startSearch);

    function setArray(event) {    
        event.preventDefault();
        citySearch = $("#search-value").val().trim();
        if (citySearch === "") {
    		return;
      	}

        cityArray.push(citySearch);
        console.log(cityArray);
        cityInput = "";

        //cityArray.splice(0,0,citySearch);
        //console.log(cityArray);
        ///////////////////////////////////////////////////////////////////////////
        //cityInput.empty();

        renderList();
        storeSearchHistory();
    }      
   
    function startSearch() {
        $("#today").empty();
        $("#forecast").empty();
        
        citySearch = $("#search-value").val().trim();

        var apiKey = "9a44300c45b75aea6daff91cc878fd61";
        var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial" + "&appid=" + apiKey;

            $.ajax({
                method: "GET",
                url: todayURL
            }).then(function(response) {
                console.log(response);   

            var cityTodayHeadline = $("<h2>").text(citySearch + " (" + (moment().format('dddd, MMMM Do YYYY')) + ")");
            var weatherType = response.weather[0].main;
            console.log(weatherType);
            weatherType = $("<img>");    
            var currentTime = $("<h4>").text(moment().format('h:mm a')); 
            var currentTemp = $("<p>").text("Temperature: " + Math.round((response.main.temp)) + " degrees F");   
            var todayHighTemp = $("<p>").text("High: " + Math.round((response.main.temp_max)) + " degrees F").addClass("class","tempdetail");   
            var todayLowTemp = $("<p>").text("Low: " + Math.round((response.main.temp_min)) + " degrees F").addClass("class","tempdetail");       
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windspeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH");
            //UV index   

            today.append(cityTodayHeadline,currentTime,currentTemp,todayHighTemp,todayLowTemp,humidity,windspeed);

        });
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial" + "&appid=" + apiKey;
        
                $.ajax({
                    method: "GET",
                    url: forecastURL
                }).then(function(response) {
                    console.log(response);

                    for (var j = 6; j < 40; j+8) {
                    var forecastDate = $("<h4>").text(response.list[j].dt_txt);    
                    var forecastTemp = $("<p>").text("Temperature: " + Math.round(response.list[j].main.temp) + " degrees F");   
                    var forecastHumidity = $("<p>").text("Humidity: " + response.list[j].main.humidity + "%");        

                    forecast.append(forecastDate,forecastTemp,forecastHumidity);
                    }
                });    
    }

    // When a element inside of the city search history is clicked...
    $(".list-group").on("click", function(event) {
        var element = event.target;
    
        // If that element is a button...
        if (element.matches("button") === true) {
        // Get its data-index value and remove that city from the list
        var index = element.parentElement.getAttribute("data-index");
        cityArray.splice(index, 1);
    
        // Store updated todos in localStorage, re-render the list
        storeSearchHistory();
        renderList();
        }
    });

  body.unload(function storeLastSearch() {
    localStorage.setItem("citySearch", JSON.stringify(citySearch));   
  });
}); 