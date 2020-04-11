const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=849118ec5411c3c32d5077d5914ed88a&query=" +
    latitude +
    "," +
    longitude;

  // http://api.weatherstack.com/current?access_key=849118ec5411c3c32d5077d5914ed88a&query=42.3605,-71.0596

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " It is currently " +
          body.current.temperature +
          " degress out. There is a " +
          body.current.feelslike +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
