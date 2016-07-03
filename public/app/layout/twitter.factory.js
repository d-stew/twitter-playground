(function() {
  'use strict';

  angular.module('app')
    .factory('twitterService', factory);

    factory.$inject = ['$http', '$window'];

    function factory($http, $window) {

      return {
        hashtagData: getHashtagData,
        englishAnalyzer: englishAnalyzer,
        frenchAnalyzer: frenchAnalyzer,
        spanishAnalyzer: spanishAnalyzer
      }

      function englishAnalyzer(englishData) {
        return $http.post('http://localhost:3000/english/watson/analyze', {englishData})
        .then(function(response) {
          return response.data.document_tone.tone_categories;
        })
      }

      function frenchAnalyzer(frenchData) {
        console.log('French - Factory')
        return $http.post('http://localhost:3000/french/watson/translate', {frenchData})
        .then(function(response) {
          var translation = response.data
          return $http.post('http://localhost:3000/french/watson/analyze', {translation})
          .then(function(response) {
            return response.data.document_tone.tone_categories;
          })
        })
      }

      function spanishAnalyzer(spanishData) {
        console.log('Spanish - Factory')
        return $http.post('http://localhost:3000/spanish/watson/translate', {spanishData})
        .then(function(response) {
          var translation = response.data
          return $http.post('http://localhost:3000/spanish/watson/analyze', {translation})
          .then(function(response) {
            return response.data.document_tone.tone_categories;
          })
        })
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

        tags = tags.slice(0,8);
        return tags;
      }

    }

}());
