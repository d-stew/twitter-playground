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
    $scope.colors = ['#010b4a','#380101','#023d31', '#f74300'];
    // bar chart series
    $scope.series = ['English', 'French', 'Spanish', 'Portuguese']
    // bar chart labels
    $scope.langLabels = ['English','French','Spanish','Portuguese']
    // bar chart configs
    $scope.angerData = [[0.15,0.15,0.15,0.15]]
    $scope.angerSeries = ['Anger']
    $scope.angerColors = [{ // red
        fillColor: "rgba(240, 0, 5, 0.49)",
        strokeColor: "rgba(167, 0, 4, 1)",
        pointColor: "rgba(167, 0, 4, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(167, 0, 4, 0.8)"
    }];

    $scope.disgustData = [[0.15,0.15,0.15,0.15]]
    $scope.disgustSeries = ['Disgust']
    $scope.disgustColors = [{ // red
        fillColor: "rgba(0, 170, 78, 0.48)",
        strokeColor: "rgba(0, 75, 35, 1)",
        pointColor: "rgba(0, 75, 35, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0, 75, 35, 0.8)"
    }];

    $scope.fearData = [[0.15,0.15,0.15,0.15]]
    $scope.fearSeries = ['Fear']
    $scope.fearColors = [{ // red
        fillColor: "rgba(74, 0, 126, 0.45)",
        strokeColor: "rgba(83, 0, 148, 1)",
        pointColor: "rgba(83, 0, 148, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(83, 0, 148, 0.8)"
    }];

    $scope.joyData = [[0.15,0.15,0.15,0.15]]
    $scope.joySeries = ['Joy']
    $scope.joyColors = [{ // red
        fillColor: "rgba(227, 238, 0, 0.47)",
        strokeColor: "rgba(213, 180, 4, 1)",
        pointColor: "rgba(213, 180, 4, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(213, 180, 4, 0.8)"
    }];

    $scope.sadnessData = [[0.15,0.15,0.15,0.15]]
    $scope.sadnessSeries = ['Sadness']
    $scope.sadnessColors = [{ // red
        fillColor: "rgba(5, 0, 237, 0.5)",
        strokeColor: "rgba(0, 7, 107, 1)",
        pointColor: "rgba(0, 7, 107, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0, 7, 107, 0.8)"
    }]

    // radar labels
    $scope.labels = ['Anger','Disgust','Fear','Joy','Sadness'];
    // radar chart configs
    $scope.englishRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.englishRadarSeries = ['English']
    $scope.englishRadarColors = [{
        fillColor: "rgba(5, 7, 61, 0.61)",
        strokeColor: "rgba(1, 0, 51, 1)",
        pointColor: "rgba(1, 0, 51, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(0, 0, 46, 0.8)"
    }]

    $scope.frenchRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.frenchRadarSeries = ['French']
    $scope.frenchRadarColors = [{
        fillColor: "rgba(75, 0, 106, 0.64)",
        strokeColor: "rgba(40, 0, 64, 1)",
        pointColor: "rgba(40, 0, 64, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(40, 0, 64, 0.8)"
    }]

    $scope.spanishRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.spanishRadarSeries = ['Spanish']
    $scope.spanishRadarColors = [{
        fillColor: "rgba(255, 0, 0, 0.53)",
        strokeColor: "rgba(93, 0, 0, 1)",
        pointColor: "rgba(93, 0, 0, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(93, 0, 0, 0.8)"
    }]

    $scope.portugueseRadar = [ [0.50, 0.50, 0.50, 0.50, 0.50] ]
    $scope.portugueseRadarSeries = ['Portuguese']
    $scope.portugueseRadarColors = [{
        fillColor: "rgba(255, 115, 0, 0.55)",
        strokeColor: "rgba(236, 85, 0, 1)",
        pointColor: "rgba(236, 85, 0, 1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(236, 85, 0, 0.8)"
    }]

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
      portugueseAnalyzer();
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
    function portugueseAnalyzer() {
      if (!portugueseData.length) return;
      twitterService.portugueseAnalyzer(portugueseData)
      .then(function(toneData) {
        vm.portugueseData = toneData
        $scope.angerData[0][3] = vm.portugueseData[0].tones[0].score;
        $scope.disgustData[0][3] = vm.portugueseData[0].tones[1].score;
        $scope.fearData[0][3] = vm.portugueseData[0].tones[2].score;
        $scope.joyData[0][3] = vm.portugueseData[0].tones[3].score;
        $scope.sadnessData[0][3] = vm.portugueseData[0].tones[4].score;

        $scope.portugueseRadar[0][0] = vm.portugueseData[0].tones[0].score;
        $scope.portugueseRadar[0][1] = vm.portugueseData[0].tones[1].score;
        $scope.portugueseRadar[0][2] = vm.portugueseData[0].tones[2].score;
        $scope.portugueseRadar[0][3] = vm.portugueseData[0].tones[3].score;
        $scope.portugueseRadar[0][4] = vm.portugueseData[0].tones[4].score;
      })
    }

  }

}());
