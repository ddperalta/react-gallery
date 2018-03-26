let mysql = require('mysql');

exports.connection = mysql.createConnection({
  host: 'album.cc3m6plp6moi.us-east-2.rds.amazonaws.com',
  user: 'ddperalta',
  password: 'ddperalta1234',
  database: 'album'
});
