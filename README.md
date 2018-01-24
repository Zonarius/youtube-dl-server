# youtube-dl-server
Starts a server that downloads a video from youtube, converts it to mp3 and sends it to the client

## Install
`npm i`

or via docker [zonarius/youtube-dl-server](https://hub.docker.com/r/zonarius/youtube-dl-server)

## Usage
`npm start`

This will start a server that listens on 8080. Any `GET` request must have the query parameter `v` set, which must be the id of the requested youtube video.

The response will be the extracted mp3 from the video.
