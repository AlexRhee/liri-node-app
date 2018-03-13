require("dotenv").config();
var request = require("request");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var keys = require('./keys.js');
var fs = require("fs");




var command = process.argv[2];
var input = process.argv[3];

if (command === "do-what-it-says") {
    fs.readFile("./random.txt", "utf8", function (error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        command = dataArr[0];
        input = dataArr[1];

        if (command === "my-tweets") {
            var client = new Twitter({
                consumer_key: process.env.TWITTER_CONSUMER_KEY,
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
                access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
            });

            var params = { screen_name: 'nodejs' };
            client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                    for (var i = 0; i < 20; i++)
                        console.log("Tweet: " + tweets[i].text);
                    console.log("Created: " + tweets[i].created_at);
                }
            });
        };

        if (command === "spotify-this-song") {
            var spotify = new Spotify({
                id: process.env.SPOTIFY_ID,
                secret: process.env.SPOTIFY_SECRET
            });

            if (input === undefined) {
                input = "the sign ace of base";
            }


            spotify
                .search({ type: 'track', query: input })
                .then(function (response) {
                    console.log(JSON.stringify(response.tracks.items[0].artists[0].name));
                    console.log(JSON.stringify(response.tracks.items[0].name));
                    console.log(JSON.stringify(response.tracks.items[0].external_urls.spotify));
                    console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
                })
                .catch(function (err) {
                    console.log(err, null, 2);
                });
        };

        if (command === "movie-this") {
            var input = process.argv[3];

            if (input === undefined) {
                input = "Mr Nobody";
            }
            var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

            request(queryUrl, function (error, response, body) {


                if (!error && response.statusCode === 200) {

                    console.log(JSON.parse(body).Title);
                    console.log(JSON.parse(body).Year);
                    console.log(JSON.parse(body).imdbRating);
                    console.log(JSON.parse(body).Ratings[1].Value);
                    console.log(JSON.parse(body).Country);
                    console.log(JSON.parse(body).Language);
                    console.log(JSON.parse(body).Plot);
                    console.log(JSON.parse(body).Actors);
                }
            });
        }




    });


}
else {
    if (command === "my-tweets") {
        var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });

        var params = { screen_name: 'nodejs' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < 20; i++)
                    console.log("Tweet: " + tweets[i].text);
                console.log("Created: " + tweets[i].created_at);
            }
        });
    };

    if (command === "spotify-this-song") {
        var spotify = new Spotify({
            id: process.env.SPOTIFY_ID,
            secret: process.env.SPOTIFY_SECRET
        });

        if (input === undefined) {
            input = "the sign ace of base";
        }


        spotify
            .search({ type: 'track', query: input })
            .then(function (response) {
                console.log(JSON.stringify(response.tracks.items[0].artists[0].name));
                console.log(JSON.stringify(response.tracks.items[0].name));
                console.log(JSON.stringify(response.tracks.items[0].external_urls.spotify));
                console.log(JSON.stringify(response.tracks.items[0].album.name, null, 2));
            })
            .catch(function (err) {
                console.log(err, null, 2);
            });
    };

    if (command === "movie-this") {
        var input = process.argv[3];

        if (input === undefined) {
            input = "Mr Nobody";
        }
        var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function (error, response, body) {


            if (!error && response.statusCode === 200) {

                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).Year);
                console.log(JSON.parse(body).imdbRating);
                console.log(JSON.parse(body).Ratings[1].Value);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
            }
        });
    }
}

