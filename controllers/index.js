const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
const SpotifyWebApi = require("spotify-web-api-node");
const path = require("path");

//weather table lookup and spotify seeds//
const weatherTable = [
  { sunny: ["clear-day"] },
  { rainy: ["rain"] },
  { snowy: ["snow", "sleet", "hail"] },
  { cloudy: ["fog", "cloudy", "partly-cloudy-day"] },
  { windy: ["wind", "thunderstorm", "tornado"] },
  { night: ["clear-night", "partly-cloudy-night"] }
];
const seedTable = {
  sunny: {
    min_danceability: 0.7,
    min_energy: 0.5
  },
  rainy: {
    min_acousticness: 0.8,
    max_energy: 0.5,
    max_valence: 0.5
  },
  snowy: {
    max_energy: 0.7,
    min_energy: 0.4,
    max_valance: 0.8
  },
  cloudy: {
    max_valance: 0.4
  },
  windy: {
    max_accousticness: 0.4,
    max_valance: 0.4,
    max_danceability: 0.8
  },
  night: { min_valance: 0.8, min_accousticness: 0.7 }
};

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  scope: "user-read-private user-read-email playlist-modify-public"
});

//Weather Endpoint//
router.post("/currentTemp/", async (req, res) => {
  const user = req.body;
  const weather = await axios(
    `https://api.darksky.net/forecast/04edede39ba708712513c5d698fcddbe/${user.longtitude},${user.latitude}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
        "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff"
      }
    }
  );
  const icon = weather.data.currently.icon;
  let weatherType = weatherTable.find(w => {
    const value = Object.values(w);
    return value[0].includes(icon);
  });
  const tempFar = weather.data.currently.temperature;
  console.log(tempFar);
  const tempCelcius = await axios(
    `https://congen-temperature-converter-v1.p.rapidapi.com/fahrenheit?to=celsius&value=${tempFar}&decimal=2`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "congen-temperature-converter-v1.p.rapidapi.com",
        "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff",
        "content-type": "application/json"
      }
    }
  ).catch(err => {
    console.log(err);
  });
  weatherType = Object.keys(weatherType).pop();
  const weatherInfo = {
    type: 'night',
    temperature: tempCelcius.data.data.resultRaw
  };
  console.log(weatherInfo);
  return res.status(200).send(weatherInfo);
});

//playlist Endpoint//
router.post("/playlist/", async (req, res) => {
  const user = req.body;
  const weather = await axios(
    `https://api.darksky.net/forecast/f741040493f931e549408de7bdc46875/${user.longtitude},${user.latitude}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
        "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff"
      }
    }
  );
  const icon = weather.data.currently.icon;
  let weatherType = weatherTable.find(w => {
    const value = Object.values(w);
    return value[0].includes(icon);
  });
  const tempFar = weather.data.currently.temperature;
  console.log(tempFar);
  const tempCelcius = await axios(
    `https://congen-temperature-converter-v1.p.rapidapi.com/fahrenheit?to=celsius&value=${tempFar}&decimal=2`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "congen-temperature-converter-v1.p.rapidapi.com",
        "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff",
        "content-type": "application/json"
      }
    }
  ).catch(err => {
    console.log(err);
  });
  weatherType = Object.keys(weatherType).pop();
  const weatherInfo = {
    type: 'night',
    temperature: tempCelcius.data.data.resultRaw
  };
  console.log(weatherInfo.temperature);
  let seedInfo;
  for (let item in seedTable) {
    if (item === weatherType) seedInfo = seedTable[item];
  }
  seedInfo.seed_genres = [user.genre];
  if(seedInfo.seed_genres == 'metal'){
    seedInfo.min_danceability= 0
    
  }

  const token = await axios({
    url: "https://accounts.spotify.com/api/token",
    method: "post",
    params: {
      grant_type: "client_credentials",
      scope: "user-read-private user-read-email playlist-modify-public"
    },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: process.env.CLIENT_ID,
      password: process.env.CLIENT_SECRET
    }
  });
  spotifyApi.setAccessToken(token.data.access_token);

  const musicInfo = await spotifyApi
    .getRecommendations(seedInfo)
    .then(data => {
      return data.body.tracks.map(song => {
        return {
          songName: song.name,
          artistName: song.artists[0].name,
          songUri: song.uri,
          songLength: song.duration_ms
        };
      });
    })
    .catch(err => {
      console.log(err);
    });

  const allData = {
    weather: weatherInfo,
    playlist: musicInfo
  };

  return res.status(200).send(allData);

  const playlist = await fetch(
    "https://spotifystefan-skliarovv1.p.rapidapi.com/createPlaylist",
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "Spotifystefan-skliarovV1.p.rapidapi.com",
        "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff",
        "content-type": "application/x-www-form-urlencoded"
      },
      body: {}
    }
  )
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
