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

  return (
    <div className="PlayList">
      <div className="Player">
        <SpotifyPlayer
          uri="spotify:track:7lEptt4wbM0yJTvSG5EBof"
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
                songName={song.songName}
                artistName={song.artistName}
                songLength={song.songLength}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PlayList;
