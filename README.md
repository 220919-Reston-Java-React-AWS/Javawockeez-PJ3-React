# Javawockeez - Social Media

## Portfolio Description

It is a social media website where registered users may share their recipes and ideas. Users will also be able to comment on other's posts, navigate through users' profiles, and customize their own on the site. In addition, users will be able to remove their own posts and comments as desired. Users will be able set the theme of the website by toggling the dark mode setting. This will consist of coding via React and the Spring Framework. With React, we plan to utilize Material UI, CSS, and TSX. The Java Spring will consist of using Hibernate, JDBC, and Spring. Additionally, the project will feature a Rest API. This will be deployed on the web using Amazon Web Services (AWS). From AWS, the project uses Elastic BeanStalk, CodePipeline, S3, CodeBuild, EC2, and the project's database is hosted on a PostgreSQL RDS.

---

## A place where chef's and bakers can share there recipes and ideas!
To access the delpoyed version, access our site [here](http://javawockeez-social-react.s3-website-us-east-1.amazonaws.com/). There, you can register and see what our community has created.


## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
To run this on your own machine, simply download the code and its dependencies.

### Additional Packages
Below is a list of the dependencies for this application.
- @emotion/react@11.10.4
- @emotion/styled@11.10.4
- @mui/icons-material@5.10.9
- @mui/material@5.10.10
- @mui/styled-engine-sc@5.10.6
- @testing-library/jest-dom@5.16.5
- @testing-library/react@13.4.0
- @testing-library/user-event@13.5.0
- @types/jest@27.5.2
- @types/node@16.11.66
- @types/react-dom@18.0.6
- @types/react-router-dom@5.3.3
- @types/react@18.0.21
- @types/styled-components@5.1.26
- axios@0.27.2
- react-dom@18.2.0
- react-router-dom@6.4.2
- react-scripts@5.0.1
- react-select@5.6.1
- react@18.2.0
- reactjs-popup@2.0.5
- styled-components@5.3.6
- typescript@4.8.4
- url-loader@4.1.1
- use-local-storage@2.3.6
- web-vitals@2.1.4

To install them, run
```
npm i {package-name}
```
For instance, to install the pop-up windows from react-js-popup, run
```
npm i reactjs-popup
```
in the terminal. This project used the current version for all these packages, but you may specify a version if you wish, visit [here](https://docs.npmjs.com/cli/v6/commands/npm-install) for more information.


### Setting Up the Server Connection

In the src/remote/social-media-api folder, we need to change the socialClient.ts file to point to the backend server.

1. Edit the 'Access-Control-Allow-Origin' property under 'headers' to contain the URL of the backend Spring server. (ex. 'Access-Control-Allow-Origin': 'http://localhost:8080') 


### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
You may open [http://localhost:3000](http://localhost:3000) to view it in the browser, although it will open automatically in your default browser when this command is run.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
Any changes made to the tests while running will trigger a new run of the tests automatically. By default, only tests related to changed files will be ran, although this can be changed.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run coverage`

Tests all available tests in the project, and displays the coverage. Included is: 
- Name of the File
- Percent Coverage of
	- Statements
	- Branches (if and switch statements essentially)
	- Functions
	- Lines
- All Untested Lines in the tested module
 