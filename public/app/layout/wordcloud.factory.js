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

      function getCloudData(enCloud) {
        // prep tweet data to be used in word cloud
        let words = enCloud.split(" ");
        let wordObjects = [];

        // if not a filler word, assign to object and push into wordObjects array
        let fillers = [
                       "and","of","to","","&","on","-","the","in","be","by","for",
                       "a","an","my","rt","i","is","but","me","you","not","with",
                       "are","it","as","that","this","their","at","from","have",
                       "there","will","all","like","or","up","what",".","+","was",
                       "about","so","very","than","has","could","we","do","if",
                       "still","~","our","first!"
                       ];

        words.forEach(function (word) {
          if (
              isNaN(word) &&
              !fillers.includes(word.toLowerCase()) &&
              word.charAt(0) !== "@" &&
              word.charAt(0) !== "&" &&
              word.charAt(0) !== "\"" &&
              !word.includes('http')
              )
            {
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

        tags = tags.slice(0,15);

        return tags;
      }

    }

}());
