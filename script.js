const weatherFormData = document.querySelector('.weatherForm')
const weatherDisplay = document.querySelector('.weatherDisplay')
const weekWeatherDisplay = document.querySelector('.weekWeatherDisplay')
const weekH1 = document.querySelector('.weeklyH1')
const weatherAlertDiv = document.querySelector('.weather-alert')
const currentWeatherDiv = document.querySelector('.current-weather-div')

// secret keys for api's



weatherFormData.addEventListener('submit', (event) => {
    // prevent page from refreshing
    event.preventDefault()

    // get zip code from user input on submit
    let zipcode = weatherFormData.zip.value

    // call the getGeocodeData function to get lat and long of zip code
    getGeocodeData(zipcode, googleMapsKey)
})

let cityState = ''

const getGeocodeData = async (zipcode, googleMapsKey) => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=${googleMapsKey}`)
    const data = await response.json()

    // get latitude and longitude from zipcode data
    let lat = data.results[0].geometry.location.lat
    let long = data.results[0].geometry.location.lng

    // get city and state data from response
    cityState = data.results[0].formatted_address.slice(0, -10)
    console.log(cityState)

    console.log(lat, long)
    getWeatherData(lat, long, weatherKey)
}


const getWeatherData = async (lat, lon, weatherKey) => {
    // enter aquired latitude and longitude into api url to get weather data
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`)
    const data = await response.json()
    console.log(data)

    displayWeatherData(data)
}


const displayWeatherData = (data) => {
    // get weekly dates
    const d = new Date()
    let first = d.getDate();
    let second = d.getDate() + 1;
    let third = d.getDate() + 2;
    let fourth = d.getDate() + 3;
    let fifth = d.getDate() + 4;
    let sixth = d.getDate() + 5;
    let last = d.getDate() + 6;

    // convert getDates to utc string, slice unnecessary data
    let firstDay = new Date(d.setDate(first)).toUTCString().slice(0, -26);
    let secondDay = new Date(d.setDate(second)).toUTCString().slice(0, -26);
    let thirdDay = new Date(d.setDate(third)).toUTCString().slice(0, -26);
    let fourthDay = new Date(d.setDate(fourth)).toUTCString().slice(0, -26);
    let fifthDay = new Date(d.setDate(fifth)).toUTCString().slice(0, -26);
    let sixthDay = new Date(d.setDate(sixth)).toUTCString().slice(0, -26);
    let lastDay = new Date(d.setDate(last)).toUTCString().slice(0, -26);


    // current weather conditions & icons
    const currentTemp = Math.floor(data.current.temp)
    const feelsLikeTemp = Math.floor(data.current.feels_like)
    const currentWeatherIcon = data.current.weather[0].icon
    const currentWeatherDescription = data.current.weather[0].description
    const currentWindSpeed = Math.floor(data.current.wind_speed)

    // get weekly weather
    // first day
    const firstTempMax = Math.floor(data.daily[1].temp.max)
    const firstTempMin = Math.floor(data.daily[1].temp.min)
    const firstWeatherDescription = data.daily[1].weather[0].description
    const firstWeatherIcon = data.daily[1].weather[0].icon
    const firstWindSpeed = Math.floor(data.daily[1].wind_speed)

    // second day
    const secondTempMax = Math.floor(data.daily[2].temp.max)
    const secondTempMin = Math.floor(data.daily[2].temp.min)
    const secondWeatherDescription = data.daily[2].weather[0].description
    const secondWeatherIcon = data.daily[2].weather[0].icon
    const secondWindSpeed = Math.floor(data.daily[2].wind_speed)

    // third day
    const thirdTempMax = Math.floor(data.daily[3].temp.max)
    const thirdTempMin = Math.floor(data.daily[3].temp.min)
    const thirdWeatherDescription = data.daily[3].weather[0].description
    const thirdWeatherIcon = data.daily[3].weather[0].icon
    const thirdWindSpeed = Math.floor(data.daily[3].wind_speed)

    // fourth day
    const fourthTempMax = Math.floor(data.daily[4].temp.max)
    const fourthTempMin = Math.floor(data.daily[4].temp.min)
    const fourthWeatherDescription = data.daily[4].weather[0].description
    const fourthWeatherIcon = data.daily[4].weather[0].icon
    const fourthWindSpeed = Math.floor(data.daily[4].wind_speed)

    // fifth day
    const fifthTempMax = Math.floor(data.daily[5].temp.max)
    const fifthTempMin = Math.floor(data.daily[5].temp.min)
    const fifthWeatherDescription = data.daily[5].weather[0].description
    const fifthWeatherIcon = data.daily[5].weather[0].icon
    const fifthWindSpeed = Math.floor(data.daily[5].wind_speed)

    // sixth day
    const sixthTempMax = Math.floor(data.daily[6].temp.max)
    const sixthTempMin = Math.floor(data.daily[6].temp.min)
    const sixthWeatherDescription = data.daily[6].weather[0].description
    const sixthWeatherIcon = data.daily[6].weather[0].icon
    const sixthWindSpeed = Math.floor(data.daily[6].wind_speed)

    // last day
    const lastTempMax = Math.floor(data.daily[7].temp.max)
    const lastTempMin = Math.floor(data.daily[7].temp.min)
    const lastWeatherDescription = data.daily[7].weather[0].description
    const lastWeatherIcon = data.daily[7].weather[0].icon
    const lastWindSpeed = Math.floor(data.daily[7].wind_speed)

    // weather alert checks
    let weatherAlert = data.alerts
    console.log(weatherAlert)

    let alertDescription = ''
    let alertEvent = ''
    let alertEnd = 0

    if ('alerts' in data) {
        alertDescription = data.alerts[0].description
        alertEvent = data.alerts[0].event
        alertEnd = data.alerts[0].end

        let alertEndConversion = new Date(alertEnd * 1000)
        alertEnd = alertEndConversion
    }

    // style border around current weather div 
    weatherDisplay.style.borderWidth = "2px"
    weatherDisplay.style.borderStyle = "solid"
    weatherDisplay.style.borderColor = "black"



    if ('alerts' in data) {
        weatherAlertDiv.style.display = 'block'

        weatherDisplay.innerHTML = `
        <h1 class="header">Current Weather For</h1>
        <h1 class="header">${cityState}</h1>
        <div class="currentWeatherCard">
            <img class="card-img" src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current">Current Temp: ${currentTemp}&deg;F</p>
                <p class="current">Feels Like: ${feelsLikeTemp}&deg;F</p>
                <p class="current">Weather: ${currentWeatherDescription}</p>
                <p class="current">Wind Speed: ${currentWindSpeed}mph</p>
            </div>
        </div>
        `

        weatherAlertDiv.innerHTML = `
        <div class="alert-card">
            <div class="currentWeatherCard">
            <h1 class="alert-header">${alertEvent}</h1>
            <h1 class="alert-header">${alertEnd}</h1>
            <div class="card-body">
                <p class="current">${alertDescription}</p>
            </div>
        </div>
        `

        weekH1.innerHTML = `
        <h1 class="header">Weekly Weather Forcast</h1>
        `

        weekWeatherDisplay.innerHTML = `
        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${firstDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${firstWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${firstTempMax}&deg;F</p>
                <p class="current">Low: ${firstTempMin}&deg;F</p>
                <p class="current">Weather: ${firstWeatherDescription}</p>
                <p class="current">Wind Speed: ${firstWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${secondDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${secondWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${secondTempMax}&deg;F</p>
                <p class="current">Low: ${secondTempMin}&deg;F</p>
                <p class="current">Weather: ${secondWeatherDescription}</p>
                <p class="current">Wind Speed: ${secondWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${thirdDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${thirdWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${thirdTempMax}&deg;F</p>
                <p class="current">Low: ${thirdTempMin}&deg;F</p>
                <p class="current">Weather: ${thirdWeatherDescription}</p>
                <p class="current">Wind Speed: ${thirdWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${fourthDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${fourthWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${fourthTempMax}&deg;F</p>
                <p class="current">Low: ${fourthTempMin}&deg;F</p>
                <p class="current">Weather: ${fourthWeatherDescription}</p>
                <p class="current">Wind Speed: ${fourthWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${fifthDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${fifthWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${fifthTempMax}&deg;F</p>
                <p class="current">Low: ${fifthTempMin}&deg;F</p>
                <p class="current">Weather: ${fifthWeatherDescription}</p>
                <p class="current">Wind Speed: ${fifthWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${sixthDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${sixthWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${sixthTempMax}&deg;F</p>
                <p class="current">Low: ${sixthTempMin}&deg;F</p>
                <p class="current">Weather: ${sixthWeatherDescription}</p>
                <p class="current">Wind Speed: ${sixthWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${lastDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${lastWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${lastTempMax}&deg;F</p>
                <p class="current">Low: ${lastTempMin}&deg;F</p>
                <p class="current">Weather: ${lastWeatherDescription}</p>
                <p class="current">Wind Speed: ${lastWindSpeed}mph</p>
            </div>
        </div>
        `
    } else {
        weatherAlertDiv.style.display = 'none'

        weatherDisplay.innerHTML = `
        <h1 class="header">Current Weather For</h1>
        <h1 class="header">${cityState}</h1>
        <div class="currentWeatherCard">
            <img class="card-img" src="https://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current">Current Temp: ${currentTemp}&deg;F</p>
                <p class="current">Feels Like: ${feelsLikeTemp}&deg;F</p>
                <p class="current">Weather: ${currentWeatherDescription}</p>
                <p class="current">Wind Speed: ${currentWindSpeed}mph</p>
            </div>
        </div>
        `

        weekH1.innerHTML = `
        <h1 class="header">Weekly Weather Forcast</h1>
        `

        weekWeatherDisplay.innerHTML = `
        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${firstDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${firstWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${firstTempMax}&deg;F</p>
                <p class="current">Low: ${firstTempMin}&deg;F</p>
                <p class="current">Weather: ${firstWeatherDescription}</p>
                <p class="current">Wind Speed: ${firstWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${secondDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${secondWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${secondTempMax}&deg;F</p>
                <p class="current">Low: ${secondTempMin}&deg;F</p>
                <p class="current">Weather: ${secondWeatherDescription}</p>
                <p class="current">Wind Speed: ${secondWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${thirdDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${thirdWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${thirdTempMax}&deg;F</p>
                <p class="current">Low: ${thirdTempMin}&deg;F</p>
                <p class="current">Weather: ${thirdWeatherDescription}</p>
                <p class="current">Wind Speed: ${thirdWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${fourthDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${fourthWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${fourthTempMax}&deg;F</p>
                <p class="current">Low: ${fourthTempMin}&deg;F</p>
                <p class="current">Weather: ${fourthWeatherDescription}</p>
                <p class="current">Wind Speed: ${fourthWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${fifthDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${fifthWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${fifthTempMax}&deg;F</p>
                <p class="current">Low: ${fifthTempMin}&deg;F</p>
                <p class="current">Weather: ${fifthWeatherDescription}</p>
                <p class="current">Wind Speed: ${fifthWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${sixthDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${sixthWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${sixthTempMax}&deg;F</p>
                <p class="current">Low: ${sixthTempMin}&deg;F</p>
                <p class="current">Weather: ${sixthWeatherDescription}</p>
                <p class="current">Wind Speed: ${sixthWindSpeed}mph</p>
            </div>
        </div>

        <div class="weekWeatherCard">
            <h1 class="weekly-h1">${lastDay}</h1>
            <img class="card-img week" src="https://openweathermap.org/img/wn/${lastWeatherIcon}@2x.png" alt="">
            <div class="card-body">
                <p class="current top-p">High: ${lastTempMax}&deg;F</p>
                <p class="current">Low: ${lastTempMin}&deg;F</p>
                <p class="current">Weather: ${lastWeatherDescription}</p>
                <p class="current">Wind Speed: ${lastWindSpeed}mph</p>
            </div>
        </div>
        `    
    }


    // ** Will change to case statements later **
    // conditionals to check current weather description to change background
    let mainWeatherCondition = data.current.weather[0].main

    if (mainWeatherCondition.includes('Clear')) {
        document.body.style.backgroundImage = "url(./images/blue-sky-background.jpg)";
    } else if (currentWeatherDescription.includes('broken')) {
        document.body.style.backgroundImage = "url(./images/broken-clouds-background.jpg)";
    } else if (currentWeatherDescription.includes('few')) {
        document.body.style.backgroundImage = "url(./images/partly-cloudy-background.jpg)";
    } else if (mainWeatherCondition.includes('Clouds')) {
        document.body.style.backgroundImage = "url(./images/cloudy-background.jpg)";
    } else if (mainWeatherCondition.includes('Rain') || (mainWeatherCondition.includes('Drizzle'))) {
        document.body.style.backgroundImage = "url(./images/rainy-background.jpg)";
    } else if (mainWeatherCondition.includes('Snow')) {
        document.body.style.backgroundImage = "url(./images/snow-background.jpg)";
    } else if (mainWeatherCondition.includes('Thunderstorm')) {
        document.body.style.backgroundImage = "url(./images/lightning-background.jpg)";
    } else if (mainWeatherCondition.includes('Mist')) {
        document.body.style.backgroundImage = "url(./images/mist-background.jpg)";
    } else if (mainWeatherCondition.includes('Smoke') ||(mainWeatherCondition.includes('Haze'))) {
        document.body.style.backgroundImage = "url(./images/smoke-haze-background.jpg)";
    } else if (mainWeatherCondition.includes('Dust') ||(mainWeatherCondition.includes('Sand'))) {
        document.body.style.backgroundImage = "url(./images/dust-background.jpg)";
    } else if (mainWeatherCondition.includes('Fog')) {
        document.body.style.backgroundImage = "url(./images/fog-background.jpg)";
    } else if (mainWeatherCondition.includes('Ash')) {
        document.body.style.backgroundImage = "url(./images/ash-background.jpg)";
    } else if (mainWeatherCondition.includes('Squall')) {
        document.body.style.backgroundImage = "url(./images/cloudy-background.jpg)";
    } else if (mainWeatherCondition.includes('Tornado')) {
        document.body.style.backgroundImage = "url(./images/tornado-background.jpg)";
    } 
}
