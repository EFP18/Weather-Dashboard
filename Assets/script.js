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
        var iconTop = $("<p>")
        var imgIdTop = $("#imgIdTop")
        var icon = data.list[i].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        $('#imgIdTop').attr('src', iconUrl);
        iconTop.text(imgIdTop)
        cityName.append(iconTop)
            

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
            var iconForecast = $("<p>")
            var imgId = $("#imgId")

            var icon = data.list[i].weather[0].icon
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            $("#imgId").attr("src", iconUrl);
            iconForecast.text(imgId)
            


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
            forecastCard.append(dateTemp, iconForecast, temperature, wind, humidity)
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

  var searchHistoryDiv = $("#searchHistory")
  var searchHistory = $("<button>")
  searchHistory.text(city)
  searchHistoryDiv.append(searchHistory)
  console.log(searchHistory)
  searchHistory.attr("class", "col-12")

  
});

function retrieveCities() {
  var localStorageCitiesArr = JSON.parse(localStorage.getItem("citiesArr")) || []; 

  // localStorageCitiesArr.forEach(function(city) {
    // for each was multiplying the buttons


    // var searchHistoryDiv = $("#searchHistory")
    // // for (var i=0; i<localStorageCitiesArr.length; i++){
    //   var searchHistory = $("<button>")
    //   // searchHistory.text(localStorageCitiesArr[i])
    //   searchHistoryDiv.append(searchHistory)
    // }

    
    // searchHistory.text(city)
    // searchHistory.text(localStorageCitiesArr[localStorageCitiesArr.length -1])
    // console.log(searchHistory)

  

    // searchHistory.on("click", function(event){
    // event.preventDefault();

    // //  // Clear content when button is pressed again
    // // temperatureInfo.html(" ");
    // // fiveDayForecast.html(" ");
    // // titleForecast.html(" ")
  
    // // var city = $("#city").val();

    // var searchHistory = $("#searchHistory").val();
    // console.log(searchHistory)
    // console.log("hello")

    // // getApi(searchHistory);
    // // forecast(searchHistory);
    // })
  // });
  
// getting button multiple times
// whats the value
  // }

};

retrieveCities();


// icon not showing every day 


// https://coding-boot-camp.github.io/full-stack/apis/how-to-use-api-keys


// Your logic with the forEach looks good on page initialization. So it creates all the buttons, hence why it looks correct when we refresh.

// but if we remove the for each for the function logic, and just access the last index of the array using [array.length -1] we can use the function I posted to add in order.