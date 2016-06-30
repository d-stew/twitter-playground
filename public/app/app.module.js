(function() {
  'use strict';

  var dependencies = [
    'ui.router'
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

    // intial data values
    $scope.brexitData = [0,0,0,0,0,0,0];
    $scope.coordinates = [];
    $scope.englishData = "";

    socket.on('newTweet', function (tweet) {
      $scope.tweet = tweet.text
      $scope.user = tweet.user.screen_name

      // parse language and location
      var lang = tweet.lang
      var coords = tweet.coordinates
      var place = tweet.place
      var geo = tweet.geo

      // push tweet into cloudText
      if (lang === "en") {
        $scope.englishData += tweet.text + " "
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

      $rootScope.$broadcast('updateData', $scope.englishData)
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
