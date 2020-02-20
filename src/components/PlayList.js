import React, { useEffect } from "react";
import SpotifyPlayer from "react-spotify-player";
import { useSelector, useDispatch } from "react-redux";
import { setWeather, setPlayList, setCurrentMusicURI } from "../redux/redux";
import Song from "./Song";

function PlayList(props) {
  const dispatch = useDispatch();
  const selectedGenre = useSelector(state => state.selectedGenre);

  const size = {
    width: "95%",
    height: "95%"
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
    postData("./api/playlist", req).then(data => {
      console.log("DATA", data);
      const playList = data.playlist;
      dispatch(setPlayList(playList));
      dispatch(setCurrentMusicURI(playList[0].songUri));
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
