(function() {
  'use strict';

  angular.module('app')
    .factory('twitterService', factory);

    factory.$inject = ['$http', '$window'];

    function factory($http, $window) {

      return {
        hashtagData: getHashtagData,
        englishAnalyzer: englishAnalyzer,
        frenchAnalyzer: frenchAnalyzer
      }

      function getHashtagData(englishData) {
        // prep tweet data to be used in word cloud
        var words = englishData.split(" ");
        var wordObjects = [];

        words.forEach(function (word) {
          // isolate hashtags
          if(word.charAt(0) === "#") {
            if(!word.charAt(word.length-1).match(/[a-z]/i)) {
              word = word.slice(0,-1)
            }
            var wordObject = {};
            wordObject.word = word;
            wordObjects.push(wordObject);
          }
        });

        // group by hashtag, count instances
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

      function englishAnalyzer(englishData) {
        return $http.post('http://twang.herokuapp.com/watson/english', {englishData})
        .then(function(response) {
          return response.data.document_tone.tone_categories
        })
      }

      function frenchAnalyzer(frenchData) {
        console.log('French - Factory')
        return $http.post('http://localhost:3000/watson/french', {frenchData})
        // .then(function(response) {
        //   return response.data.document_tone.tone_categories
        // })
      }

    }

}());
