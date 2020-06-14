//test for queryURL  api.openweathermap.org/data/2.5/weather?q=chicago&appid=9a44300c45b75aea6daff91cc878fd61

$(document).ready(function() {
    var search = $(".search");
//    var searchButton = $("#search-button");

    var listHistory = $(".list-group history");
    var today = $("#today");
    var forecast = $("#forecast");
    var citySearch = "";
    var cityArray = [];

    search.on("submit",startSearch);

    function startSearch(event) {    
        event.preventDefault();
        citySearch = $("#search-value").val().trim();

        cityArray = [];

        var apiKey = "9a44300c45b75aea6daff91cc878fd61";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;
        console.log(queryURL);

            $.ajax({
                method: "GET",
                url: queryURL
            }).then(function(response) {
                console.log(response);                     
               /*     if (cityArray.includes(citySearch) == false) {
                        cityArray.push(citySearch);
                    } else 
                        { alert("duplicate");
                    }            */
                 });
               cityArray.push(citySearch);
               console.log(cityArray);
        renderList();
    };

    function renderList(){
                        
        for (var i = 0; i < cityArray.length; i++) {             
            var li = $("<li>");
            li.text(citySearch);
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
    storeCities();    
    renderList();
});    