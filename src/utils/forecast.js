const request = require("request")
const forecast = (lat, long, callback) => {
    const url = ("http://api.weatherstack.com/current?access_key=542e75b65e8cc9453c8f6a33ac189e9f&query=" + lat + "," + long) //?query requester
    request({ url, json: true }, (error, { body }={}) => {
            if (error) {
                callback("No data recieved from server", undefined)
            } else if ('error' in body) {
                callback("Invalid input!", undefined)
            } else {
                const data = "Weather is " + body.current.weather_descriptions[0] + " .It is currently  " + body.current.temperature + "°C  but its feels like  " + body.current.feelslike + "°C  (Apparent Temperature) . "+"Humidity is "+body.current.humidity+"% ."
                callback(undefined, data)
            }
        }) //request is also a fallback function on its own as I can see second argument is function
}
module.exports = forecast