import React from "react";
import SpotifyPlayer from "react-spotify-player";
import { useSelector } from "react-redux";
import Song from "./Song";

function PlayList() {
  const size = {
    width: "95%",
    height: "95%"
  };
  const playList = useSelector(state => state.playList);
  const currentMusicURI = useSelector(state => state.currentMusicURI);
  console.log("currentMusicURI :", currentMusicURI);
  return (
    <div className="PlayList">
      <div className="Player">
        <SpotifyPlayer
          uri={currentMusicURI}
          size={size}
          view="coverart"
          theme="white"
          className="SpotifyPlayer"
        />
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
