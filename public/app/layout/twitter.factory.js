(function() {
  'use strict';

  angular.module('app')
    .factory('twitterService', factory);

    factory.$inject = ['$http', '$window'];

    function factory($http, $window) {

      return {
        hashtagData: getHashtagData,
        locationData: getLocationData,
        englishAnalyzer: englishAnalyzer,
        frenchAnalyzer: frenchAnalyzer,
        spanishAnalyzer: spanishAnalyzer,
        portugueseAnalyzer: portugueseAnalyzer
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

      function portugueseAnalyzer(portugueseData) {
        console.log('Portuguese - Factory')
        return $http.post('http://localhost:3000/portuguese/watson/translate', {portugueseData})
        .then(function(response) {
          var translation = response.data
          return $http.post('http://localhost:3000/portuguese/watson/analyze', {translation})
          .then(function(response) {
            return response.data.document_tone.tone_categories;
          })
        })
      }

      function getHashtagData(englishData) {
        // split into individual words
        var words = englishData.split(" ");
        var wordObjects = [];

        // isolate hashtags
        words.forEach(function (word) {
          if(word.charAt(0) === "#") {
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

        // format data
        var tags = [];
        wordCount.forEach(function(d) {
          tags.push([d.key,parseInt(d.values)]);
        });

        // return top 8 hashtags
        tags = tags.slice(0,8);
        return tags;
      }

      function getLocationData(locations) {
        var locationObjects = [];

        // isolate locations
        locations.forEach(function (location) {
          var locationObject = {};
          locationObject.location = location;
          locationObjects.push(locationObject);
        });

        // group by location, count instances
        var locationCount = d3.nest()
          .key(function(d) { return d.location; })
          .rollup(function(v) { return v.length; })
          .entries(locationObjects);

        // sort by count
        locationCount.sort(function(a,b) {
          return b.values - a.values;
        });

        // format data
        var topLocations = [];
        locationCount.forEach(function(d) {
          topLocations.push([d.key,parseInt(d.values)]);
        });

        // return top 8 locations
        topLocations = topLocations.slice(0,8);
        return topLocations;
      }

    }

}());
