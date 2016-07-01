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

    // Chart labels
    $scope.labels = ['Anger','Disgust','Fear','Joy','Sadness'];
    //chart colors
    $scope.colors = ['#7b8cfe','#fe7bc6','#7af7dd','#e98e53', '#bd99f2'];
    $scope.series = ['English']
    // Initial data values
    $scope.chartData = [[0.444448, 0.145185, 0.952924, 0.032998, 0.44381]]

    $scope.$on('updateData', function(event, newValue) {
      englishData = newValue;
    })

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
        console.log($scope.chartData);
      })
    }
  }

}());
