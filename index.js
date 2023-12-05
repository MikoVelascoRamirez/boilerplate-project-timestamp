// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?", (req, res) => {

  console.log('Original param: ', req.params.date)
  console.log('Original typeof param: ', typeof req.params.date)

  const param = !req.params.date 
    ? Date.now() 
    : !req.params.date.match(/\-|GMT/g)
        ? Number(req.params.date)
        : req.params.date;
  
  console.log(param);
  let date = new Date(param);
  const objectResponse = {};
  console.log("Param:", date)
  //console.log("Props param:", Object.getOwnPropertyNames(date))

  if(date.toString() === 'Invalid Date'){
    objectResponse.error = date.toString();
  } else{
    objectResponse.unix = date.getTime();
    objectResponse.utc = date.toUTCString();
  }

  res.json(objectResponse);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
