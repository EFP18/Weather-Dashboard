// PSEUDO CODE

// EVENT LISTENER: 
// WHEN CLICK SEARCH --> PULL THE DATA FROM THE API
// THEN CREATE AN h3 WITH THE CITY AND DATE(USE DAYJS??)
// AND AT THE SAME TIME A 5DAY FORECAST

// LOCAL STORAGE
// WHEN THEY CLICK SEARCH, SAVE ON LOCAL STORAGE
// CREATE LIST OF 10 LAST CITIES SEARCHED BENEATH THE SEARCH FIELD 

var APIKey = "4bb3d6e851c881345956032e1b574e1a"
// console.log(city)
var fetchButton = $("#fetch-button")
var temperatureInfo = $("#temperatureInfo")
var fiveDayForecast = $("#5DayForecast")


function getApi(city){
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
  // var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=London,us&cnt=1&appid=4bb3d6e851c881345956032e1b574e1a&units=imperial';

  // var today = dayjs();
  // var currentDate = $("#temperatureInfo").text(today.format("MMM D, YYYY"))

  console.log(city)
  fetch (requestUrl)
    .then(function (response){
      return response.json();
    })
    .then (function(data){
      console.log(data);

    for (var i=3; i<data.list.length-36; i++) {
      console.log(data.list[i])
      // 9am -every 3 hours 
        // create my elements
        var cityName = $("<h3>");
        var temperature = $("<p>")
        var wind = $("<p>")
        var humidity = $("<p>")

        // add text content to them
        // cityName.text(city + " " + currentDate)
        cityName.text(city)
        temperature.text("Temperature: " + data.list[i].main.temp + " Fahrenheit")
        wind.text("Wind: " + data.list[i].wind.speed + " MPH")
        humidity.text("Humidity: " + data.list[i].main.humidity + "%")

        // append dynamically generated html to the screen
        temperatureInfo.append(cityName)
        temperatureInfo.append(temperature)
        temperatureInfo.append(wind)
        temperatureInfo.append(humidity)

      }

    })

  }

  function forecast(city){
    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    var fiveDayText = $("#5dayText");
    fiveDayText.text("5-Day Forecast")
    fiveDayText.attr("class", "display-block")

    console.log(city)
    fetch (requestUrl)
      .then(function (response){
        return response.json();
      })
      .then (function(data){
        console.log(data);
      
      for (var i=3; i<data.list.length; i+=8) {
        // since it's a 3-hour forecast, i=+8 is going to be 24 hours later if i=3
        console.log(data.list[i])
        // 9am -every 3 hours 
          // create my elements
          var cityName = $("<h4>");
          var temperature = $("<p>")
          var wind = $("<p>")
          var humidity = $("<p>")

          var forecastCard = $("<div>").addClass("cardStyle")
          fiveDayForecast.attr("class", "d-flex justify-content-evenly align-items-center")
          
          // add text content to them
          cityName.text(city)
          // actually I want the date, not city
          temperature.text("Temperature: " + data.list[i].main.temp + " Fahrenheit")
          wind.text("Wind: " + data.list[i].wind.speed + " MPH")
          humidity.text("Humidity: " + data.list[i].main.humidity + "%")
  
          // append dynamically generated html to the screen
          forecastCard.append(cityName,temperature, wind, humidity)
          fiveDayForecast.append(forecastCard)
  
        }
  
      })
  
    }

  // async function getApi() {
  //   var requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=London,us&cnt=1&appid=4bb3d6e851c881345956032e1b574e1a&units=imperial';
  //   var response = await fetch(requestUrl);
  //   var data = await response.json();
  //   console.log(data);
  // }


fetchButton.on("click", function(){
  var city = $("#city").val();
  getApi(city);
  forecast(city);
});



// https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys