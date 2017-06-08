# Floatr Backend

## dependencies

node 6.3.x or later and mongodb

## getting started

install [brew](http://brew.sh) if on mac (why don't you have brew yet?)

`brew install mongodb`

[install nvm](https://github.com/creationix/nvm#install-script)

`nvm install 6`
`nvm alias default 6`

## developing

run mongod on a separated terminal instance:

`mongod`

first time, install npm:

`npm install`

run the app:

`npm run dev`

the app runs on `localhost:8080`

## production

_you'll likely be consuming mongodb as a service, so make sure you set the env var to connect to it._

`npm start`





--------------------------------------------------------------------------------
