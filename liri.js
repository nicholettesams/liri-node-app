require("dotenv").config();
keys = require("./keys")

var spotify = new Spotify(keys.spotify);