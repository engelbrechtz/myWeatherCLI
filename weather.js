const https = require("https");
const { key } = require("./env.json");

function fetchWeatherInfo(zipCode) {
  // https://api.openweathermap.org/data/2.5/weather?APPID=test&units=imperial&zip=14221
  const params = {
    APPID: key,
    units: "imperial",
    zip: zipCode,
  };

  const url =
    "https://api.openweathermap.org/data/2.5/weather?APPID=" +
    params.APPID +
    "&units=" +
    params.units +
    "&zip=" +
    params.zip;

  try {
    const req = https.get(url, (Response) => {
      if (Response.statusCode == 200) {
        let body = "";

        Response.on("data", (buffer) => {
          body += buffer;
        });

        Response.on("end", () => {
          const Data = JSON.parse(body);
          const name = Data.name;
          const temp = Data.main.temp;
          console.log("The current temp in " + name + "is " + temp);
        });
      } else {
        console.log("Something went oof " + Response.statusCode + " error");
        return;
      }
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = fetchWeatherInfo;
