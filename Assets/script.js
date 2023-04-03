
var APIKey = "4bb3d6e851c881345956032e1b574e1a"
// console.log(city)
var fetchButton = $("#fetch-button")
var temperatureInfo = $("#temperatureInfo")
var fiveDayForecast = $("#fiveDayForecast")
var titleForecast = $("#title-forecast")
var city = "Athens"

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
        temperature.text("Temp.: " + data.list[i].main.temp + " F")
        wind.text("Wind: " + data.list[i].wind.speed + " MPH")
        humidity.text("Humidity: " + data.list[i].main.humidity + "%")

        // append dynamically generated html to the screen
        temperatureInfo.append(cityName)
        temperatureInfo.append(temperature)
        temperatureInfo.append(wind)
        temperatureInfo.append(humidity)

      
        // Weather icons
        var iconTop = $("<p>")
        var icon = data.list[i].weather[0].icon
        var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
        var imgIdTop = $("<img>").addClass("img-fluid").attr("src", iconUrl);
        iconTop.append(imgIdTop)
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
    fiveDayText.attr("class", "")


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
            // var imgId = $("#imgId")
            var icon = data.list[i].weather[0].icon
            var iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";
            var imgId = $("<img>").addClass("img-fluid").attr("src", iconUrl);
            // $("#imgId").attr("src", iconUrl);
            iconForecast.append(imgId)
            
            var forecastCard = $("<div>").addClass("cardStyle")
            fiveDayForecast.attr("class", "d-flex align-items-end mb-3")
            
            // add text content to them
            dateTemp.text(data.list[i].dt_txt)
            // actually I want the date, not city
            temperature.text("Temp.: " + data.list[i].main.temp + " F")
            wind.text("Wind: " + data.list[i].wind.speed + " MPH")
            humidity.text("Humidity: " + data.list[i].main.humidity + "%")
            // icon.text(data.list[i].weather[0].icon)
            
            // append dynamically generated html to the screen
            forecastCard.append(dateTemp, iconForecast, temperature, wind, humidity)
            fiveDayForecast.append(forecastCard)

            forecastCard.attr("class", "pt-0 me-2 ms-2")

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

  searchHistory.on("click", function(event){
    event.preventDefault();

    //  Clear content when button is pressed again
    temperatureInfo.html(" ");
    fiveDayForecast.html(" ");
    titleForecast.html(" ");
  
    
    console.log(event.target.innerHTML);
    var searchHistory = event.target.innerHTML;

    // var searchHistory = $(this).html();
    // console.log(searchHistory)
    // console.log("hello")

    getApi(searchHistory);
    forecast(searchHistory);
    })

  searchHistoryDiv.append(searchHistory)
  console.log(searchHistory)
  searchHistory.attr("class", "col-8")
  // copied logic from retrieve cities function, removed calling it in here
  // to fix the repetition of buttons 
  // at the end of the button's event listener function we need to append the newly searched city to the search history element
  // When the user clicks the search button, currently the retrieveCities function is invoked at the bottom
  // The issue with this is that retrieveCities is currently being used to populate the search history with the local storage data
  // However, we do not want that to happen every single time you click the search button, you only want it to happen on page load
  // There is no need to do it after page load, because that will cause duplicates



});

function retrieveCities() {

  var localStorageCitiesArr = JSON.parse(localStorage.getItem("citiesArr")) || []; 

  // localStorageCitiesArr.forEach(function(city) {
    // for each was multiplying the buttons, so I created the for loop instead
    var searchHistoryDiv = $("#searchHistory")
    for (var i=0; i<localStorageCitiesArr.length; i++){
      var searchHistory = $("<button>")
      searchHistory.text(localStorageCitiesArr[i])
      searchHistoryDiv.append(searchHistory)
      searchHistory.attr("class", "col-8")

      searchHistory.on("click", function(event){
        event.preventDefault();
    
        //  Clear content when button is pressed again
        temperatureInfo.html(" ");
        fiveDayForecast.html(" ");
        titleForecast.html(" ");
      
        
        console.log(event.target.innerHTML);
        var searchHistory = event.target.innerHTML;

        // var searchHistory = $(this).html();
        // console.log(searchHistory)
        // console.log("hello")
    
        getApi(searchHistory);
        forecast(searchHistory);
        })

    }

    console.log(searchHistory)

};

retrieveCities();
getApi(city);
forecast(city);

// TODO and check why I need to reload for history to be clicked



// logic with the forEach looks good on page initialization. So it creates all the buttons, hence why it looks correct when we refresh.


// but if we remove the for each for the function logic, and just access the last index of the array using [array.length -1] we can use the function I posted to add in order.