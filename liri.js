require("dotenv").config();
var keys = require("./keys")
var request = require("request")

// Takes an artist and searches the Bands in Town 
// Artist API for an artist and render information
var concertThis = function(artist){

    var queryUrl = "https://rest.bandsintown.com/artists/" + artist.replace(" ", "+") + "/events?app_id=codingbootcamp"
    console.log(queryUrl);
    
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Need to return Name of venue, Venue location, Date of event (MM/DD/YYYY)
            console.log("Venue: " + JSON.parse(body)[0].venue.name)
            console.log("Location: " + JSON.parse(body)[0].venue.city + ", " + JSON.parse(body)[0].venue.region);
            console.log("Date: " + JSON.parse(body)[0].datetime)

            // Log everything to log.txt
        }
    })
    // Log everything to log.txt
}

// This will take a song, search spotify and return information
var spotifyThisSong = function(song){

    var spotify = new Spotify(keys.spotify);
    //https://www.npmjs.com/package/node-spotify-api

    // Need to return Artist(s), Song Name, Album, Preview link of song from Spotify

    // Default should be "The Sign" by Ace of Base

    // Log everything to log.txt
}

// This will take a movie, search IMDb and return information
var movieThis = function(movie){
    // Default should be "Mr. Nobody"
    if (movie === ""){
        movie = "Mr.+Nobody"
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    // Then create a request to the queryUrl
    request(queryUrl, function(err, response, body){
        // If the request is successful
        if (!err && response.statusCode === 200) {
            // Need to return: Title, Year, IMDB Rating, Rotten Tomatoes Rating, Country, 
            // Language, Plot, Actors
            console.log("Title: " + JSON.parse(body).Title)
            console.log("Release year: " + JSON.parse(body).Year)
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value)
            console.log("Country: " + JSON.parse(body).Country)
            console.log("Language: " + JSON.parse(body).Language)
            console.log("Plot: " + JSON.parse(body).Plot)
            console.log("Actors: " + JSON.parse(body).Actors)

            // Log everything to log.txt
        }
    })
}

// Using the `fs` Node package, LIRI will take the text inside of random.txt
// and then use it to call one of LIRI's commands.
var doWhatItSays = function(){

    // read from file

    // call appropriate function and pass arguement

}

switch (process.argv[2]) {
    case "concert-this":
        concertThis(process.argv[3])
        break
    case "spotify-this-song":
        spotifyThisSong(process.argv[3])
        break
    case "movie-this":
        movieThis(process.argv[3])
        break
    case "do-what-it-says":
        doWhatItSays()
        break
    default:
        console.log("That is not a command that I recognize, please try again.") 
}




