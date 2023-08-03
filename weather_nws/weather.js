let nwsGetGrid = new NWSGetGrid();
let nwsGetForecast = new NWSGetForecast();

function button() {
    //alert("Getting the weather!");

    nwsGetGrid.request(getWeather);
}

function getWeather () {
    nwsGetForecast.gridId = nwsGetGrid.getGridId();
    nwsGetForecast.gridX = nwsGetGrid.getGridX();
    nwsGetForecast.gridY = nwsGetGrid.getGridY();

    nwsGetForecast.request(displayWeather);
}

function displayWeather() {
    const cond = document.getElementById("condition");
    cond.innerHTML = nwsGetForecast.getCurrentConditiion();

    let highLow = nwsGetForecast.getHighLow()
    cond.innerHTML += `<br>${highLow.high}&deg;F / ${highLow.low}&deg;F`;

    if (highLow.high > 85) {
        cond.style.backgroundColor = "#9e0b00";
    } else if (highLow.high >78 && highLow.high <= 85) {
        cond.style.backgroundColor = "#ed6605";
    } else if (highLow.high < 40) {
        cond.style.backgroundColor = "#bedbed";
    } else {
        cond.style.backgroundColor = "#38bf0f";
    }

    let percip = nwsGetForecast.getPrecipitation();
    cond.innerHTML += `<br>${percip.chance}% chance of rain`;

    let humidity = nwsGetForecast.getHumidity();
    cond.innerHTML += `<br>${humidity.humidity}% Humidity`

    let wind = nwsGetForecast.getWindSpeed();
    let winddirection = nwsGetForecast.getWindDirection();
    cond.innerHTML += `<br>${wind.wind} ${winddirection.winddirection}`

    let dew = nwsGetForecast.getDewPoint();
    cond.innerHTML += `<br>${dew.dew}&deg;C Dew Point`
}

