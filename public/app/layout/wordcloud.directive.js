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
    let vm = this;
    console.log('hit in directive');
    let enCloud = $scope.enCloud;
    vm.getData = getData;


    // activate();
    //
    // function activate() {
    //   let test = cloudService.test();
    //   let tags = cloudService.cloudData(enCloud);
    //   console.log(test);
    //   console.log(tags);
    // }

    function getData() {
      console.log(cloudService.test());
      console.log(cloudService.cloudData(enCloud));

    }
  }

}());
