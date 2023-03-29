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
var fiveDayForecast = $("#fiveDayForecast")
var titleForecast = $("#title-forecast")




function displayTime(){
  var today = dayjs();
  var dateTimeNav= $("#nav").text(today.format("dddd, MMMM D YYYY, h:mm:ss a")) 

}
setInterval(displayTime, 1000);

function getApi(city){
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";

  var today = dayjs().format("MMM D, YYYY")

  fetch (requestUrl)
    .then(function (response){
      return response.json();
    })
    .then (function(data){
      console.log(data);

    for (var i=3; i<data.list.length-36; i++) {
      // 9am -every 3 hours 
        // create my elements
        var cityName = $("<h3>");
        var temperature = $("<p>")
        var wind = $("<p>")
        var humidity = $("<p>")

        // add text content to them
        cityName.text(city + " (" + today + ")")
        temperature.text("Temperature: " + data.list[i].main.temp + " F")
        wind.text("Wind: " + data.list[i].wind.speed + " MPH")
        humidity.text("Humidity: " + data.list[i].main.humidity + "%")

        // append dynamically generated html to the screen
        temperatureInfo.append(cityName)
        temperatureInfo.append(temperature)
        temperatureInfo.append(wind)
        temperatureInfo.append(humidity)

        var temperatureInt = parseInt(temperature);
        if (temperatureInt > 70 ) {
          $("<div>").addClass("logo-image")
          $("<img>").addClass("img.fluid")
          
        }

        // Weather icons
        // var iconOnScreen = $("<p>")
        var imgIdTop = $("#imgIdTop")
        var icon = data.list[i].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        $('#imgIdTop').attr('src', iconUrl);
        cityName.append(imgIdTop)
            

          
            console.log(iconUrl)

      }
      
    })

  }

  function forecast(city){

    var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey + "&units=imperial";
    
    var fiveDayText = $("<h3>")

    fiveDayText.text("5-Day Forecast")
    // fiveDayForecast.attr("class", "align-text-end")
    titleForecast.append(fiveDayText)
    // fiveDayText.attr("class", "display-block")


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
            var dateTemp = $("<h4>");
            var temperature = $("<p>")
            var wind = $("<p>")
            var humidity = $("<p>")
          

            // Weather Icons
            var iconWeather = $("#iconWeather")
            var imgId = $("#imgId")

            var icon = data.list[i].weather[0].icon
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            $("#imgId").attr("src", iconUrl);


            var forecastCard = $("<div>").addClass("cardStyle")
            fiveDayForecast.attr("class", "d-flex justify-content-evenly align-items-end text-white")
            
            // add text content to them
            dateTemp.text(data.list[i].dt_txt)
            // actually I want the date, not city
            temperature.text("Temperature: " + data.list[i].main.temp + " F")
            wind.text("Wind: " + data.list[i].wind.speed + " MPH")
            humidity.text("Humidity: " + data.list[i].main.humidity + "%")
            // icon.text(data.list[i].weather[0].icon)
            
            // append dynamically generated html to the screen
            forecastCard.append(dateTemp, temperature, wind, humidity, icon, iconWeather)
            fiveDayForecast.append(forecastCard)

            forecastCard.attr("class", "bg-primary p-2")
          }
        })
  

  }


fetchButton.on("click", function(event){
  event.preventDefault();
  
  // Clear content when button is pressed again
  temperatureInfo.html(" ");
  fiveDayForecast.html(" ");
  titleForecast.html(" ")
  

  var city = $("#city").val();
  getApi(city);
  forecast(city);

  var localStorageCitiesArr = JSON.parse(localStorage.getItem("citiesArr")) || []; 

  localStorageCitiesArr.push(city);

  localStorage.setItem("citiesArr", JSON.stringify(localStorageCitiesArr));

  retrieveCities();

});

function retrieveCities() {
  var localStorageCitiesArr = JSON.parse(localStorage.getItem("citiesArr")) || []; 

  localStorageCitiesArr.forEach(function(city) {
    console.log(city);
  });

};

retrieveCities();

// On click, save the city value on local storage
// create buttons that they can click
// event listener on those buttons that lead to the beginning of the other function
// as if the input was that city 


// local storage????
// icon not showing every day 


// https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys