# -06182020-Weather

![Image of Weather Homework deployed](./assets/currentupload.jpg)

I started by pseudocoding.  Then I learned (the hard way over the past few weeks) to work step-by-step and commit to Github often.

To start, I put the $(document).ready(function(){}) so that Javascript would wait until everything loaded to start executing.

I referenced the search area, the target for the city list, target for 'today' display, target for 'forecast' dispaly, and the search input field. I also set citySearch and the city array to empty variables.

Then I ran the init() function (in case there was anything in local storage from previous searches).  This retrieves cityArray and the last searched city from local storage; then the respective functions are called.  

renderList() first empties anything previously displayed and then loops through cityArray to display the cities.

startSearch() uses the stored last search to display that city's weather.

When the search field is activated, setArray() is called.  If nothing was entered, then it exits the function.  Then it standardizes the spelling and if the city is not already in the array, it gets pushed in.  At that time, 3 functions are called:
    * renderList() - described above
    * startSearch()
    * storeSearchHistory() - lines 29-32 of JS file --- this puts the revised array into local storage

startSearch() has a few sections:
- First it empties the display (otherwise previous searches would keep appearing)
- I did not formally separate the functions because I was struggling to maintain access throughout for certain variables.  Ideally I would like to split them.
- Today --- The API url is set.  Then I call the API to retrieve the data.  I pulled out the components and displayed them in 'today'.  The icon and the UV index both required additional API calls using details from the first response; this was part of why they were clustered together, as I did not find a way to access the details from outside the function.
- Forecast --- This was similar.  The biggest difference is that the data came in 3 hour increments; originally, I used a loop to stop every 8th spot.  I planned to set an if statement similar to the day planner, to compare the current time to determine which index value to start on, so that I would always get 12:00 noon.  A classmate (someone that I had helped earlier with the 3 hour increment problem) suggested that I use an if statement with 'includes("12:00:00")' when looking through the time output in the response.  After console logging to see if it worked, that's what I used.  For the forecast dates, the date in the original object shows as a string.  There may be a more efficient way of manipulating the data, but in the interest of time (so that I could fix other problems), I stuck with parsing the string at each character and concatenating the date that way.  
- I also put the city in local storage as the last searched city, so that it could be called again and display the next time that the page loads.

The last section relates to the list history.  With an if/else, a user can remove a city from the list by clicking the 'remove' button and search/display a listed city by clicking the city name.

The final problem that I did not solve is removing the last search from the input box.  I tested this is several locations (and left the comments) but could not figure this out.  





