require('dotenv').config();
let debug = require('debug')('sockettest:server');
let http = require('http');
let port = '3000';
let app = require('./app');
let Twitter = require('twitter');

let server = app.listen(3000, function () {
  console.log('Listening on port 3000...');
});

let io = require('socket.io').listen(server);

let client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

let hashtags = '#brexit';

client.stream('statuses/filter', {track: hashtags}, function(stream) {
  stream.on('data', function(tweet) {
    io.emit('newTweet', tweet);
    // console.log(tweet.text);
  });

  stream.on('error', function(error) {
    throw error;
  });
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
