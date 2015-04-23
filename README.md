# IonicAngularParseBoilerplate
Ionic App with [Parse](https://parse.com/) as Backend (using Angular Parse library) Boilerplate

## App
ToDo List

![Demo Screenshot](./doc/app.gif)

### Requirements
- [NodeJS](https://nodejs.org/)

### Dependencies
- [Ionic](http://ionicframework.com/)
- [Gulp](http://gulpjs.com/)
- [Bower](http://bower.io/)
- [Angular Parse](https://github.com/jimrhoskins/angular-parse)

### Install
`npm install`

### Parse Configuration
In **www/js/app.js** search for:
```javascript
// initialize Parse
  return ParseProvider.initialize(
    "YOUR_APP_ID", //App ID
    "YOUR_REST_API_KEY"  //REST API Key
  );
```
And change these values with yours Parse app.

### Run
`ionic serve`

### License
See [here](https://github.com/giorgiofellipe/IonicAngularParseBoilerplate/blob/master/LICENSE).
