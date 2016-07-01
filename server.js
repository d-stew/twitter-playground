require('dotenv').config();
var debug = require('debug')('sockettest:server');
var http = require('http');
var port = '3000';
var app = require('./app');
var Twitter = require('twitter');

var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port 3000...');
});

var io = require('socket.io').listen(server);

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var hashtags = '#rio2016';

client.stream('statuses/filter', {track: hashtags}, function(stream) {
  stream.on('data', function(tweet) {
    io.emit('newTweet', tweet);
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
