import React from "react";

function Song(props) {
  return (
    <div className="Song">
      <div className="SongInfo">
        <div className="SongName">{props.songName}</div>
        <div className="ArtistName">{props.artistName}</div>
      </div>
      <div className="SongLength">{props.songLength}</div>
    </div>
  );
}

export default Song;
