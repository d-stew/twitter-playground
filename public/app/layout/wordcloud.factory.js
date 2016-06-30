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
        var words = enCloud.split(" ");
        var wordObjects = [];

        // if not a filler word, assign to object and push into wordObjects array
        var fillers = [
                       "and","of","to","","&","on","-","the","in","be","by","for",
                       "a","an","my","rt","i","is","but","me","you","not","with",
                       "are","it","as","that","this","their","at","from","have",
                       "there","will","all","like","or","up","what",".","+","was",
                       "about","so","very","than","has","could","we","do","if",
                       "still","~","our","first!","its","it's","can","some","says",
                       "he","she","your","his","hers","him","her"
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
              if(word.charAt(0) === "#") {
                word = word.substring(1);
              }
              if(!word.charAt(word.length-1).match(/[a-z]/i)) {
                word = word.slice(0,-1)
              }
              var wordObject = {};
              wordObject.word = word;
              wordObjects.push(wordObject);
            }
        });

        // group by word, count instances
        var wordCount = d3.nest()
          .key(function(d) { return d.word; })
          .rollup(function(v) { return v.length; })
          .entries(wordObjects);

        // sort by count
        wordCount.sort(function(a,b) {
          return b.values - a.values;
        });

        // format data for word cloud
        var tags = [];

        wordCount.forEach(function(d) {
          tags.push([d.key,parseInt(d.values)]);
        });

        tags = tags.slice(0,15);

        return tags;
      }

    }

}());
