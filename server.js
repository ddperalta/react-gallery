let express = require('express');
let bodyParser = require('body-parser');
let path = require("path");
let db = require('./db.js');
let app = express();
let port = 8080;
let AWS = require('aws-sdk');

AWS.config.loadFromPath('./s3_config.json');
let s3Bucket = new AWS.S3({ params: { Bucket: 'ddperalta-images-prod' } });
const BUCKET_URL_BASE = "https://s3.us-east-2.amazonaws.com/ddperalta-images-prod/";
app.use("/static", express.static(__dirname + '/build/static'));
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/build/index.html")));

app.get("/images/", (req, res) => {
  db.connection.query('SELECT * FROM images', function (err, rows) {
    return res.json(rows);
  });
});
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/images/", (req, res) => {
  const title = req.body.title;
  const filename = req.body.filename;
  const description = req.body.description;
  const imageData = req.body.imageData;
  
  const buf = new Buffer(imageData.replace(/^data:image\/\w+;base64,/, ""), 'base64');
  const timestamp = new Date().getTime();
  const keyname = `${timestamp}-${filename}`;
  const data = {
    Key: keyname,
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };
  s3Bucket.putObject(data, function (err, data) {
    if (err) {
      console.log(err);
      console.log('Error uploading data: ', data);
    }
  });
  const url = `${BUCKET_URL_BASE}${keyname}`
  db.connection.query(
    `INSERT INTO images (title, description, url) VALUES ("${title}", "${description}", "${url}")`, (err, result) => {
      return res.json(result);
  });
});

app.listen(port);
console.log(`Listening on port ${port}`);

module.exports = app;
