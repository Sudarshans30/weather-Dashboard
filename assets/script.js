document.addEventListener("DOMContentLoaded", function(){
    var form = document.querySelector("form");
    var input = document.querySelector("#search-city");
    var temperature = document.querySelector("#temperature");
    var humidity = document.querySelector("#humidity");
    var wind = document.querySelector("#wind");
    var forecastContainer = document.querySelector("#future-forecast");
    var storedCities = document.querySelector("#stored-cities");

    // adding an eventlistener to submit the form
     form.addEventListener("submit", (event)=> {
        event.preventDefault();
        getWeatherData(input.value);
    
    });

    function getWeatherData(city){
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=8ca46e9bee5fb8b777ad2e42aa6edd75`)
        .then((response) => response.json())
        .then((data) => {
            temperature.textContent = `Temperature:${data.list[0].main.temperature}°F`;
            humidity.textContent = `Humidity: ${data.list[0].main.humidity}%`;
            wind.textContent = `wind: ${data.list[0].main.wind} m/hr`

            forecastContainer.innerHTML = "";

            // creating a card for next forecast by creating a for loop
            for (let i=0; i < data.list.length; i +=8){
                var day =
                `<div class= "col-sm-2 bg-primary forecast text-white ml-2 mb-3 p-2 mt-2 rounded">
                <p>${data.list[i].dt_txt}</p>
                <p><img src = "http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Weather icon"></p>
                <p>Temp: ${data.list[i].main.temp}°F </p>
                <p>Humidity: ${data.list[i].main.humidity}%</p>
                <p>Wind: ${data.list[i].wind.speed} m/hr <p>
                </div>`;

                forecastContainer.innerHTML += day;
                
            }

            // storing the city in loocal storage
            let searchedCities = localStorage.getItem("searchedCities");
            if (searchedCities === null) {
                searchedCities = [];
            
            } else {
                searchedCities = JSON.parse(searchedCities);
            }
            searchedCities.push(city);

            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
            storedCities.innerHTML = "";

            // displaying the stored cities in the containers

            for ( let i=0; i < searchedCities.length; i++) {
                var row = `<tr><td>${searchedCities[i]}</td></tr>`;
                storedCities.innerHTML += row;

            }
          })
          .catch((error) => {
            console.error("Error:",error);
          });
    }

});



