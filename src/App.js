import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=61a3853f78df4d14e40f904acfdcf337
  `;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  const chooseLocation = (event) => {
    setLocation(event.target.value);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={chooseLocation}
          onKeyPress={searchLocation}
          placeholder="Enter your location"
          type="text"
        ></input>
      </div>
      <div className="container">
        {data.name != undefined || (
          <div className="deforeLocation">
            <h1 style={{ textAlign: "center", color: "#979797" }}>
              Please type in a location
            </h1>
          </div>
        )}
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()} &deg;F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : ""}
          </div>
        </div>

        {data.name != undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} &deg;F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
      <p className="desBy">only-one-weather-app developed by Ushh_B</p>
    </div>
  );
}

export default App;
