require("dotenv").config();
var keys = require("./keys")
var request = require("request")
var Spotify = require("node-spotify-api")
var dateFormat = require("dateFormat")
var fs = require("fs")

// Takes an artist and searches the Bands in Town 
// Artist API for an artist and render information
var concertThis = function(artist){

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
    //console.log(queryUrl);
    
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Need to return Name of venue, Venue location, Date of event (MM/DD/YYYY)
            outputData("Venue: " + JSON.parse(body)[0].venue.name)
            outputData("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
            outputData("Date: " + dateFormat(JSON.parse(body)[0].datetime, "mm/dd/yyyy"))
        }
    })
}

// This will take a song, search spotify and return information
var spotifyThisSong = function(song){
    // Default should be "The Sign" by Ace of Base
    if (!song){
        song = "The Sign Ace of Base"
    }

    var spotify = new Spotify(keys.spotify);

    spotify.search({type: "track", query: song, limit: 1}, function (err, data){
        if (err) {
            return console.log(err)
        }

        // Need to return Artist(s), Song Name, Album, Preview link of song from Spotify
        var songInfo = data.tracks.items[0]
        outputData(songInfo.artists[0].name)
        outputData(songInfo.name)
        outputData(songInfo.album.name)
        outputData(songInfo.preview_url)
    })
}

// This will take a movie, search IMDb and return information
var movieThis = function(movie){
    // Default should be "Mr. Nobody"
    if (!movie){
        movie = "Mr.+Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);

    // Then create a request to the queryUrl
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Need to return: Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country, 
            // Language, Plot, Actors
            outputData("Title: " + JSON.parse(body).Title)
            outputData("Release year: " + JSON.parse(body).Year)
            outputData("IMDB Rating: " + JSON.parse(body).imdbRating)
            outputData("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
            outputData("Country: " + JSON.parse(body).Country)
            outputData("Language: " + JSON.parse(body).Language)
            outputData("Plot: " + JSON.parse(body).Plot)
            outputData("Actors: " + JSON.parse(body).Actors)
        }
    })
}

// Using the `fs` Node package, LIRI will take the text inside of random.txt
// and then use it to call one of LIRI's commands.
var doWhatItSays = function(){

    // read from file
    fs.readFile("random.txt", "utf8", function (err, data) {
        if(err){
            return console.log(err)
        }
        
        var dataArr = data.split(",")

        // call appropriate function and pass arguement
        runAction(dataArr[0], dataArr[1])
    });
}

// This function will handle outputting to the console and writing to log file
var outputData = function(data) {
    console.log(data)

    fs.appendFile("log.txt", "\r\n" + data, function (err){
        if(err){
            return console.log(err)
        } 
    })
}

var runAction = function(func, parm) {
    switch (func) {
        case "concert-this":
            concertThis(parm)
            break
        case "spotify-this-song":
            spotifyThisSong(parm)
            break
        case "movie-this":
            movieThis(parm)
            break
        case "do-what-it-says":
            doWhatItSays()
            break
        default:
            outputData("That is not a command that I recognize, please try again.") 
    }
}

runAction(process.argv[2], process.argv[3])





