var express = require('express');
var router = express.Router();
var watson = require('watson-developer-cloud');

var tone_analyzer = watson.tone_analyzer({
  username: '6838972c-9c73-4d0b-a84c-180f100c95e3',
  password: '7SvnfCKUGOdW',
  version: 'v3',
  version_date: '2016-05-19'
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


tone_analyzer.tone({ text: 'Greetings from Watson Developer Cloud!' },
function(err, tone) {
  if (err)
  console.log(err);
  else
  console.log(JSON.stringify(tone, null, 2));
});

module.exports = router;
