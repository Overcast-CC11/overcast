import { createStore } from "redux";

const initialState = {
  selectedGenre: null,
  playList: [],
  weather: { type: null, temperature: null },
  currentMusicURI: "spotify:track:7oiCqfE8Wjk8wf0pFTgL2H"
};

export const switchView = genre => ({
  type: "SWITCH_VIEW",
  genre
});

export const setPlayList = playList => ({
  type: "SET_PLAYLIST",
  playList
});

export const setWeather = weather => ({
  type: "SET_WEATHER",
  weather
});
export const setCurrentMusicURI = currentMusicURI => ({
  type: "SET_CURRENT_MUSIC_URI",
  currentMusicURI
});
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH_VIEW":
      return {
        ...state,
        selectedGenre: action.genre
      };
    case "SET_PLAYLIST":
      return {
        ...state,
        playList: action.playList
      };
    case "SET_WEATHER":
      return {
        ...state,
        weather: action.weather
      };
    case "SET_CURRENT_MUSIC_URI":
      console.log("action.currentMusicURI :", action.currentMusicURI);
      return {
        ...state,
        currentMusicURI: action.currentMusicURI
      };
    default:
      return state;
  }
};

export const store = createStore(reducer);
