var APIKey = "ad20e5505f6378a3c47c258d40adaadd";
var cityEl = $('#city-search');
var searchHistoryArr = [];

$(function () {
  getSearches();


// Adds event listener for click on search button
$( function() {
    $(".widget input[type=submit]").button();
    $("input[type=submit]").on("click", function(event) {
      event.preventDefault();
      saveSearches();
      searchHandler();
    });
  });
});

var searchHandler = function (city) {
  var city = cityEl.val().trim();
  if (city) {
    getCityForecast(city);

  } else {
    alert('Please enter a City');
  }
};

var getCityForecast = function (city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=6&appid=" + APIKey;
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json()
        .then(function (data) {
          console.log(data);
          searchHistoryArr.push(data.list);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};

function saveSearches() {
  localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
};

function getSearches() {
  var update = JSON.parse(localStorage.getItem("searchHistoryArr"));

  if (update) {
    searchHistoryArr = update;
  };
};