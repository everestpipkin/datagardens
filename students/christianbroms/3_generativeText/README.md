# Website Poetry 

This app takes a url and produces a summary of the page in a series of short sentences. A live version can be found [here](http://summarize-this.us-east-1.elasticbeanstalk.com/).

It works by extracting a random selection of a webpage's text and collecting the organizations, people, topics, and parts of speech. It analyses the sentiment of the webpage, and then creates new sentences from the entities that have been extracted that are similar in sentiment to the overall page.   

## Run it

You'll need to have Node.js installed. Navigate to this directory and run:

```shell
npm install

```
to install packages and 

```shell
npm start

```
to start the app. Then navigate to `localhost:8081`. 
