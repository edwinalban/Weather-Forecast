var APIKey = "ad20e5505f6378a3c47c258d40adaadd";
var cityEl = $('#city-search');


// Adds event listener for click on search button
$( function() {
  $( ".widget input[type=submit]" ).button();
  $( "input[type=submit]" ).on( "click", function( event ) {
    event.preventDefault();
    searchHandler();
  } );
} );

var searchHandler = function (city) {
  var city = cityEl.value;
  console.log(city);
  if (city) {
    getCity(city);

  } else {
    alert('Please enter a City');
  }
};

var getCity = function (city) {
  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  console.log(queryURL);
  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to OpenWeather');
    });
};