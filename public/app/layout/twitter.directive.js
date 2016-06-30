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
      console.log(twitterService.toneAnalyzer(englishData));
    }
  }

}());
