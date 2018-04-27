import Express from 'express';
import serverConfig from './config';
import path from 'path';
import mongoose from 'mongoose';
import kittens from './kittens/kitten';
import User from './models/user';
import Textbook from './models/textbook';
import NewUser from './models/newUsers'



// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

var bodyParser = require('body-parser');
const session = require('express-session')

// Initialize the Express App
const app = new Express();
const passport = require('./passport');
// const user = require('./userLoad')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Sessions
app.use(    session({
    secret: 'ourOwnSaltingString', //pick a random string to make the hash that is generated secure
    //Following lines are to avoid some deprecation warnings
    resave: false, //required
    saveUninitialized: false, //required
    cookie: { secure: false }

}));
// Passport

app.use(passport.initialize())

app.use(passport.session()) // calls serializeUser and deserializeUser


//
// app.use( (req, res, next) => {//Debugging method
//
//     console.log('req.session', req.session);
//
//     return next();
//
// });

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

mongoose.connect(serverConfig.mongoURL, { useMongoClient: true }, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  // feed some dummy data in DB.
  kittens();
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`MERN is running on port: ${serverConfig.port}! Build something amazing!`); // eslint-disable-line
  }
});

/*
NOTE: Keep all api routes (which should be basically everything)
in the form /api/routeName. This way, we can have a clear distinction between
client side routes (e.g. going to different pages on the website) and server side
routes (e.g. doing a search query in the database).
*/



app.post('/api/auth/login', (req, res) => {

  res.json(true);
});



app.post('/api/auth/signUp', (req, res) => {
    console.log(req.body);
    console.log('req.session', req.session);

    req.session.email = req.body.email;
    req.session.save(function(err) {
        // session saved
    });
    res.end();





    //This will change but this is the idea
    // var newUser = new NewUser(req.body);
    // newUser.save()
    //     .then(item =>{
    //         res.redirect("/login")
    //     })
    //     .catch(err=>{
    //         res.status(400).send("unable to save to database");
    //     })
    res.json(true);//this will be the response from passport?
});








app.post('/api/preRegister', (req, res) => {
    var newUser = new User(req.body);
    newUser.save()
        .then(item => {
            res.redirect("/preRegister");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.post('/api/postBook', (req, res) => {
    req.body.payload.date = Date.now();
    var newBook = new Textbook(req.body.payload);
    newBook.save()
      .then(item => {
        res.redirect("/submitBook");
      })
      .catch(err => {
        console.log(err);
        res.status(400).send(err);
      });
});

app.get('/api/searchBook/:query', (req, res) => {
  var searchKey = req.params.query;
  Textbook.find({name: { "$regex": searchKey, "$options": "i" }}, function(err, books) {
    var bookMap = [];
    books.forEach(function (books) {
        bookMap.push(books);
    });
    res.json(bookMap);
  })
})

app.get('/api/displayAllBooks', (req,res)=>{
    Textbook.find({},function (err,book) {
        var bookMap = [];
        book.forEach(function (book) {
            bookMap.push(book);
        });
        res.json(bookMap);
    });
});

// Catch all function, if route is not in form /api/ then
// this function return the index page and allows the client to 
// handle the routing.
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/core/index.html'));
})

export default app;