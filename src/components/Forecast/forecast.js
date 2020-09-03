import React, { useState } from "react";
import Conditions from "./conditions";
import classes from "./Forecast.module.css";

const Forecast = () => {
  let [city, setCity] = useState("");
  let [unit, setUnit] = useState("imperial");
  let [responseObj, setResponseObj] = useState({});
  let [error, setError] = useState(false);
  let [errorMessage, setErrorMessage] = useState("");

  const api = {
    key: "",
    base: "http://api.openweathermap.org/data/2.5/",
  };

  function getForecast(e) {
    e.preventDefault();
    if (city.length === 0) {
      errorMessage = "Please provide a valid city name";
      setErrorMessage(errorMessage);
      return setError(true);
    }

    setError(false);

    fetch(`${api.base}weather?q=${city},&units=${unit}&appid=${api.key}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.cod !== 200) {
          errorMessage = response.message;
          setErrorMessage(errorMessage);
          setError(true);
          // throw new Error();
        }
        setResponseObj(response);
      })
      .catch((error) => {
        errorMessage = error.message;
        setErrorMessage(errorMessage);
        setError(true);
        console.log(error.message);
      });
  }

  return (
    <div>
      <form onSubmit={getForecast}>
        <div className={classes.searchbox}>
          <input
            type="text"
            placeholder="Enter City"
            maxLength="50"
            className={classes.searchbar}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="row">
          <div className="col-sm-3">
            <label className={classes.Radio}>
              <input
                type="radio"
                name="units"
                checked={unit === "imperial"}
                value="imperial"
                onChange={(e) => setUnit(e.target.value)}
              />
              Fahrenheit
            </label>
          </div>

          <div className="col-sm-3">
            <label className={classes.Radio}>
              <input
                type="radio"
                name="units"
                checked={unit === "metric"}
                value="metric"
                onChange={(e) => setUnit(e.target.value)}
              />
              Celcius
            </label>
          </div>
        </div>

        <button className={classes.button} type="submit">
          Get Forecast
        </button>
      </form>

      <Conditions
        responseObj={responseObj}
        unitType={unit}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default Forecast;
