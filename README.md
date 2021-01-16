# browser-app
Front-end application for Remote Shiva

## Development
Main branch for development is `develop`

Make sure you have local copies of .env and .env.development.local
.env is just empty strings
.env.development.local has the actual values

```bash
$ git clone https://github.com/remoteshiva/browser-app.git
$ cd ..
$ git checkout develop
$ yarn install
$ yarn start
```


## Deploying
```bash
cd firebase/functions
npm install
cd ../..
yarn build
firebase deploy
```

### Stack and build scripts
See [package.json](https://github.com/remoteshiva/browser-app/blob/develop/package.json).
