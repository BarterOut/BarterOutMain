# MERNStack

[![Build Status](https://travis-ci.org/davidthingsaker/MERNStack.svg?branch=master)](https://travis-ci.org/davidthingsaker/MERNStack)

MERN stack boilerplate - MongoDB ExpressJS React and NodeJS

This is a boilerplate app for use to create MERN stack apps. It is a basic installation of the main components above, with added tests and some example code to follow. Using Webpack for buids, Mocha, Chai and Enzyme for testing, Babel for ES6 transpiling.

### Installing 

 1. `git clone git@github.com:davidthingsaker/MERNStack.git myApp`
 2. `npm install`

 Make sure you also have mongoDB running. This will differ depending on how you are using mongoDB but for me on OS X having installed it via Homebrew:

 `mongod`

 That's it! 

 If you would like to run the tests use: 

 `npm test`


### Contributing 

Do it! (but follow GitFlow and add some tests)

### Useful Packages

 1. [Babel](https://babeljs.io) - for transpiling ES6
 2. [Mongoose](http://mongoosejs.com) - for MongoDB
 3. [CUID](https://github.com/ericelliott/cuid) - collision resistant IDs
 4. [Express](https://expressjs.com) - NodeJS framework
 5. [Chai](https://chaijs.com) - JavaScript testing assertion library
 6. [Mocha](https://mochajs.org) - JavaScript test runner
 7. [nodemon](http://nodemon.io) - Automatic Node server restarts
 8. [NYC](https://github.com/istanbuljs/nyc) - Code test coverage
 9. [Webpack](https://webpack.github.io) - Module bundler
 10. [React](https://reactjs.org) - User interface library

 . . . Many more that I will add eventually. 

##How to Test

### Server Testing
- Open the Home Direcory in a Terminal
- One Mac or Linux this would look like : `cd /pathToDirectory`
- Once there, make two terminal windows both in that directory
- In one window, type: `cd app-testing`
- In both windows, run `npm install` so that all outstanding packages will be installed.
- Now, in both windows run `npm start`
- This will start both the REST API  as well as a small dev server for testing react.
- Now navigate to `localhost:3000` in your browser if you aren't already there.
- You can mess around with this webpage, adding textbooks as you please
as well as searching for existing textbooks by name.

### Client Testing
#### If you are using WebStorm
- Open the project in WebStorm
- If you need to install any outstanding npm packages
then click install packages in the bottom right corner
- Otherwise, click the green arrow button to start the server.
- Then navigate to `localhost:8080` in your browser!

#### If you are not using WebStorm
- Open a terminal window in the root directory of the project.
- Run `npm install`
- Run `npm start`
- Navigate to `localhost:8080` in your browser.
