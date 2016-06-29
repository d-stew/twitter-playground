(function() {
  'use strict';

  angular.module('app')
    .factory('cloudService', factory);

    factory.$inject = ['$http', '$window'];

    function factory($http, $window) {

      return {
        test: test,
        cloudData: getCloudData
      }

      function test() {
        return "Hit in factory"
      }

      // prep tweet data to be used in word cloud
      function getCloudData(enCloud) {
        let wordArray = enCloud.split(" ");
        let wordObjects = [];

        // remove filler words, push into array
        let fillers = ["AND","OF","TO","","&","ON","-","THE","IN","BE","FOR","A"]
        wordArray.forEach(function (word) {
          if (isNaN(word) && !fillers.includes(word)) {
            let wordObject = {};
            wordObject.word = word;
            wordObjects.push(wordObject);
          }
        });

        // group by word, count instances
        let wordCount = d3.nest()
          .key(function(d) { return d.word; })
          .rollup(function(v) { return v.length; })
          .entries(wordObjects);

        // sort by count
        wordCount.sort(function(a,b) {
          return b.values - a.values;
        });

        // format data for word cloud
        let tags = [];

        wordCount.forEach(function(d) {
          tags.push([d.key,parseInt(d.values)]);
        });

        tags = tags.slice(0,25);

        return tags;
      }

    }

}());
