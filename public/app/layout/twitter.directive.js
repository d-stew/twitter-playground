(function() {
  'use strict';

  angular.module('app')
    .directive('twitter', twitterDirective);

  function twitterDirective () {
    return {
      restrict: 'E',
      templateUrl: '/app/layout/twitter.directive.html',
      controller: twitterController,
      controllerAs: 'vm'
    }
  }

  twitterController.$inject = ['$scope', 'twitterService', '$interval']

  function twitterController($scope, twitterService, $interval) {

    var vm = this;
    var locations;
    var englishData;
    var frenchData;
    var spanishData;
    var arabicData;
    var portugueseData;

    vm.display = 'language';

    vm.setDisplay = function(display) {
      vm.display = display;
    }

    // bar chart labels
    $scope.labels = ['Anger','Disgust','Fear','Joy','Sadness'];
    // bar chart colors
    $scope.colors = ['#7b8cfe','#fe7bc6','#7af7dd'];
    // bar chart series
    $scope.series = ['English', 'French', 'Spanish']
    // bar chart initial data values
    $scope.chartData = [
      [0.01, 0.01, 0.01, 0.01, 0.01],
      [0.01, 0.01, 0.01, 0.01, 0.01],
      [0.01, 0.01, 0.01, 0.01, 0.01]
    ]

    $scope.englishRadar = [ [0.25, 0.35, 0.5, 0.75, 0.85] ]
    $scope.englishRadarColors = ['#7b8cfe']
    $scope.englishRadarSeries = ['English']

    $scope.frenchRadar = [ [0.10, 0.62, 0.33, 0.52, 0.95] ]
    $scope.frenchRadarColors = ['#fe7bc6']
    $scope.frenchRadarSeries = ['French']

    $scope.spanishRadar = [ [0.66, 0.10, 0.21, 0.82, 0.88] ]
    $scope.spanishRadarColors = ['#7af7dd']
    $scope.spanishRadarSeries = ['Spanish']

    // auto-update location data
    $scope.$on('updateLocations', function(event, newValue) {
      locations = newValue;
    })

    // auto-update data for each language
    $scope.$on('updateEnglishData', function(event, newValue) {
      englishData = newValue;
    })
    $scope.$on('updateFrenchData', function(event, newValue) {
      frenchData = newValue;
    })
    $scope.$on('updateSpanishData', function(event, newValue) {
      spanishData = newValue;
    })
    $scope.$on('updateArabicData', function(event, newValue) {
      arabicData = newValue;
    })
    $scope.$on('updatePortugueseData', function(event, newValue) {
      portugueseData = newValue;
    })

    // refresh hashtag, location and tone data every 5 seconds
    $interval(function() {
      getHashtagData();
      getLocationData();
      englishAnalyzer();
      frenchAnalyzer();
      spanishAnalyzer();
    }, 5000)

    function getHashtagData() {
      vm.tags = twitterService.hashtagData(englishData);
    }

    function getLocationData() {
      vm.topLocations = twitterService.locationData(locations);
    }

    // pass english data to watson
    function englishAnalyzer() {
      twitterService.englishAnalyzer(englishData)
      .then(function(toneData) {
        vm.englishToneData = toneData
        $scope.chartData[0][0] = vm.englishToneData[0].tones[0].score;
        $scope.englishRadar[0][0] = vm.englishToneData[0].tones[0].score
        $scope.chartData[0][1] = vm.englishToneData[0].tones[1].score;
        $scope.englishRadar[0][1] = vm.englishToneData[0].tones[1].score
        $scope.chartData[0][2] = vm.englishToneData[0].tones[2].score;
        $scope.englishRadar[0][2] = vm.englishToneData[0].tones[2].score
        $scope.chartData[0][3] = vm.englishToneData[0].tones[3].score;
        $scope.englishRadar[0][3] = vm.englishToneData[0].tones[3].score
        $scope.chartData[0][4] = vm.englishToneData[0].tones[4].score;
        $scope.englishRadar[0][4] = vm.englishToneData[0].tones[4].score
      })
    }

    // pass french data to watson
    function frenchAnalyzer() {
      if (!frenchData.length) return;
      twitterService.frenchAnalyzer(frenchData)
      .then(function(toneData) {
        vm.frenchToneData = toneData
        $scope.chartData[1][0] = vm.frenchToneData[0].tones[0].score;
        $scope.frenchRadar[0][0] = vm.frenchToneData[0].tones[0].score;
        $scope.chartData[1][1] = vm.frenchToneData[0].tones[1].score;
        $scope.frenchRadar[0][1] = vm.frenchToneData[0].tones[1].score;
        $scope.chartData[1][2] = vm.frenchToneData[0].tones[2].score;
        $scope.frenchRadar[0][2] = vm.frenchToneData[0].tones[2].score;
        $scope.chartData[1][3] = vm.frenchToneData[0].tones[3].score;
        $scope.frenchRadar[0][3] = vm.frenchToneData[0].tones[3].score;
        $scope.chartData[1][4] = vm.frenchToneData[0].tones[4].score;
        $scope.frenchRadar[0][4] = vm.frenchToneData[0].tones[4].score;
      })
    }

    // pass spanish data to watson
    function spanishAnalyzer() {
      if (!spanishData.length) return;
      twitterService.spanishAnalyzer(spanishData)
      .then(function(toneData) {
        vm.spanishToneData = toneData
        $scope.chartData[2][0] = vm.spanishToneData[0].tones[0].score;
        $scope.spanishRadar[0][0] = vm.spanishToneData[0].tones[0].score;
        $scope.chartData[2][1] = vm.spanishToneData[0].tones[1].score;
        $scope.spanishRadar[0][1] = vm.spanishToneData[0].tones[1].score;
        $scope.chartData[2][2] = vm.spanishToneData[0].tones[2].score;
        $scope.spanishRadar[0][2] = vm.spanishToneData[0].tones[2].score;
        $scope.chartData[2][3] = vm.spanishToneData[0].tones[3].score;
        $scope.spanishRadar[0][3] = vm.spanishToneData[0].tones[3].score;
        $scope.chartData[2][4] = vm.spanishToneData[0].tones[4].score;
        $scope.spanishRadar[0][4] = vm.spanishToneData[0].tones[4].score;
      })
    }

  }

}());
