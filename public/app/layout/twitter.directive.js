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

    // chart labels
    $scope.labels = ['Anger','Disgust','Fear','Joy','Sadness'];
    // chart colors
    $scope.colors = ['#7b8cfe','#fe7bc6','#7af7dd','#e98e53', '#bd99f2'];
    // chart series
    $scope.series = ['English', 'French', 'Spanish']
    // initial data values
    $scope.chartData = [[0.444448, 0.145185, 0.952924, 0.032998, 0.44381],[0.25, 0.33, 0.80, 0.05, 0.15],[0.15, 0.3, 0.66, 0.12, 0.24]]
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
      console.log(frenchData);
    })
    $scope.$on('updateSpanishData', function(Event, newValue) {
      spanishData = newValue;
      console.log(spanishData);
    })

    // refresh wordcloud and tone data every 5 seconds
    $interval(function() {
      getData();
      toneAnalyzer();
    }, 5000)

    function getData() {
      vm.tags = twitterService.cloudData(englishData);
    }

    function toneAnalyzer() {
      twitterService.toneAnalyzer(englishData)
      .then(function(toneData) {
        vm.toneData = toneData
        $scope.chartData[0][0] = vm.toneData[0].tones[0].score;
        $scope.chartData[0][1] = vm.toneData[0].tones[1].score;
        $scope.chartData[0][2] = vm.toneData[0].tones[2].score;
        $scope.chartData[0][3] = vm.toneData[0].tones[3].score;
        $scope.chartData[0][4] = vm.toneData[0].tones[4].score;
      })
    }
  }

}());
