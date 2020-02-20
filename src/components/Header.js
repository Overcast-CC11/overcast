import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { switchView } from "../redux/redux";
import logo from "../assets/logo.png";

function Header() {
  const dispatch = useDispatch();
  const weather = useSelector(state => state.weather);
  const selectedGenre = useSelector(state => state.selectedGenre);
  const temperatureStr = weather.temperature
    ? Math.round(weather.temperature) + "°c"
    : "";
  return (
    <div className="header">
      <div className="logoName" onClick={() => dispatch(switchView(null))}>
        <img className="logo" src={logo} alt="logo" />
        <h2>overcast</h2>
      </div>

      <div className="genreWeather">
        <div className="selectedGenre">
          <i>{selectedGenre ? selectedGenre : "genre?"}</i>
        </div>
        <div className="weather">
          <h3>
            {weather.type} {temperatureStr}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
