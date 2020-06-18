$(document).ready(function() {   
    var search = $(".search");
    var listHistory = $(".list-group");
    var today = $("#today");
    var forecast = $("#forecast");
    var cityInput = $("#search-value");    
    var citySearch = "";  //set as empty string here so that whole script can access citySearch
    var cityArray = [];   //set as empty array here so that whole script can access cityArray

    init();

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

    function renderList() {
        listHistory.empty(); 

        for (var i = 0; i < cityArray.length; i++) { 
            var city = cityArray[i];           
            var li = $("<li>").text(city).attr("data-index", i).appendTo(listHistory);
            var button = $("<button>").text("Remove").addClass("history-button").appendTo(li);
        } 
    }

    search.on("submit",setArray);
    //search.on("submit",startSearch);

    function setArray(event) {    
        event.preventDefault();
        citySearch = $("#search-value").val().trim();
        if (citySearch === "") {
    		return;
        }
        citySearch = citySearch.toLowerCase();
                 
        var arr = citySearch.split(" ");    //splits the string at the spaces to group into separate words
        newArr = [];
        
        for (var k = 0; k < arr.length;k++) {
            var ele = arr[k].split("");
            ele[0] = ele[0].toUpperCase();
            newArr.push(ele.join(""));
        }
        var cityString = newArr.join(" ");
        citySearch = cityString;  
        
        for (var j = 0; j <cityArray.length; j++){
            if ((cityArray.includes(citySearch) == "false")){
                pastElements.push(citySearch);
            } 
        }     

        renderList();
        storeSearchHistory();
        startSearch();
    }      
   
    function startSearch() {
        $("#today").empty();
        $("#forecast").empty();

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

        //    var iconArray = []  
        //    var weatherIcon = $("<img>").attr("src",);   

            var currentTime = $("<h4>").text(moment().format('h:mm a')); 
            var currentTemp = $("<p>").text("Temperature: " + Math.round((response.main.temp)) + " degrees F");   
            var todayHighTemp = $("<p>").text("High: " + Math.round((response.main.temp_max)) + " degrees F").addClass("class","tempdetail");   
            var todayLowTemp = $("<p>").text("Low: " + Math.round((response.main.temp_min)) + " degrees F").addClass("class","tempdetail");       
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windspeed = $("<p>").text("Wind Speed: " + response.wind.speed + "MPH");  
            
            today.append(cityTodayHeadline,currentTime,currentTemp,todayHighTemp,todayLowTemp,humidity,windspeed);
        });

                /*    var uvIndexURL = "https://api.openweathermap.org/data/2.5/uvi?q=" + "lat=37.75&lon=-122.37" + "&appid=" + apiKey;    
        
            $.ajax({
                method: "GET",
                url: uvIndexURL
            }).then(function(response) {
                console.log(response);     
        
            var uvIndex = "";   

              }); */ 
            var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial" + "&appid=" + apiKey;
        
                $.ajax({
                    method: "GET",
                    url: forecastURL
                }).then(function(response) {
                    console.log(response);

                    var cityForecastHeadline = $("<h2>").text("5-Day Forecast").appendTo(forecast);

                    for (var j = 5; j < 40; j+=8) {

                        if (response.list[j].dt_txt[5] === "0") {
                            var forecastMonth = response.list[j].dt_txt[6];
                        } else {
                            var forecastMonth = response.list[j].dt_txt[5] + response.list[j].dt_txt[6]; 
                        }
                        if (response.list[j].dt_txt[8] === "0") {
                            var forecastDay = response.list[j].dt_txt[9];
                        } else {
                            var forecastDay = response.list[j].dt_txt[8] + response.list[j].dt_txt[9]; 
                        }
                        var forecastYear = response.list[j].dt_txt[0] + response.list[j].dt_txt[1] + response.list[j].dt_txt[2] + response.list[j].dt_txt[3];   
                        var forecastDateText = $("<p id='forecastDate'>").text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
                        var forecastTemp = $("<p>").text("Temperature: " + Math.round(response.list[j].main.temp) + " degrees F");   
                        var forecastHumidity = $("<p>").text("Humidity: " + response.list[j].main.humidity + "%");        

                        var card = $("<div class='col-sm-2 card-body card'>").appendTo(forecast);

                        card.append(forecastDateText,forecastTemp,forecastHumidity);
                    }
                });  
               localStorage.setItem("citySearch", JSON.stringify(citySearch));  
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
}); 