var APIKey = "ad20e5505f6378a3c47c258d40adaadd";
var cityEl = $('#city-search');
var searchHistoryArr = [];

// Adds event listener for click on search button
$( function() {
    $(".widget input[type=submit]").button();
    $("input[type=submit]").on("click", function(event) {
      event.preventDefault();
 
      searchHandler();
      document.getElementById('city-search').value = ""; 
    });
  });

// Adds event listener for click on Clear History button
$('#clear-history').on("click", function() {
  clearHistory();
});

// If there is user input in city search field, calls getCityForcast, returns alert otherwise
var searchHandler = function (city) {
  var city = cityEl.val().trim();
  if (city) {
    currentWeather(city);
    getCityForecast(city);

  } else {
    alert('Please enter a City');
  }
};

var currentWeather = function (city) {
  var currentURL =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
  fetch(currentURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
        .then(function (data) {
          console.log(data);
          displayCurrentWeather(data);
        });
      };
    });
};

// Calls OpenWeather API, returns data as JSON, updates search history array with new search term
// Saves search to local storage, displays previous searches
// If API response is not ok, returns alert with error message 
var getCityForecast = function (city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
        .then(function (data) {
          console.log(data);
          searchHistoryArr.push(city);
    
          saveSearches();
          displaySearches();
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

// Saves search history array to local storage
function saveSearches() {
  localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
};

// Gets updated search history array from local storage
function getSearches() {
  var update = JSON.parse(localStorage.getItem("searchHistoryArr"));

  if (update) {
    searchHistoryArr = update;
  };
};

// Clears buttons from viewport, displays updated search history for each search performed
function displaySearches() {
  var searchHistory = document.querySelector('#searches');
  searchHistory.innerHTML = "";
  getSearches();

// Creates/appends new button for each search performed, converts user input to capitalized word(s)
  for (var i = 0; i < searchHistoryArr.length; i++) {
    var buttonEl = document.createElement('button');
    buttonEl.classList = 'btn btn-dark col-12 m-2';
    buttonEl.textContent = searchHistoryArr[i][0].toUpperCase() + searchHistoryArr[i].substr(1);

    searchHistory.append(buttonEl);
  };
};

displaySearches();

// Clears search history array and local storage
function clearHistory() {
  var previousSearches = document.querySelector('#searches');
  previousSearches.innerHTML = "";
  searchHistoryArr = [];
  localStorage.clear();
};


// Adds API data for user search to main display fields
function displayCurrentWeather (data) {

  var date = dayjs.unix(data.dt).format("MM/DD/YYYY");
  var cityName = document.getElementById('city-name');
  cityName.textContent = data.name.concat(` ${date}`);

  var temp = document.getElementById("temp");
  temp.textContent = `Temp: ${data.main.temp} °F`;

  var wind = document.getElementById('wind');
  wind.textContent = `Wind: ${data.wind.speed} MPH`;

  var humidity = document.getElementById('humidity');
  humidity.textContent = `Humidity: ${data.main.humidity} %`;

  var icon = data.weather[0].icon;
  var displayIcon = document.createElement("img");
  displayIcon.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
  displayIcon.setAttribute("height", "40px")
  displayIcon.setAttribute("width", "40px")
  cityName.append(displayIcon)
}



