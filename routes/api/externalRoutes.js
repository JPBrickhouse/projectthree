const router = require("express").Router();

// Requiring the request npm package
const request = require('request');

// -------------------------------------------------------------------------------
// Hiding environment variables
require('dotenv').config();
const PROPUBLICA_API_KEY  = process.env.PROPUBLICA_API_KEY;
const REACT_APP_NYTIMES_KEY = process.env.REACT_APP_NYTIMES_KEY;
const REACT_APP_TWITTER_KEY = process.env.REACT_APP_TWITTER_KEY;
const REACT_APP_BEARER_TOKEN = process.env.REACT_APP_BEARER_TOKEN

// -------------------------------------------------------------------------------
// Endpoint that gets hit by the SenatorApiCall. This is needed to avoid issues
// with CORS. This route makes an ajax call to the ProPublica API and 
// retrieves senator data for the selected United State

// Matches with "/api/externalRoutes/senators/:state"
router.get('/senators/:state', function (req, res) {
  const options = {
    url: 'https://api.propublica.org/congress/v1/members/senate/' + req.params.state + '/current.json',
    headers: {
      'X-API-Key': PROPUBLICA_API_KEY
    }
  };
  request(options, function (error, response, body) {
    res.send(body);
  })
});
// -------------------------------------------------------------------------------
// Endpoint that gets hit by the News Call.  This is needed to avoid issues
// with CORS. This route makes an ajax call to the New York Times API and
// retrieves news article data for the selected United State and associated Search Entry

// Matches with "/api/externalRoutes/news/:state/:searchentry"
router.get('/news/:state/:searchentry', function (req, res) {
  const options = {
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + req.params.searchentry + "&fq=" + req.params.state + "&api-key=" + REACT_APP_NYTIMES_KEY,
  };
  request(options, function (error, response, body) {
    res.send(body);
  })
});

// -------------------------------------------------------------------------------
//Twitter Call
router.get('/twitter/', function (req, res) {
  
  const options = {
    url: 'https://api.twitter.com/1.1/users/show.json?screen_name=SenatorDurbin',
    headers: {
      'Authorization': 'Bearer ' + REACT_APP_BEARER_TOKEN 
    }
  };
  request(options, function (error, response, body) {
    res.send(body);
  })
});
// -------------------------------------------------------------------------------
// Exporting the router
module.exports = router;
