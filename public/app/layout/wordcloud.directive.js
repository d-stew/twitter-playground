(function() {
  'use strict';

  angular.module('app')
    .directive('wordcloud', cloudDirective);

  function cloudDirective () {
    return {
      restrict: 'E',
      templateUrl: '/app/layout/wordcloud.directive.html',
      controller: cloudController,
      controllerAs: 'vm'
    }
  }

  cloudController.$inject = ['$scope', 'cloudService', '$interval']

  function cloudController($scope, cloudService, $interval) {
    var vm = this;
    var enCloud;
    $scope.$on('updateData', function(event, newValue) {
      enCloud = newValue;
    })

    $interval(function() {
      getData()
    }, 5000)

    function getData() {
      vm.tags = cloudService.cloudData(enCloud);
    }
  }

}());
