import React from "react";
import classes from "./Forecast.module.css";

const conditions = (props) => {
  const { unitType, error } = props;
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.errorMessage}
      </div>
    );
  }
  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div>
      {props.responseObj.cod === 200 ? (
        <div
          className={
            typeof props.responseObj.main != "undefined"
              ? props.responseObj.main.temp > 16
                ? classes.appwarm
                : classes.appcold
              : classes.appwarm
          }
        >
          <div className={classes.locationbox}>
            <div className={classes.location}>
              {props.responseObj.name},{props.responseObj.sys.country}
            </div>
            <div className={classes.date}>{dateBuilder(new Date())}</div>
          </div>
          <div className={classes.weatherbox}>
            <div className={classes.temp}>
              {Math.round(props.responseObj.main.temp)}
              {unitType === "metric" ? "°C" : "°F"}
            </div>
            <div className={classes.weather}>
              {props.responseObj.weather[0].description}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default conditions;
