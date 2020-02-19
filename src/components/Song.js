import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentMusicURI } from "../redux/redux";

function Song(props) {
  const dispatch = useDispatch();

  const msToTime = duration => {
    let seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
  };

  return (
    <div
      className="Song"
      onClick={() => {
        dispatch(setCurrentMusicURI(props.songUri));
      }}
    >
      <div className="SongInfo">
        <div className="SongName">{props.songName}</div>
        <div className="ArtistName">{props.artistName}</div>
      </div>
      <div className="SongLength">{msToTime(props.songLength)}</div>
    </div>
  );
}

export default Song;
