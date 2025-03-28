const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const cards = document.querySelector(".card");
const apiKey = "ab452ea7e1c046aa483463330cb72216";

weatherForm.addEventListener("submit", async event =>{
    event.preventDefault();
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherInfo(city);
            displayweatherInfo(weatherData);
        }catch(error){
            console.log(error);
            displayError(error);
        }
    }else{
        displayError("Please enter a city");
    }

});

async function getWeatherInfo(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("Could not fetch the weather data of the city");
    }
    return await response.json();
}

function displayweatherInfo(data){
const {name: city,
        main: {temp, humidity},
        weather: [{description, id}]} = data;
        cards.textContent = "";
        cards.style.display = "flex";
        
        const cityDisplay = document.createElement("h1");
        const tempDisplay = document.createElement("p");
        const WeatherEmoji = document.createElement("p");
        const descDisplay = document.createElement("p");
        const HumidityDisplay = document.createElement("p");

        cityDisplay.textContent = city;
        tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`;
        HumidityDisplay.textContent = `Humidity: ${humidity}%`;
        descDisplay.textContent = description;
        WeatherEmoji.textContent = getWeatherEmoji(id); 


        cityDisplay.classList.add("cityDisplay");
        tempDisplay.classList.add("tempDisplay");
        descDisplay.classList.add("humidityDisplay");
        HumidityDisplay.classList.add("humidityDisplay");
        WeatherEmoji.classList.add("weatherEmoji");



        cards.appendChild(cityDisplay);
        cards.appendChild(tempDisplay);
        cards.appendChild(descDisplay);
        cards.appendChild(HumidityDisplay);
        cards.appendChild(WeatherEmoji);
}
function getWeatherEmoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "🌧️";
        case (weatherId >= 300 && weatherId < 400):
            return "⛈️";
        case (weatherId >= 500 && weatherId < 600):
            return "⛈";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "🌞";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");
    cards.textContent = "";
    cards.style.display = "flex";
    cards.appendChild(errorDisplay);
}