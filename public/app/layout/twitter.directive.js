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
        $scope.chartData[0] = vm.toneData[0].tones[0].score;
        $scope.chartData[1] = vm.toneData[0].tones[1].score;
        $scope.chartData[2] = vm.toneData[0].tones[2].score;
        $scope.chartData[3] = vm.toneData[0].tones[3].score;
        $scope.chartData[4] = vm.toneData[0].tones[4].score;
        console.log($scope.chartData);
      })
    }
  }

}());
