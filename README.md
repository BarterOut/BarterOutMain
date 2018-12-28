# BarterOut
![Build Status](https://travis-ci.com/duncangrubbs/BarterOutMain.svg?token=mqsCsACffrViQWtAjQzv&branch=dev)

Github Repository for the Web Platform and API of BarterOut.

### Prerequisites

While these are not requirements, we strongly recommend that you familiarize yourself with the following:

1. VS Code, Atom, Sublime Text, Web Storm or another editor.
2. [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell))
3. [ESLint](https://eslint.org/) - Javascript linting
4. [Node](https://nodejs.org/en/)
5. [React](https://reactjs.org) - frontend library
6. [npm](https://www.npmjs.com/) - package manager
7. [Babel](https://babeljs.io) - for JS transpiling
8. [Mongoose](http://mongoosejs.com) - for MongoDB
9. [MongoDB](https://www.mongodb.com/) - JSON database
10. [Webpack](https://webpack.github.io) - Module bundler
10. [Jest](https://jestjs.io/docs/en/getting-started) - Test assertion library
11. [Supertest](https://github.com/visionmedia/supertest) - Test library

### Development Environment

At BarterOut, we use a variety of softwares to write and manage our code. While your own development environment setup is up to you, we have some recommendations and suggestions that will help you specifically work on our platform.

We use `npm` for all of our package management. While some IDE’s allow you to manage packages through a GUI, we recommend you learn how to manage them through a bash shell so that you have a stronger understand of how `npm` works.

We also use npm to start our local development server. Again, it is possible to start this server through a GUI, but we recommend you learn how to do it through a bash shell before using a GUI.

For all our of version control, we use Git. Unlike npm, we **do** recommend that you find a __GUI__ to manage Git. This is mainly because we are team, and we use many branches in the development process. Being able to visualize these is extremely important when making decisions of which branch to merge into, pull from, etc.

### Team Communication

At BarterOut, we use Slack and Asana as well as email for all of our task management and communication. We will send you invites to both of these platforms but we recommend you turn on notifications for Slack because most of our important communication will be done through there along with messages about tasks.

### Standards

Last but not least, we have some basic standards for our code. As mentioned in our Platform Documentation, all of our code is compliant with ESLint, modern Javascript and Web Standards, and all functions are documented internally with JS Doc. This means that all of your code must comply with these standards before it is merged into the main project and shipped to users. If you have an questions about meeting these standards you can contact duncan.grubbs@gmail.com or message @duncan on Slack.

### Running the Project
- Open the Home Direcory in a Terminal
- One Mac or Linux this would look like : `cd /pathToDirectory`
- Once there run `npm install` so that all outstanding packages will be installed.
- Now, run `npm start`
- This will start both the REST API as well as a small dev server for testing react.
- Now navigate to `localhost:8080` in your browser if you aren't already there.
- You can mess around with this webpage, adding textbooks as you please
	as well as searching for existing textbooks by name.

### How to Test
- Run `npm run test` in the directory to run all tests.
- Run `npm run coverage` to see current test coverage.

### How to Build
- Run `npm run build` in the directory to manually build the project.
- See `webpack.config.js` for build config.
