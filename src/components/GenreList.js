import React from "react";
import Genre from "./Genre";

function GenreList() {
  const genreList = ["pop", "indie", "jazz", "metal", "hip-hop", "electronic"];
  return (
    <div className="GenreList">
      {genreList.map(genre => {
        return <Genre key={genre} name={genre} />;
      })}
    </div>
  );
}

export default GenreList;
