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

router.post("/playlist/", async (req, res) => {
  // console.log(req.body);
  const user = req.body;
  // const weather = await axios(
  //   `https://dark-sky.p.rapidapi.com/${user.longtitude},${user.latitude}?lang=en&units=auto`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "x-rapidapi-host": "dark-sky.p.rapidapi.com",
  //       "x-rapidapi-key": "0255a54ceemsh45294c7d628c63bp1698e6jsnea8150048dff"
  //     }
  //   }
  // );
  // const icon = weather.data.currently.icon;
  // const weatherFixed = weatherTable.find(w => {
  //   const value = Object.values(w);
  //   return value[0].includes(icon);
  // });
  // const key = Object.keys(weatherFixed).pop();
  // let seed;
  // for (let item in seedTable) {
  //   if (item === weather) seed = seedTable[item];
  // }

  const token = await axios({
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
  });
  console.log(token.data.access_token);
  spotifyApi.setAccessToken(token.data.access_token);

  const allInfo = await spotifyApi
    .getRecommendations(
      {
        min_energy: 0.4,
        seed_genres: ["country"],
        min_popularity: 0
      }
      // async function(err, data) {
      //   if (err) {
      //     console.error("Something went wrong!", err);
      //   } else {

      // console.log("song_name", data.body.tracks[0].name);
      // console.log("name", data.body.tracks[0].artists[0].name);
      // console.log("uri", data.body.tracks[0].uri);
      // console.log("duration_ms", data.body.tracks[0].duration_ms);
      // playList = await data.body;
      //     return data;
      //   }
      // }
    )
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

    
    // .then(data => console.log(data))
    console.log(allInfo)

  // console.log("spotifyApi :", spotifyApi);
  // spotifyApi.getUserPlaylists("Overcast").then(
  //   function(data) {
  //     console.log("Retrieved playlists", data.body);
  //   },
  //   function(err) {
  //     console.log("Something went wrong! getUserPlaylists", err);
  //   }
  // );

  // spotifyApi.getUserPlaylists("4V5Nhc1KlyGirLFDPsxTuj").then(
  //   function(data) {
  //     console.log("Retrieved playlists", data.body);
  //   },
  //   function(err) {
  //     console.log("Something went wrong! getUserPlaylists", err);
  //   }
  // );
  // spotifyApi
  //   .addTracksToPlaylist("4V5Nhc1KlyGirLFDPsxTuj", [
  //     "spotify:track:4iV5W9uYEdYUVa79Axb7Rh",
  //     "spotify:track:1301WleyT98MSxVHPZCA6M"
  //   ])
  //   .then(
  //     function(data) {
  //       console.log("Added tracks to playlist!", data);
  //     },
  //     function(err) {
  //       console.log("Something went wrong addTracksToPlaylist!", err);
  //     }
  //   );
  // spotifyApi.getUserPlaylists("Overcast").then(
  //   function(data) {
  //     console.log("Retrieved playlists", data.body);
  //   },
  //   function(err) {
  //     console.log("Something went wrong! getUserPlaylists", err);
  //   }
  // );
  // spotifyApi.createPlaylist("My Cool Playlist", { public: true }).then(
  //   function(data) {
  //     console.log("Created playlist!");
  //   },
  //   function(err) {
  //     console.log("Something went wrong!", err);
  //   }
  // );
  // console.log(list);
});

module.exports = router;
