class NWSGetForecast {
    constructor () {
        this.gridId = null;
        this.gridX = null;
        this.gridY = null;
    }

    request(callback) {
        var xhttp = new XMLHttpRequest();
        let self = this;

        xhttp.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status != 200) {
                alert(`Payload bad (code ${this.status})`);
                return;
            }
            self.json = JSON.parse(this.responseText);
            if (callback !== undefined) {
                callback();
            }
        }
        let URL = `https://api.weather.gov/gridpoints/${this.gridId}/${this.gridX},${this.gridY}/forecast`;
        xhttp.open("GET", URL, true);
        xhttp.send();
    }

    getCurrentConditiion() {
        return this.json.properties.periods[0].shortForecast;
    }

    getHighLow() {
        let output = {high : null, low : null};
        let isFirstDaytime = this.json.properties.periods[0].isDaytime;
        if (isFirstDaytime) {
           output.high = this.json.properties.periods[0].temperature;
           output.low = this.json.properties.periods[1].temperature;
        }else{
            output.low = this.json.properties.periods[0].temperature;
            output.high = this.json.properties.periods[1].temperature;
        }
        return output;
    }

    getPrecipitation() {
        let output = {};

        output.chance = this.json.properties.periods[4].probabilityOfPrecipitation.value;
        if (output.chance == null) {
            output.chance = 0;
        }

        return output;
    }

    getHumidity() {
        let output = {}
        output.humidity = this.json.properties.periods[0].relativeHumidity.value;
        if (output.humidity == null) {
            output.humidity = 0;
        }

        return output;
    }

    getWindSpeed() {
        let output = {}
        output.wind = this.json.properties.periods[0].windSpeed;

        return output;
    }

    getWindDirection() {
        let output = {}
        output.winddirection = this.json.properties.periods[0].windDirection;

        return output;
    }
    getDewPoint() {
        let output = {}
        output.dew = parseInt(this.json.properties.periods[0].dewpoint.value);

        return output;
    }
}