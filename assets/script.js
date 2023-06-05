var APIKey = "ad20e5505f6378a3c47c258d40adaadd";
var cityEl = $('#city-search');
var searchHistoryArr = [];

// Adds event listener for click on search button
$( function() {
    $(".widget input[type=submit]").button();
    $("input[type=submit]").on("click", function(event) {
      event.preventDefault();
      searchHandler();
      getSearches();
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


function saveSearches() {
  localStorage.setItem("searchHistoryArr", JSON.stringify(searchHistoryArr));
};


function getSearches() {
  var update = JSON.parse(localStorage.getItem("searchHistoryArr"));

  if (update) {
    searchHistoryArr = update;
  };
};


function displaySearches() {
  var container = document.querySelector('#searches');
  container.innerHTML = "";

  for (var i = 0; i < searchHistoryArr.length; i++) {
    var buttonEL = document.createElement('button');
    buttonEL.classList = 'btn btn-dark col-12 m-2';
    buttonEL.textContent = searchHistoryArr[i].charAt(0).toUpperCase() + searchHistoryArr[i].slice(1);

    container.append(buttonEL);
  };
};