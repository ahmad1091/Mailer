const fs = require('fs');
const dbConnection = require('./db_connection');

const sql = fs.readFileSync(`${__dirname}/build.sql`).toString();

const dbBuild = cb => dbConnection.query(sql, (err, res) => {
  if (err) cb(err);
  else {
    cb(null, res);
  }
});


module.exports = dbBuild;
