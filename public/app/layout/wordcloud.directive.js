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
    let vm = this;
    let enCloud;
    $scope.$on('updateData', function(event, newValue) {
      enCloud = newValue;
    })


    // activate();
    //
    // function activate() {
    //   let test = cloudService.test();
    //   let tags = cloudService.cloudData(enCloud);
    //   console.log(test);
    //   console.log(tags);
    // }

    $interval(function() {
      getData()
    }, 5000)

    function getData() {
      console.log(cloudService.test());
      console.log(cloudService.cloudData(enCloud));

    }
  }

}());
