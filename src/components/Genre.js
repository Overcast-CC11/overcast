import React from "react";
import { useDispatch } from "react-redux";
import { switchView } from "../redux/redux";
function Genre(props) {
  const genreName = props.name;

  const dispatch = useDispatch();
  return (
    <div className="genre">
      <div
        className="genrePic"
        id={genreName}
        onClick={() => dispatch(switchView(genreName))}
      >
        <div className="genreText">{genreName}</div>
      </div>
    </div>
  );
}

export default Genre;
