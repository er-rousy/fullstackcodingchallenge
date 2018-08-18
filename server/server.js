const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');



const app = express();
app.set('port', process.env.PORT || 9500);
// tell the app to look for static files in these directorie
app.use(express.static(path.join(__dirname, './../dist')));
// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());









// start the server
app.listen(app.get('port'), () => {
  console.info(`serving  http://localhost:${app.get('port')}`);
});