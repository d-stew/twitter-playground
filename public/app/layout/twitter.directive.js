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
    var englishData;
    var frenchData;
    var spanishData;
    var arabicData;
    var portugueseData;

    // chart labels
    $scope.labels = ['Anger','Disgust','Fear','Joy','Sadness'];
    // chart colors
    $scope.colors = ['#7b8cfe','#fe7bc6','#7af7dd','#e98e53', '#bd99f2'];
    // chart series
    $scope.series = ['English', 'French', 'Spanish', 'Arabic', 'Portguese']
    // initial data values
    $scope.chartData = [
      [0.25, 0.25, 0.25, 0.25, 0.25],
      [0.01, 0.01, 0.01, 0.01, 0.01],
      [0.01, 0.01, 0.01, 0.01, 0.01],
      [0.01, 0.01, 0.01, 0.01, 0.01],
      [0.01, 0.01, 0.01, 0.01, 0.01]
    ]
    // chart options
    $scope.options = {
      tooltipFontColor: '#FFF'
    }

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

    // refresh wordcloud and tone data every 5 seconds
    $interval(function() {
      getHashtagData();
      englishAnalyzer();
      // frenchAnalyzer();
    }, 5000)

    function getHashtagData() {
      vm.tags = twitterService.hashtagData(englishData);
    }

    // pass english data to watson
    function englishAnalyzer() {
      twitterService.englishAnalyzer(englishData)
      .then(function(toneData) {
        vm.englishToneData = toneData
        $scope.chartData[0][0] = vm.englishToneData[0].tones[0].score;
        $scope.chartData[0][1] = vm.englishToneData[0].tones[1].score;
        $scope.chartData[0][2] = vm.englishToneData[0].tones[2].score;
        $scope.chartData[0][3] = vm.englishToneData[0].tones[3].score;
        $scope.chartData[0][4] = vm.englishToneData[0].tones[4].score;
      })
    }

    // function frenchAnalyzer() {
    //   console.log('French - Directive')
    //   if (!frenchData.length) return;
    //   twitterService.frenchAnalyzer(frenchData)
    //   .then(function(toneData) {
    //     vm.frenchToneData = toneData
    //     $scope.chartData[1][0] = vm.frenchToneData[0].tones[0].score;
    //     $scope.chartData[1][1] = vm.frenchToneData[0].tones[1].score;
    //     $scope.chartData[1][2] = vm.frenchToneData[0].tones[2].score;
    //     $scope.chartData[1][3] = vm.frenchToneData[0].tones[3].score;
    //     $scope.chartData[1][4] = vm.frenchToneData[0].tones[4].score;
    //   })
    // }
  }

}());
