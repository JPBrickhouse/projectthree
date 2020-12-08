const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./passport');
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const user = require('./routes/api/user');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());

// // Define middleware here
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const uri = process.env.MONGODB_URI || "mongodb://localhost/dbProjectThree";
mongoose
  .connect(uri)
  .then(
    () => {
      /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
      console.log('Connected to Mongo');

      // Sessions
      app.use(
        session({
          secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
          store: new MongoStore({ mongooseConnection: mongoose.connection }),
          resave: false, //required
          saveUninitialized: false, //required
        })
      );

      // Passport
      app.use(passport.initialize());
      app.use(passport.session()); // calls the deserializeUser

      // Routes
      app.use('/api/user', user);

      // Importing the routes
      app.use(require("./routes"))

      if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, 'client/build')));
        //
        app.get('*', (req, res) => {
          res.sendFile(path.join((__dirname = 'client/build/index.html')));
        });
      }

      // build mode
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname + '/client/public/index.html'));
      });

      // app.post('/api/user', (req, res) => {
      //   console.log('THE ROUTE IS HIT');
      // });

      // Starting Server
      app.listen(PORT, () => {
        console.log(`App listening on PORT: ${PORT}`);
      });
    },
    (err) => {
      /** handle initial connection error */
      console.log('error connecting to Mongo: ');
      console.log(err);
    }
  )
  .catch((err) => console.log({ err }));












// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
// }

// // Importing the routes
// app.use(require("./routes"))

// // Connect to the Mongo DB
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://localhost/dbProjectThree",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useFindAndModify: false
//   }
// );

// // Start the API server
// app.listen(PORT, function () {
//   console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
// });
