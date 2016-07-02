var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});

var language_translator = watson.language_translator({
  username: process.env.TRANSLATOR_USERNAME,
  password: process.env.TRANSLATOR_PASSWORD,
  version: 'v2'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/watson/english', function(req, res, next) {
  console.log('Testing');
  var data = req.body.englishData;

  tone_analyzer.tone({ text: data },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      res.json(tone, null, 2);
  });
})

router.post('/watson/french/translate', function(req, res, next) {
  var data = req.body.frenchData;

  language_translator.translate({
    text: data, source : 'fr', target: 'en' },
    function (err, translation) {
      if (err)
        console.log('error:', err);
      else {
        var translation = translation.translations[0].translation;
        res.json(translation, null, 2)
        // console.log(translation);
      }
    }
  )
})

router.post('/watson/french/analyze', function(req, res, next) {
  var data = req.body.translation;

  tone_analyzer.tone({ text: data },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      res.json(tone, null, 2);
  });
})

// router.post('/watson/french', function(req, res, next) {
//   var data = req.body.frenchData;
//   var toneData;
//
//   function translate() {
//     return new Promise(function(resolve, reject) {
//       resolve(language_translator.translate(
//         { text: data, source : 'fr', target: 'en' },
//         function (err, translation) {
//           if (err)
//             console.log('error:', err);
//           else {
//             return JSON.stringify(translation, null, 2);
//             // toneData = translation.translations[0].translation;
//             // return toneData;
//           }
//         }
//       ))
//     })
//   }
//
//   translate().then(function(result) {
//     console.log('Result in THEN', result);
//   })
//
//
// })


module.exports = router;
