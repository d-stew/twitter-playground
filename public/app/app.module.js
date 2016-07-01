(function() {
  'use strict';

  var dependencies = [
    'ui.router',
    'chart.js'
  ];

  angular.module('app', dependencies)
    .config(setupRoutes);

  setupRoutes.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider','$locationProvider'];
  function setupRoutes($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider){

    $stateProvider
      .state('app', {
        url: "/",
        template: "<main></main>",
        controller: controller
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

  controller.$inject = ['$scope', '$rootScope', 'socket'];
  function controller($scope, $rootScope, socket) {

    $scope.tweetQueue = []
    $scope.coordinates = [];
    $scope.englishData = "";
    $scope.frenchData = "";
    $scope.spanishData = "";
    $scope.arabicData = "";
    $scope.portugueseData = "";

    // parse data on new tweet
    socket.on('newTweet', function (tweet) {

      $scope.tweet = tweet.text
      $scope.user = tweet.user.screen_name

      // push new tweet into tweet queue
      if ($scope.tweetQueue.length < 4) {
        $scope.tweetQueue.unshift({user: $scope.user, tweet: $scope.tweet})
      } else {
        $scope.tweetQueue.pop();
        $scope.tweetQueue.unshift({user: $scope.user, tweet: $scope.tweet});
      }

      // parse language and location
      var lang = tweet.lang
      var coords = tweet.coordinates
      var place = tweet.place
      var geo = tweet.geo

      // distribute based on language
      if (lang === "en") {
        $scope.englishData += tweet.text + " ";
      }
      if (lang === "fr") {
        $scope.frenchData += tweet.text + " ";
      }
      if (lang === "es") {
        $scope.spanishData += tweet.text + " ";
      }
      if (lang === "ar") {
        $scope.arabicData += tweet.text + " ";
      }
      if (lang === "pt") {
        $scope.portugueseData += tweet.text + " ";
      }

      // check source for geolocation
      if (coords) {
        console.log("Coordinates: ", coords.coordinates);
        $scope.coordinates.push(coords.coordinates)
      }
      if (place) {
        console.log("Place: ", place.bounding_box.coordinates[0][0]);
        $scope.coordinates.push(place.bounding_box.coordinates[0][0])
      }
      if (geo) {
        console.log("Geo: ", geo.coordinates)
        $scope.coordinates.push(geo.coordinates)
      }

      // broadcast data updates
      $rootScope.$broadcast('updateEnglishData', $scope.englishData)
      $rootScope.$broadcast('updateFrenchData', $scope.frenchData)
      $rootScope.$broadcast('updateSpanishData', $scope.spanishData)
      $rootScope.$broadcast('updateArabicData', $scope.arabicData)
      $rootScope.$broadcast('updatePortugueseData', $scope.portugueseData)
    });

  }

  // SOCKET.IO METHODS
  angular.module('app').factory('socket', function ($rootScope) {
    var socket = io.connect();
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        });
      }
    };
  })

}());
