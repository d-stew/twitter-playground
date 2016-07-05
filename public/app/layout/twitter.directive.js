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
    var englishData, frenchData, spanishData, arabicData, portugueseData;

    // toggle for tone analysis options
    vm.display = 'language';
    vm.setDisplay = function(display) {
      vm.display = display;
    }

    // bar chart colors
    $scope.colors = ['#7b8cfe','#fe7bc6','#7af7dd', '#f7ba7a'];
    // bar chart series
    $scope.series = ['English', 'French', 'Spanish', 'Arabic']
    // bar chart labels
    $scope.langLabels = ['English','French','Spanish','Arabic']
    // bar chart configs
    $scope.angerData = [[0.15,0.15,0.15,0.15]]
    $scope.angerColors = ['#f56868'];
    $scope.angerSeries = ['Anger']

    $scope.disgustData = [[0.15,0.15,0.15,0.15]]
    $scope.disgustColors = ['#7bfecb'];
    $scope.disgustSeries = ['Disgust']

    $scope.fearData = [[0.15,0.15,0.15,0.15]]
    $scope.fearColors = ['#915df1'];
    $scope.fearSeries = ['Fear']

    $scope.joyData = [[0.15,0.15,0.15,0.15]]
    $scope.joyColors = ['#ffe082'];
    $scope.joySeries = ['Joy']

    $scope.sadnessData = [[0.15,0.15,0.15,0.15]]
    $scope.sadnessColors = ['#7a8bf7']
    $scope.sadnessSeries = ['Sadness']

    // radar labels
    $scope.labels = ['Anger','Disgust','Fear','Joy','Sadness'];
    // radar chart configs
    $scope.englishRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.englishRadarColors = ['#7b8cfe']
    $scope.englishRadarSeries = ['English']

    $scope.frenchRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.frenchRadarColors = ['#fe7bc6']
    $scope.frenchRadarSeries = ['French']

    $scope.spanishRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.spanishRadarColors = ['#7af7dd']
    $scope.spanishRadarSeries = ['Spanish']

    $scope.arabicRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.arabicRadarColors = ['#f7ba7a']
    $scope.arabicRadarSeries = ['Arabic']

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
      // englishAnalyzer();
      // frenchAnalyzer();
      // spanishAnalyzer();
      // arabicAnalyzer();
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
        console.log(toneData);
        vm.englishToneData = toneData
        $scope.angerData[0][0] = vm.englishToneData[0].tones[0].score;
        $scope.disgustData[0][0] = vm.englishToneData[0].tones[1].score;
        $scope.fearData[0][0] = vm.englishToneData[0].tones[2].score;
        $scope.joyData[0][0] = vm.englishToneData[0].tones[3].score;
        $scope.sadnessData[0][0] = vm.englishToneData[0].tones[4].score;

        $scope.englishRadar[0][0] = vm.englishToneData[0].tones[0].score
        $scope.englishRadar[0][1] = vm.englishToneData[0].tones[1].score
        $scope.englishRadar[0][2] = vm.englishToneData[0].tones[2].score
        $scope.englishRadar[0][3] = vm.englishToneData[0].tones[3].score
        $scope.englishRadar[0][4] = vm.englishToneData[0].tones[4].score
      })
    }

    // pass french data to watson
    function frenchAnalyzer() {
      if (!frenchData.length) return;
      twitterService.frenchAnalyzer(frenchData)
      .then(function(toneData) {
        vm.frenchToneData = toneData
        $scope.angerData[0][1] = vm.frenchToneData[0].tones[0].score;
        $scope.disgustData[0][1] = vm.frenchToneData[0].tones[1].score;
        $scope.fearData[0][1] = vm.frenchToneData[0].tones[2].score;
        $scope.joyData[0][1] = vm.frenchToneData[0].tones[3].score;
        $scope.sadnessData[0][1] = vm.frenchToneData[0].tones[4].score;

        $scope.frenchRadar[0][0] = vm.frenchToneData[0].tones[0].score;
        $scope.frenchRadar[0][1] = vm.frenchToneData[0].tones[1].score;
        $scope.frenchRadar[0][2] = vm.frenchToneData[0].tones[2].score;
        $scope.frenchRadar[0][3] = vm.frenchToneData[0].tones[3].score;
        $scope.frenchRadar[0][4] = vm.frenchToneData[0].tones[4].score;
      })
    }

    // pass spanish data to watson
    function spanishAnalyzer() {
      if (!spanishData.length) return;
      twitterService.spanishAnalyzer(spanishData)
      .then(function(toneData) {
        vm.spanishToneData = toneData
        $scope.angerData[0][2] = vm.spanishToneData[0].tones[0].score;
        $scope.disgustData[0][2] = vm.spanishToneData[0].tones[1].score;
        $scope.fearData[0][2] = vm.spanishToneData[0].tones[2].score;
        $scope.joyData[0][2] = vm.spanishToneData[0].tones[3].score;
        $scope.sadnessData[0][2] = vm.spanishToneData[0].tones[4].score;

        $scope.spanishRadar[0][0] = vm.spanishToneData[0].tones[0].score;
        $scope.spanishRadar[0][1] = vm.spanishToneData[0].tones[1].score;
        $scope.spanishRadar[0][2] = vm.spanishToneData[0].tones[2].score;
        $scope.spanishRadar[0][3] = vm.spanishToneData[0].tones[3].score;
        $scope.spanishRadar[0][4] = vm.spanishToneData[0].tones[4].score;
      })
    }

    // pass arabic data to watson
    function arabicAnalyzer() {
      if (!arabicData.length) return;
      twitterService.arabicAnalyzer(arabicData)
      .then(function(toneData) {
        vm.arabicToneData = toneData
        $scope.angerData[0][3] = vm.arabicToneData[0].tones[0].score;
        $scope.disgustData[0][3] = vm.arabicToneData[0].tones[1].score;
        $scope.fearData[0][3] = vm.arabicToneData[0].tones[2].score;
        $scope.joyData[0][3] = vm.arabicToneData[0].tones[3].score;
        $scope.sadnessData[0][3] = vm.arabicToneData[0].tones[4].score;

        $scope.arabicRadar[0][0] = vm.arabicToneData[0].tones[0].score;
        $scope.arabicRadar[0][1] = vm.arabicToneData[0].tones[1].score;
        $scope.arabicRadar[0][2] = vm.arabicToneData[0].tones[2].score;
        $scope.arabicRadar[0][3] = vm.arabicToneData[0].tones[3].score;
        $scope.arabicRadar[0][4] = vm.arabicToneData[0].tones[4].score;
      })
    }

  }

}());
