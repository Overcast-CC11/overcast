import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import PlayList from "./components/PlayList";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setWeather } from "./redux/redux";
import snowyGif from "./assets/snowy.gif";
import sunnyGif from "./assets/sunny.gif";
import windyGif from "./assets/windy.gif";
import cloudyGif from "./assets/cloudy.gif";
import rainyGif from "./assets/rainy.gif";
import nightGif from "./assets/night.gif";

function App() {
  const [latitude, setLatitude] = useState("35.6590242");
  const [longitude, setLongitude] = useState("139.7217861");
  const dispatch = useDispatch();

  const choseBackGround = weatherType => {
    switch (weatherType) {
      case "snowy":
        return snowyGif;
      case "sunny":
        return sunnyGif;
      case "windy":
        return windyGif;
      case "cloudy":
        return cloudyGif;
      case "rainy":
        return rainyGif;
      case "night":
        return nightGif;
      default:
        return sunnyGif;
    }
  };

  async function postData(url = "", data) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
    });

    const req = {
      longtitude: `${latitude}`,
      latitude: `${longitude}`
    };

    console.log("req :", req);
    postData("./api/currentTemp", req).then(data => {
      const weather = data;
      dispatch(setWeather(weather));
      const weatherBackground = document.body.querySelector(".container");
      weatherBackground.style.backgroundImage = `url(${choseBackGround(
        weather.type
      )})`;
    });
  }, []);

  const setDisplay = () => {
    if (selectedGenre) {
      return <PlayList latitude={latitude} longitude={longitude} />;
    } else {
      return <GenreList />;
    }
  };
  const selectedGenre = useSelector(state => state.selectedGenre);

  return (
    <div className="App">
      <Header />
      <div className="container">{setDisplay()}</div>
    </div>
  );
}

export default App;
