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
      	}

        cityArray = [];

        var apiKey = "9a44300c45b75aea6daff91cc878fd61";
        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + apiKey;

    //    cityArray.push(citySearch);
    //    console.log(cityArray);
        cityInput = "";

            $.ajax({
                method: "GET",
                url: queryURL
            }).then(function(response) {
                console.log(response);                     
                    if (cityArray.includes(citySearch) == "false") {
                        cityArray.push(citySearch);
                            console.log(cityArray);
                    } else 
                        { alert("duplicate");
                    }            
                 });
        //       cityArray.splice(0,0,citySearch);
        //       cityInput.val() = "";

        renderList();
        //storeCities();
        //init();
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

/*    function storeCities() {
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
        
    storeCities();          */
    renderList();
});    