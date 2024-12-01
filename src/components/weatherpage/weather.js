import React, { useEffect, useState } from "react";
import "./weather.css";

import clearSun1d from '../../assets/clearsun.png';
import clearnight1d from '../../assets/clearnight.png'
import fewCloud2d from '../../assets/fewCloud.png';
import fewCloudNight2n from '../../assets/fewCloudNight.png';
import  scatteredclouds3d3n  from '../../assets/scatteredclouds.png';
import brokenCloud4d4n from '../../assets/brokencloud.png';
import showerRain9d9n from '../../assets/showerRain.png';
import rainDay10d from '../../assets/rainDay.png';
import rainyNight10n from '../../assets/rainnight.png';
import thunderStrom11d11n from '../../assets/thunderStrom.png';
import snow13d13n from '../../assets/snow.png';
import mist50d50n from '../../assets/mist.png';


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // Set initial state to null
  const [city, setCity] = useState("");

  const allIcons = {
    "01d": clearSun1d,
    "01n": clearnight1d,
    "02d": fewCloud2d,
    "02n": fewCloudNight2n,
    "03d":scatteredclouds3d3n,
    "03n": scatteredclouds3d3n,
    "04d": brokenCloud4d4n,
    "04n":brokenCloud4d4n,
    "09d":showerRain9d9n,
    "09n": showerRain9d9n,
    "10d": rainDay10d,
    "10n": rainyNight10n,
    "11d":thunderStrom11d11n,
    "11n": thunderStrom11d11n,
    "13d":snow13d13n,
    "13n": snow13d13n,
    "50d":mist50d50n,
    "50n":mist50d50n
  };

  const defaultIconUrl =clearSun1d;

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
              type="search"
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
