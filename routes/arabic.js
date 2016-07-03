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

router.post('/watson/translate', function(req, res, next) {
  var data = req.body.arabicData;

  language_translator.translate({
    text: data, source : 'ar', target: 'en' },
    function (err, translation) {
      if (err)
        console.log('error:', err);
      else {
        var translation = translation.translations[0].translation;
        res.json(translation, null, 2)
      }
    }
  )
})

router.post('/watson/analyze', function(req, res, next) {
  var data = req.body.translation;

  tone_analyzer.tone({ text: data },
  function(err, tone) {
    if (err)
      console.log(err);
    else
      res.json(tone, null, 2);
  });
})

module.exports = router;
