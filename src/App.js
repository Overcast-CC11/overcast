import React, { useEffect } from "react";
import Header from "./components/Header";
import GenreList from "./components/GenreList";
import PlayList from "./components/PlayList";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { setWeather, setPlayList, setCurrentMusicURI } from "./redux/redux";
import snowyGif from "./assets/snowy.gif";
import sunnyGif from "./assets/sunny.gif";
import windyGif from "./assets/windy.gif";
import cloudyGit from "./assets/cloudy.gif";
import rainyGif from "./assets/rainy.gif";

function App() {
  const dispatch = useDispatch();

  const choseBackGround = weatherType => {
    console.log("weatherType :", weatherType);
    switch (weatherType) {
      case "Snowy":
        return snowyGif;
      case "Sunny":
        return sunnyGif;
      case "Windy":
        return windyGif;
      case "Cloudy":
        return cloudyGit;
      case "Rainy":
        return rainyGif;
      default:
        return sunnyGif;
    }
  };
  useEffect(() => {
    //Do something
    //Test Data
    const location = { latitude: 0, longitude: 0 }; //default
    navigator.geolocation.getCurrentPosition(pos => {
      console.log(`Latitude : ${pos.coords.latitude}`);
      console.log(`Longitude: ${pos.coords.longitude}`);
      location.latitude = pos.coords.latitude;
      location.longitude = pos.coords.longitude;
    });
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
    // postData("http://localhost:3000/api/something", location).then(data => {
    //   console.log(data);
    //   //Store data!
    const testWeather = { type: "Rainy", temperature: "20" };
    const testPlayList = [
      {
        songName: "Nothin' To Lose",
        artistName: "Josh Gracin",
        songUri: "spotify:track:7oiCqfE8Wjk8wf0pFTgL2H",
        songLength: 156893
      },
      {
        songName: "Do I Make You Wanna",
        artistName: "Billy Currington",
        songUri: "spotify:track:3I7krC8kr0gFR7P6vInR1I",
        songLength: 234306
      },
      {
        songName: "Last Time for Everything",
        artistName: "Brad Paisley",
        songUri: "spotify:track:3EWQsarNCItwHn9hE2MHTn",
        songLength: 230831
      },
      {
        songName: "Where It's At",
        artistName: "Dustin Lynch",
        songUri: "spotify:track:4whYDpJ5XVQpmvecbEHP5Q",
        songLength: 204186
      },
      {
        songName: "Picture (feat. Sheryl Crow)",
        artistName: "Kid Rock",
        songUri: "spotify:track:69j0KoPJuwpnbGWrfn7Yll",
        songLength: 298960
      },
      {
        songName: "Grave",
        artistName: "Thomas Rhett",
        songUri: "spotify:track:0rpwb2kLgS6KAZsostOj1O",
        songLength: 193680
      },
      {
        songName: "Queen Of My Double Wide Trailer",
        artistName: "Sammy Kershaw",
        songUri: "spotify:track:0tEygHq0JLIRwzxoWiHv9j",
        songLength: 211200
      },
      {
        songName: "Girl In The Song",
        artistName: "Joe Nichols",
        songUri: "spotify:track:1p8F8cOT8n57sul4fSkWf2",
        songLength: 219400
      },
      {
        songName: "Follow Your Arrow",
        artistName: "Kacey Musgraves",
        songUri: "spotify:track:4CLPNURPcKztF9RRdcWLGP",
        songLength: 199640
      },
      {
        songName: "Redneck Woman",
        artistName: "Gretchen Wilson",
        songUri: "spotify:track:26bL4gSULWDgdIMX0pRFrG",
        songLength: 221333
      },
      {
        songName: "Woulda Left Me Too",
        artistName: "Ryan Griffin",
        songUri: "spotify:track:5GOLGi2dpY0oYwVmxZXjL8",
        songLength: 223880
      },
      {
        songName: "Buy Myself A Chance",
        artistName: "Randy Rogers Band",
        songUri: "spotify:track:1EHNNWLiWe1PJADKEnMvIr",
        songLength: 221626
      },
      {
        songName: "Right Or Wrong",
        artistName: "George Strait",
        songUri: "spotify:track:79WaXLL2fKLxBE77Oh0Al6",
        songLength: 125973
      },
      {
        songName: "Goodbye Earl",
        artistName: "Dixie Chicks",
        songUri: "spotify:track:4HN6Eun4JnXnjaQ8b1J1MS",
        songLength: 258640
      },
      {
        songName: "Past The Point Of Rescue",
        artistName: "Hal Ketchum",
        songUri: "spotify:track:6DqzLbXkxRUbvFyzWApTXM",
        songLength: 267466
      },
      {
        songName: "Flatliner",
        artistName: "Cole Swindell",
        songUri: "spotify:track:0WyFpxYlBCgH1gMXd26OOr",
        songLength: 177066
      },
      {
        songName: "Suds in the Bucket",
        artistName: "Sara Evans",
        songUri: "spotify:track:19zb0fxeiJqCLYHj6L8iYG",
        songLength: 227266
      },
      {
        songName: "Reload (feat. Taylor Ray Holbrook)",
        artistName: "Colt Ford",
        songUri: "spotify:track:4PKPYaqznLL7PVwM6U3vWq",
        songLength: 177704
      },
      {
        songName: "I Need You",
        artistName: "Faith Hill",
        songUri: "spotify:track:69CIs9za4BDajb7hnbDBX8",
        songLength: 247973
      },
      {
        songName: "Bottoms Up",
        artistName: "Brantley Gilbert",
        songUri: "spotify:track:7nDoBWDvf02SyD8kEQuuPO",
        songLength: 221226
      }
    ];
    dispatch(setWeather(testWeather));
    dispatch(setPlayList(testPlayList));
    dispatch(setCurrentMusicURI(testPlayList[0].songUri));
    const weatherBackground = document.body.querySelector(".container");
    weatherBackground.style.backgroundImage = `url(${choseBackGround(
      testWeather.type //should be actual weather not test data
    )})`;

    // });
  }, []);

  const setDisplay = () => {
    if (selectedGenre) {
      return <PlayList />;
    } else {
      return <GenreList />;
    }
  };
  const selectedGenre = useSelector(state => state.selectedGenre);
  const weather = useSelector(state => state.weather);
  return (
    <div className="App">
      <Header />
      <div className="container">{setDisplay()}</div>
    </div>
  );
}

export default App;
