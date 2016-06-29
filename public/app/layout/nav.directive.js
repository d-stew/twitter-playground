(function() {
  'use strict';

  angular.module('app')
    .directive('topnav', navDirective);

  function navDirective () {
    return {
      restrict: 'E',
      templateUrl: '/app/layout/nav.directive.html',
      controller: controller,
      controllerAs: 'vm'
    }
  }

  controller.$inject = ['$http', '$scope'];

  function controller($http, $scope) {
      var vm = this;
    }

}());
