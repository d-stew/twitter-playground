var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: process.env.WATSON_USERNAME,
  password: process.env.WATSON_PASSWORD,
  version: 'v3',
  version_date: '2016-05-19'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/watson', function(req, res, next) {
  console.log('Testing');
  // var data = req.body.englishData;
  //
  // tone_analyzer.tone({ text: data },
  // function(err, tone) {
  //   if (err)
  //     console.log(err);
  //   else
  //     res.json(tone, null, 2);
  // });
})


module.exports = router;
