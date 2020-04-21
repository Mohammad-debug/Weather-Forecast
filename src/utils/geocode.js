const request = require("request")

const geocode = (address, callback) => {
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW5hc21kNHUiLCJhIjoiY2s4amJmaWR1MDRqZTNkbWMyM2h4cjZ0YSJ9.i8HIwaeS5Pjf68aMlhK7uQ"
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback({ error:"No reponse recieved"}, undefined)
        } else if (!body.features.length) {
            callback({error:"Unable to find location. Try another place"}, undefined)


        } else {
            data = {
                long: body.features[0].geometry.coordinates[0],
                lat: body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })

}

module.exports = geocode