FROM node:13.12.0-alpine

WORKDIR /social-media-react-main

ENV PATH /social-media-react-main/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install
#RUN npm install react-scripts@3.4.1

COPY . ./

ENTRYPOINT ["npm", "start"]