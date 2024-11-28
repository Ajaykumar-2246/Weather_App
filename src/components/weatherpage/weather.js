import React, { useEffect, useState } from "react";
import "./weather.css";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // Set initial state to null
  const [city, setCity] = useState("");

  const allIcons = {
    "01d": "https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000",
    "01n": "https://openweathermap.org/img/wn/01n@2x.png",
    "02d": "https://img.icons8.com/?size=100&id=zIVmoh4T8wh7&format=png&color=000000",
    "02n": "https://img.icons8.com/?size=100&id=VT8HlhlnhUwL&format=png&color=000000",
    "03d": "https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000",
    "03n": "https://img.icons8.com/?size=100&id=aXgIQg8m0A4o&format=png&color=000000",
    "04d": "https://openweathermap.org/img/wn/04d@2x.png",
    "04n": "https://openweathermap.org/img/wn/04n@2x.png",
    "09d": "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000",
    "09n": "https://img.icons8.com/?size=100&id=kKxyuLXD4w0n&format=png&color=000000",
    "10d": "https://img.icons8.com/?size=100&id=MVj2tmasj0Pp&format=png&color=000000",
    "10n": "https://img.icons8.com/?size=100&id=MVj2tmasj0Pp&format=png&color=000000",
    "11d": "https://img.icons8.com/?size=100&id=c0Otgmp74zQX&format=png&color=000000",
    "11n": "https://img.icons8.com/?size=100&id=c0Otgmp74zQX&format=png&color=000000",
    "13d": "https://img.icons8.com/?size=100&id=Mvbzy3ZDRcVj&format=png&color=000000",
    "13n": "https://img.icons8.com/?size=100&id=Mvbzy3ZDRcVj&format=png&color=000000",
  };

  const defaultIconUrl = "https://img.icons8.com/?size=100&id=8EUmYhfLPTCF&format=png&color=000000";

  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name");
      return;
    }
    try {
      const API_KEY = "b3cff86a8b08d8cd2df77213c3ffa312";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        alert("City not found! Please enter a correct city name.");
        return;
      }

      const data = await response.json();
      const iconUrl = allIcons[data.weather[0].icon] || defaultIconUrl;
      console.log(data);
      setWeatherData({
        city: data.name,
        temperature: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: iconUrl,
        wind: data.wind.speed,
        pressure: data.main.pressure,
        visibility: data.visibility / 1000, //in km
      });
    } catch (error) {
      console.error("Error fetching weather data", error);
      alert("An error occurred while fetching weather data.");
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  const Data = [
    {
      classname: "fa-sharp fa-solid fa-droplet fa-2x",
      iconname: "Humidity",
      value: weatherData ? `${weatherData.humidity}` : 0,
      unit: "%",
    },
    {
      classname: "fa-sharp fa-solid fa-wind fa-2x",
      iconname: "Wind Speed",
      value: weatherData ? `${weatherData.wind}` : 0,
      unit: "km/h",
    },
    {
      classname: "fa-sharp fa-solid fa-gauge fa-2x",
      iconname: "Pressure",
      value: weatherData ? `${weatherData.pressure}` : 0,
      unit: "hPa",
    },
    {
      classname: "fa-sharp fa-solid fa-eye fa-2x",
      iconname: "Visibility",
      value: weatherData ? `${weatherData.visibility}` : 0,
      unit: "km",
    },
  ];

  return (
    <React.Fragment>
      <div className="container">
        <div className="weather w-100 p-3 rounded-4 bg-light shadow-sm">
          <div className="search-bar d-flex gap-2">
            <input
              type="text"
              className="form-control w-100 rounded-pill"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city"
            />
            <button
              className="btn btn-primary rounded-pill"
              onClick={() => search(city)}
            >
              Search
            </button>
          </div>
          
          {weatherData ? (
            <>
              <div className="p-1 m-1 text-center">
                <img src={weatherData.icon || defaultIconUrl} alt="" className="icon-img" />
                <p className="temperature m-1 p-0">{weatherData.temperature}℃</p>
                <p className="Location p-0 m-1">{weatherData.city}</p>
              </div>
              <div className="d-flex mt-2 gap-3 p-0  flex-wrap justify-content-center">
                {Data.map((item, index) => (
                  <div className="weather-data p-3 rounded bg-light shadow-sm" key={index}>
                    <i className={item.classname}></i>
                    <p className="m-0 p-0">{item.iconname}</p>
                    <div className="value fw-bold">
                      {item.value} {item.unit}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Weather;
