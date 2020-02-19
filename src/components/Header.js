import React from "react";
import { useSelector } from "react-redux";

function Header() {
  return (
    <div className="header">
      <img className="logo" src="#" alt="logo" />
      <div className="genreWeather">
        <div className="selectedGenre">
          {" "}
          <i>{useSelector(state => state.selectedGenre)}</i>
        </div>
        <div className="weather">
          <h3> rainy 20°c</h3>
        </div>
      </div>
    </div>
  );
}

export default Header;
