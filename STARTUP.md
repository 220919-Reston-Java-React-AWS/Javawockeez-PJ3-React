# Local Start Up

### Setting React 

Downloads all the dependencies inside the package.json file.

1. Run the following command to install all dependencies.
```
npm install
```


2. If any are missed, then install the missing dependencies.

Below is a list of the dependencies for this application.\
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


### Setting Up the Server Connection

In the src/remote/social-media-api folder, we need to change the socialClient.ts file to point to the backend server.

1. Edit the 'Access-Control-Allow-Origin' property under 'headers' to contain the URL of the backend Spring server. (ex. 'Access-Control-Allow-Origin': 'http://localhost:8080') 


### Running the Program

To the run the React program, use the following commmand
```
npm run start
```


# Starting Up on AWS

### Necessary files for AWS

We will be using AWS for hosting and deploying our backend server. There are 1 required files for this.

1. The buildspec.yml file contains the process for CodeBuild to build the project on the cloud.

### Creating and Setting Up a S3

We'll be using S3 as our static website hosting. To being the process of making the pipeline, we first must create an S3 bucket.

1. Change public access to allow all access.

2. Configure the CORS Policy and bucket policy.

### Setting Up the AWS Pipeline

You should first create a AWS account if you don't have one already. Then follow the following steps:

        Go to elastic beanstalk

        Choose S3 for platform

        Codepipeline in searchbar

        Create a pipeline

        Github version 2 for provider

        Connect to github, name it whatever

        Then install new app

        Click rev org then install then connect then choose your repository name then branch main then next

        Build provider is aws code build

        Then create project and name

        Restrict conccurrent builds to one

        Change OS to ubunut

        Change image to 5

        Put group name and stream name then configure then next

        Deploy S3

        Create pipeline

### Test the Pipeline

After you're done with the section above, your github repo with the React website should be connected. The last step is to push a see if the pipeline and build and deploy the project.

If any errors occur, then check the watch logs to figure out what you need to do to fix and successfully execute the pipleine.

You should see in your S3 bucket the build files of the React project inside. Then check if the website is up by open the provided website link in the S3.