
# BarterOut

Github Repository for the Web Platform of BarterOut.

  

### Prerequisites

While these are not requirements, we strongly recommend that you familiarize yourself with the following:

1. [JetBrains IDE’s](https://www.jetbrains.com/webstorm/?fromMenu)

2. [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell))

3. [ESLint](https://eslint.org/)

4. [Node](https://nodejs.org/en/)

5. [npm](https://www.npmjs.com/)

6. [Babel](https://babeljs.io)

  
  

### Development Environment

At BarterOut, we use a variety of softwares to write and manage our code. While your own development environment setup is up to you, we have some recommendations and suggestions that will help you specifically work on our platform.

  

We use npm for all of our package management. While some IDE’s allow you to manage packages through a GUI, we recommend you learn how to manage them through a bash shell so that you have a stronger understand of how npm works.

  

We also use npm to start our local development server. Again, it is possible to start this server through a GUI, but we recommend you learn how to do it through a bash shell before using a GUI.

  

For all our of version control, we use Git. Unlike npm, we do recommend that you find a GUI to manage Git. This is mainly because we are team, and we will be using many branches in the development process. Being able to visualize these is extremely important when making decisions of which branch to merge intro, pull from, etc.

  

### Team Communication

At BarterOut, we use Slack and Asana as well as email for all of our task management and communication. We will send you invites to both of these platforms but we recommend you turn on notifications for Slack because most of our important communication will be done through there along with messages about tasks.

  

### Standards

Last but not least, we have some basic standards for our code. As mentioned in our Platform Documentation, all of our code is compliant with ESLint, modern Javascript and Web Standards, and all functions are documented internally with JS Doc. This means that all of your code must comply with these standards before it is merged into the main project and shipped to users. If you have an questions about meeting these standards you can contact duncan.grubbs@gmail.com or message @duncan on Slack.

## How to Test



### Running the Project

#### If you are not Using WebStorm
- Open the Home Direcory in a Terminal

- One Mac or Linux this would look like : `cd /pathToDirectory`

- Once there run `npm install` so that all outstanding packages will be installed.

- Now, run `npm start`

- This will start both the REST API as well as a small dev server for testing react.

- Now navigate to `localhost:8080` in your browser if you aren't already there.

- You can mess around with this webpage, adding textbooks as you please

	as well as searching for existing textbooks by name.

  

#### If you are using WebStorm

- Open the project in WebStorm

- If you need to install any outstanding npm packages

	then click install packages in the bottom right corner

- Otherwise, click the green arrow button to start the server.

- Then navigate to `localhost:8080` in your browser!

  

# MERNStack

  

[![Build Status](https://travis-ci.org/davidthingsaker/MERNStack.svg?branch=master)](https://travis-ci.org/davidthingsaker/MERNStack)

  

MERN stack boilerplate - MongoDB ExpressJS React and NodeJS

  

This is a boilerplate app for use to create MERN stack apps. It is a basic installation of the main components above, with added tests and some example code to follow. Using Webpack for buids, Mocha, Chai and Enzyme for testing, Babel for ES6 transpiling.

  

### Installing

  

1.  `git clone git@github.com:davidthingsaker/MERNStack.git myApp`

2.  `npm install`

  

### Contributing

  

Do it! (but follow GitFlow and add some tests)

  

### Useful Packages

  

1.  [Babel](https://babeljs.io) - for transpiling ES6

2.  [Mongoose](http://mongoosejs.com) - for MongoDB

3.  [CUID](https://github.com/ericelliott/cuid) - collision resistant IDs

4.  [Express](https://expressjs.com) - NodeJS framework

5.  [Chai](https://chaijs.com) - JavaScript testing assertion library

6.  [Mocha](https://mochajs.org) - JavaScript test runner

7.  [nodemon](http://nodemon.io) - Automatic Node server restarts

8.  [NYC](https://github.com/istanbuljs/nyc) - Code test coverage

9.  [Webpack](https://webpack.github.io) - Module bundler

10.  [React](https://reactjs.org) - User interface library

  

. . . Many more that I will add eventually.