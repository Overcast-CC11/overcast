import React, { useEffect } from "react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import PlayList from "./components/PlayList";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setWeather, setPlayList } from "./redux/redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    //Do something
    //Test Data
    const testWeather = { type: "sunny", temperature: "20" };
    const testPlayList = [
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" },
      { songName: "song name", artistName: "artist name", songLength: "9:32" }
    ];
    dispatch(setWeather(testWeather));
    dispatch(setPlayList(testPlayList));
  }, []);

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
