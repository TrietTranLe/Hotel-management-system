const express = require('express');
const favicon = require('serve-favicon');
const log = require('morgan')('dev');
const bodyParser = require('body-parser');
const apiRoutes = require('./server/router');
const app = express();
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({extended:true});
const router = express.Router();
require('dotenv').config();

app.use(express.static(__dirname));
app.use(log);
app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);
app.use(router);
apiRoutes(router);

app.use(favicon(__dirname + '/frontend/img/favicon.ico'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Node server running @ http://localhost:" + port);
})
