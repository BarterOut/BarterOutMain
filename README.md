# 📚 BarterOut ![Build Status](https://travis-ci.com/BarterOut/BarterOutMain.svg?branch=dev)

> Web Platform and REST API for BarterOut 

### 🙌 About
BarterOut is a student led organization at the [University of Rochester](https://rochester.edu).
We believe access to educational materials is a key component
to a great college experience and we are using technology
to improve access for everyone. Our [web platform](https://www.barterout.com) is a web application that helps students buy and sell used textbooks. [Skedge](https://github.com/BarterOut/Skedge) is a class scheduling application that makes finding new courses a smooth, social, and stess free experience. All our of projects are open-source and we love to see new contributions and ideas!

---

### Our Tech Stack
1. [VS Code](https://code.visualstudio.com/) - Text Editor
2. [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)) - Shell
3. [ESLint](https://eslint.org/) - Linter
4. [Node](https://nodejs.org/en/) - Javascript parser
5. [React](https://reactjs.org) - Frontend Javascript framework
6. [npm](https://www.npmjs.com/) - Node package manager
7. [Babel](https://babeljs.io) - Javascript transpiling
8. [Mongoose](http://mongoosejs.com) - MongoDB wrapper
9. [MongoDB](https://www.mongodb.com/) - Database
10. [Webpack](https://webpack.github.io) - Frontend module bundler
10. [Jest](https://jestjs.io/docs/en/getting-started) - Test assertion library
11. [Supertest](https://github.com/visionmedia/supertest) - Test library

### 👩‍💻 Team Communication
At BarterOut, we use Slack, FB Messenger and email for all of our task management and communication. If you are interested in staying up to date with our work, [email us](https://www.barterout.com/contact) and we will send you an invite to the Slack.

### 📐 Standards
We have some basic standards for our codebase. We use a linter and any code that gets merged into the project should comply with the linter. We suggest that you setup ESLint with your editor so that you are automatically warned when you are writing code outside of the linter's rules. If you are modifying the API or making significant changes to the frontend, you should also write internal documentation with JSDoc. Since we already have a lot of technical debt, we would really appreciate it if you wrote tests for any new code you add! If you have any questions about meeting these standards you can contact duncan.grubbs@gmail.com or message @duncan on Slack. _Note that when contributing, you should do all of your work on a seperate branch and then submit a PR to merge your branch into `dev`. Do NOT push directly to `dev`._

---

### 💻 Running the Project
_*Note: We use environment variables for this project. If you want to run
the project succesfully on your local machine, you will need to create
a file in the root directory of this folder called `.env` in which all
of your environment variables will be stored. If you need access to specific
tokens, etc. email us or ask either @duncan or @Daniel on Slack._

#### 🔢 Step by Step
- Open the Home Directory in a Terminal
- One Mac or Linux this would look like : `cd pathToDirectory`
- Once there run `npm install` so that all outstanding packages are installed
- Now, run `npm start`
- This will start the API as well as a frontend development server
- Now navigate to `localhost:5000` in your browser

### 🔥 How to Test 
- Run `npm run test` in the directory to run **all** tests
- Run `npm run test-client` in the directory to run **frontend** tests
- Run `npm run test-server` in the directory to run **backend** tests

### 🔨 How to Build
- Run `npm run build` in the directory to manually build the project
- See `webpack.config.js` for build config
