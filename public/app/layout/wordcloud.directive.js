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

  cloudController.$inject = ['$scope', 'cloudService']

  function cloudController($scope, cloudService) {
    console.log('hit in directive');
    let vm = this
    let enCloud = $scope.enCloud;

    activate();

    function activate() {
      let test = cloudService.test();
      let tags = cloudService.cloudData(enCloud);
      console.log(test);
      console.log(tags);
    }
  }

}());
