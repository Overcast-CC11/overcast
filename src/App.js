import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import PlayList from "./components/PlayList";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(`Latitude : ${pos.coords.latitude}`);
      console.log(`Longitude: ${pos.coords.longitude}`);
      setLatitude(pos.coords.latitude);
      setLongitude(pos.coords.longitude);
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
