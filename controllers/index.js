const express = require("express");
// const path = require("path");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();
//spotify web api node library
const SpotifyWebApi = require("spotify-web-api-node");

const weatherTable = [
  { sunny: ["clear-day"] },
  { rainy: ["rain"] },
  { snowy: ["snow", "sleet", "hail"] },
  { cloudy: ["fog", "cloudy", "partly-cloudy-day"] },
  { windy: ["wind", "thunderstorm", "tornado"] },
  { night: ["clear-night", "partly-cloudy-night"] }
];
const seedTable = {
  sunny: { min_danceability: 0.8, min_energy: 0.9, min_popularity: 70 },
  rainy: {
    min_acousticness: 0.8,
    max_energy: 0.3,
    max_valence: 0.5,
    min_popularity: 70
  },
  snowy: {
    max_energy: 0.7,
    min_energy: 0.4,
    max_valance: 0.8,
    min_popularity: 70
  },
  cloudy: {
    max_energy: 0.3,
    max_danceability: 0.4,
    max_valance: 0.3,
    min_popularity: 70
  },
  windy: {
    max_accousticness: 0.4,
    max_valance: 0.4,
    max_danceability: 0.8,
    min_popularity: 70
  }
};
const night = { min_valance: 0.8, min_accousticness: 0.7, min_popularity: 70 };
// Valance(0.5)
// Popularity (min_70)

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
});

router.post("/playlist/", (req, res) => {
  // console.log(req.body);
  const user = req.body;
  axios(
    `https://dark-sky.p.rapidapi.com/${user.longtitude},${user.latitude}?lang=en&units=auto`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "dark-sky.p.rapidapi.com",
        "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff"
      }
    }
  )
    .then(response => {
      const weather = response.data.currently.icon;
      return weatherTable.find(w => {
        const value = Object.values(w);

        return value[0].includes(weather);
      });
    })
    .then(response => {
      const weather = Object.keys(response).pop();
      let seed;
      for (let item in seedTable) {
        if (item === weather) seed = seedTable[item];
      }

      return axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        params: {
          grant_type: "client_credentials"
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: process.env.CLIENT_ID,
          password: process.env.CLIENT_SECRET
        }
      }).then(response => {
        spotifyApi.setAccessToken(response.data.access_token);
        let playList;
        spotifyApi.getRecommendations(
          {
            min_energy: 0.4,
            seed_genres: ["country"],
            min_popularity: 0
          },
          function(err, data) {
            if (err) {
              console.error("Something went wrong!");
            } else {
              playList = data.body;
              console.log(playList)
              return data.body;
            }
          }
        );
        console.log(playList)
        return playList;
      });
    })
    .then(res => {
      console.log(res);
    })
    .catch(function(error) {});
});

module.exports = router;
