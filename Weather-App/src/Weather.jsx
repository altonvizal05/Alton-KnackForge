import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';

import search_icon from './assets/search.png';
import clear_icon from './assets/clear.png';
import cloud_icon from './assets/cloud.png';
import drizzle_icon from './assets/drizzle.png';
import humidity_icon from './assets/humidity.png';
import snow_icon from './assets/snow.png';
import wind_icon from './assets/wind.png';
import visibility_icon from './assets/visibility.png';
import pressure_icon from './assets/pressure.png';
import rain_icon from './assets/rain.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyData, setDailyData] = useState([]);

  const inputVal = useRef();

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09n": rain_icon,
    "09d": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  
  const processDailyData = (list) => {
    const days = {};

    list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toISOString().slice(0, 10); 

      if (!days[dayKey]) {
        days[dayKey] = {
          dt: item.dt,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          icon: item.weather[0].icon,
        };
      } else {
        days[dayKey].temp_min = Math.min(days[dayKey].temp_min, item.main.temp_min);
        days[dayKey].temp_max = Math.max(days[dayKey].temp_max, item.main.temp_max);
      }
    });

    return Object.values(days);
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found") && alert(" Error : City not found...")

      const data = await response.json();
      const icon = allIcons[data.weather[0].icon] || clear_icon;

    
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const forecastResp = await fetch(forecastUrl);
      if (!forecastResp.ok) throw new Error("Error fetching forecast");
      const forecastData = await forecastResp.json();

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        visibility: data.visibility,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

      setHourlyData(forecastData.list.slice(0, 12));
      setDailyData(processDailyData(forecastData.list));

    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const formatHour = (dt) => {
    const date = new Date(dt * 1000);
    return date.getHours() + ":00";
  };

  const formatDay = (dt) => {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString(undefined, { weekday: 'short' });
  };

  useEffect(() => {
    search("Alton");
  }, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputVal} type="text" placeholder='Search' />
        <img src={search_icon} alt="Search" onClick={() => search(inputVal.current.value)} />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
          <p className='temp'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>

          <div className='weather-data'>
            <div className="col">
              <img src={visibility_icon} alt="Visibility" />
              <div>
                <p>{weatherData.visibility / 1000} km</p>
                <span>Visibility</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.windSpeed} m/s</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>

          <div className='weather-data2'>
            <div className="col2">
              <img src={pressure_icon} alt="Pressure" />
              <div>
                <p>{weatherData.pressure} hPa</p>
                <span>Air Pressure</span>
              </div>
            </div>

            <div className="col2">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
          </div>

          
          <h3>Hourly Forecast</h3>
          <div className='hourly-forecast'>
            {hourlyData.map(hour => (
              <div key={hour.dt} className="hour-item">
                <p>{formatHour(hour.dt)}</p>
                <img src={allIcons[hour.weather[0].icon] || clear_icon} alt="icon" />
                <p>{Math.round(hour.main.temp)}°C</p>
              </div>
            ))}
          </div>

          
          <h3>Daily Forecast</h3>
          <div className='daily-forecast'>
            {dailyData.map(day => (
              <div key={day.dt} className="day-item">
                <p className="day-label">{formatDay(day.dt)}</p>
                <img src={allIcons[day.icon] || clear_icon} alt="icon" />
                <div className="temp-range">
                  <span className="high">Max: {Math.round(day.temp_max)}°C</span>
                  <span className="low">Min: {Math.round(day.temp_min)}°C</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;  