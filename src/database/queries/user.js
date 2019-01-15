const dbConnection = require('../db_connection');

const newUser = (data, hash) => {
  const {
    name, email,
  } = data;
  const sql = {
    text: 'INSERT INTO users (name,pass,email) VALUES ($1, $2, $3)',
    values: [name, hash, email],
  };
  return dbConnection.query(sql);
};
const checkUser = (email) => {
  const sql = {
    text: 'select * from users where email=$1',
    values: [email],
  };
  return dbConnection.query(sql);
};
module.exports = { newUser, checkUser };
