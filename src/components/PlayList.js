import React, { useEffect } from "react";
import SpotifyPlayer from "react-spotify-player";
import { useSelector, useDispatch } from "react-redux";
import { setWeather, setPlayList, setCurrentMusicURI } from "../redux/redux";
import Song from "./Song";
import snowyGif from "../assets/snowy.gif";
import sunnyGif from "../assets/sunny.gif";
import windyGif from "../assets/windy.gif";
import cloudyGif from "../assets/cloudy.gif";
import rainyGif from "../assets/rainy.gif";
import nightGif from "../assets/night.gif";

function PlayList(props) {
  const dispatch = useDispatch();
  const selectedGenre = useSelector(state => state.selectedGenre);

  const size = {
    width: "95%",
    height: "95%"
  };

  const choseBackGround = weatherType => {
    console.log("weatherType :", weatherType);
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
  // const renderPlayer = () => {
  //   if (currentMusicURI) {
  //     return (
  //       <SpotifyPlayer
  //         uri={currentMusicURI}
  //         size={size}
  //         view="coverart"
  //         theme="white"
  //         className="SpotifyPlayer"
  //       />
  //     );
  //   } else {
  //     return <div>Nothing</div>;
  //   }
  // };
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
  function convertToURL(uri) {
    return `https://open.spotify.com/embed/${uri.split(":")[1]}/${
      uri.split(":")[2]
    }`;
  }

  useEffect(() => {
    const req = {
      longtitude: `${props.latitude}`, //TODO
      latitude: `${props.longitude}`, //TODO
      genre: selectedGenre
    };
    // const req2 = { longtitude: "35", latitude: "139", genre: "jazz" };

    console.log("req :", req);
    postData("http://localhost:3000/api/playlist", req).then(data => {
      console.log("DATA", data);
      const weather = data.weather;
      const playList = data.playlist;
      dispatch(setWeather(weather));
      dispatch(setPlayList(playList));
      dispatch(setCurrentMusicURI(playList[0].songUri));
      const weatherBackground = document.body.querySelector(".container");
      console.log("weather.type :", weather.type);
      weatherBackground.style.backgroundImage = `url(${choseBackGround(
        weather.type
      )})`;
    });
  }, [dispatch, props.latitude, props.longitude, selectedGenre]);

  const playList = useSelector(state => state.playList);
  const currentMusicURI = useSelector(state => state.currentMusicURI);
  console.log("currentMusicURI :", convertToURL(currentMusicURI));

  return (
    <div className="PlayList">
      <div className="Player">
        {/* <SpotifyPlayer
          uri={currentMusicURI}
          size={size}
          view="coverart"
          theme="white"
          className="SpotifyPlayer"
        /> */}
        <iframe
          src={convertToURL(currentMusicURI)}
          frameborder="0"
          allowtransparency="true"
          allow="encrypted-media"
          className="SpotifyPlayer"
        ></iframe>
      </div>
      <div className="SongList">
        <div className="containedSongs">
          {playList.map(song => {
            return (
              <Song
                key={song.songUri}
                songName={song.songName}
                artistName={song.artistName}
                songLength={song.songLength}
                songUri={song.songUri}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlayList;
