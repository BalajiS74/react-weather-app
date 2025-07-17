import React, { useState, useEffect } from "react";
import TodayHighlights from "./TodayHighlights";
import UpComingDays from "./UpComingDays";
import axios from "axios";
import { WiDaySunny, WiRain, WiSnow, WiThunderstorm, WiCloudy, WiDayCloudy, WiFog } from "react-icons/wi";
import { FiDroplet, FiWind, FiEye, FiBarChart2 } from "react-icons/fi";
import { BsCalendarDate, BsGeoAlt, BsClouds } from "react-icons/bs";
import { ImSpinner8 } from "react-icons/im";

function Content({ sname }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Weather icon mapping
  const weatherIcons = {
    "01d": <WiDaySunny size={80} />,
    "01n": <WiDaySunny size={80} />,
    "02d": <WiDayCloudy size={80} />,
    "02n": <WiDayCloudy size={80} />,
    "03d": <WiCloudy size={80} />,
    "03n": <WiCloudy size={80} />,
    "04d": <WiCloudy size={80} />,
    "04n": <WiCloudy size={80} />,
    "09d": <WiRain size={80} />,
    "09n": <WiRain size={80} />,
    "10d": <WiRain size={80} />,
    "10n": <WiRain size={80} />,
    "11d": <WiThunderstorm size={80} />,
    "11n": <WiThunderstorm size={80} />,
    "13d": <WiSnow size={80} />,
    "13n": <WiSnow size={80} />,
    "50d": <WiFog size={80} />,
    "50n": <WiFog size={80} />
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!sname) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${sname}&appid=0a1a86f7c1264036183ce598dbf395b8&units=metric`
        );
        
        const forecastData = {
          current: {
            temp: res.data.list[0].main.temp,
            feels_like: res.data.list[0].main.feels_like,
            humidity: res.data.list[0].main.humidity,
            wind: res.data.list[0].wind.speed,
            visibility: (res.data.list[0].visibility / 1000).toFixed(1),
            pressure: res.data.list[0].main.pressure,
            status: res.data.list[0].weather[0].main,
            description: res.data.list[0].weather[0].description,
            icon: res.data.list[0].weather[0].icon,
            date: new Date(res.data.list[0].dt_txt).toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'short', 
              day: 'numeric' 
            })
          },
          location: {
            city: res.data.city.name,
            country: res.data.city.country
          },
          forecast: [
            res.data.list[8],
            res.data.list[16],
            res.data.list[24],
            res.data.list[32]
          ].map(item => ({
            temp: item.main.temp,
            feels_like: item.main.feels_like,
            date: new Date(item.dt_txt).toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            }),
            icon: item.weather[0].icon,
            status: item.weather[0].main
          }))
        };
        
        setData(forecastData);
      } catch (err) {
        setError("Failed to fetch weather data. Please try another location.");
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sname]);

  if (loading) {
    return (
      <div className="weather-loading">
        <ImSpinner8 className="spinner" size={50} />
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-error">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="weather-welcome">
        <h2>Welcome to WeatherCast</h2>
        <p>Search for a city to view weather information</p>
      </div>
    );
  }

  return (
    <div className="weather-container">
      {/* Current Weather Section */}
      <section className="current-weather">
        <div className="weather-card">
          <div className="weather-main">
            <div className="weather-icon">
              {weatherIcons[data.current.icon] || <WiDaySunny size={80} />}
            </div>
            <div className="weather-temp">
              <h2>{Math.round(data.current.temp)}°C</h2>
              <p>Feels like {Math.round(data.current.feels_like)}°C</p>
            </div>
          </div>
          
          <div className="weather-details">
            <h3 className="location">
              <BsGeoAlt /> {data.location.city}, {data.location.country}
            </h3>
            <p className="date">
              <BsCalendarDate /> {data.current.date}
            </p>
            <p className="status">
              <BsClouds /> {data.current.description}
            </p>
          </div>
        </div>
      </section>

      {/* Today's Highlights */}
      <section className="highlights-section">
        <h2>Today's Highlights</h2>
        <div className="highlights-grid">
          <TodayHighlights
            icon={<FiWind size={24} />}
            value={`${data.current.wind} km/h`}
            title="Wind Speed"
          />
          <TodayHighlights
            icon={<FiDroplet size={24} />}
            value={`${data.current.humidity}%`}
            title="Humidity"
          />
          <TodayHighlights
            icon={<FiBarChart2 size={24} />}
            value={`${data.current.pressure} hPa`}
            title="Pressure"
          />
          <TodayHighlights
            icon={<FiEye size={24} />}
            value={`${data.current.visibility} km`}
            title="Visibility"
          />
        </div>
      </section>

      {/* Forecast Section */}
      <section className="forecast-section">
        <h2>4-Day Forecast</h2>
        <div className="forecast-grid">
          {data.forecast.map((day, index) => (
            <UpComingDays
              key={index}
              date={day.date}
              icon={weatherIcons[day.icon] || <WiDaySunny size={40} />}
              temp={Math.round(day.temp)}
              status={day.status}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Content;