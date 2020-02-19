import React from "react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import PlayList from "./components/PlayList";
import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const setDisplay = () => {
    if (selectedGenre) {
      return <PlayList />;
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
