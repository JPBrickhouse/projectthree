const express = require("express");

const mongoose = require("mongoose");
// ------------------------------------------------------------------------------------------
const request = require('request');
// routes was deleted and replaced with request
// ------------------------------------------------------------------------------------------
const app = express();

const PORT = process.env.PORT || 3001;

// Hiding environment variables
require('dotenv').config();
const PROPUBLICA_API_KEY  = process.env.PROPUBLICA_API_KEY;
const REACT_APP_NYTIMES_KEY = process.env.REACT_APP_NYTIMES_KEY

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// ------------------------------------------------------------------------------------------
// routes was deleted
// ------------------------------------------------------------------------------------------
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/dbProjectThree",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

// ------------------------------------------------------------------------------------------
// Endpoint that gets hit by the SenatorApiCall. This is needed to avoid issues
// with CORS. This route makes an ajax call to the ProPublica API and 
// retrieves senator data for the selected United State
app.get('/senators/:state', function (req, res) {
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
// ------------------------------------------------------------------------------------------
// Endpoint that gets hit by the News Call.  This is needed to avoid issues
// with CORS. This route makes an ajax call to the New York Times API and
// retrieves news article data for the selected United State and associated Search Entry
app.get('/news/:state/:searchentry', function (req, res) {
  const options = {
    url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + req.params.searchentry + "&fq=" + req.params.state + "&api-key=" + REACT_APP_NYTIMES_KEY,
  };
  request(options, function (error, response, body) {
    res.send(body);
  })
});
// ------------------------------------------------------------------------------------------