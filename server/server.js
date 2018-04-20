import Express from 'express';
import serverConfig from './config';
import path from 'path';
import mongoose from 'mongoose';
import kittens from './kittens/kitten';
import User from './models/user';
import Textbook from './models/textbook';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

var bodyParser = require('body-parser');

// Initialize the Express App
const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/preRegister', (req, res) => {
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
    var newBook = new Textbook(req.body);
    newBook.save().then(item => {res.redirect("/submitBook");})
        .catch(err => {
          console.log(err);
          res.status(400).send(err);
        });
});

app.get('/api/searchBook', (req, res) => {
  // var searchKey = req.body;
  // // db.stores.createIndex( { name: "text", course: "text" } );
  // // db.stores.find( { $text: { $search: searchKey } } );
  // var Book = mongoose.model("Book", Textbook);
  // Book.find({ name: "text", course: "text" }).exec(function (err) {
  //     if (err) return handleError(err);
  //     // Prints "Space Ghost is a talk show host".
  //     console.log("Search");
  //     res.json({'name': 'bookname'});
  // })
  res.json({'name': 'bookname'});
})

app.get('/api/displayAllBooks', (req,res)=>{
    console.log(req);

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