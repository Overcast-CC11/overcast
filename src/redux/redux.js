import { createStore } from "redux";

const initialState = {
  selectedGenre: null,
  playList: [
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
  ],
  weather: { type: null, temperature: null }
};

export const switchView = genre => ({
  type: "SWITCH_VIEW",
  genre
});

export const setPlayList = playlist => ({
  type: "SET_PLAYLIST",
  playlist
});

export const setWeather = weather => ({
  type: "SET_WEATHER",
  weather
});

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_VIEW":
      return {
        selectedGenre: action.genre,
        playList: state.playList,
        weather: state.weather
      };
    case "SET_PLAYLIST":
      return {
        selectedGenre: state.genre,
        playList: action.playList,
        weather: state.weather
      };
    case "SET_WEATHER":
      return {
        selectedGenre: state.genre,
        playList: state.playList,
        weather: action.weather
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
