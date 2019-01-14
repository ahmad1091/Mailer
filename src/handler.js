const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');
const newUser = require('./database/queries/user');

const handlePages = (target, request, response) => {
  const reqPage = {
    signup: 'public/signup/index.html',
    signin: 'public/signin/index.html',
    mailer: 'public/mailer/index.html',
    static: request.url,
  };
  const filePath = path.join(__dirname, '..', reqPage[target]);
  fs.readFile(filePath, (err, file) => {
    response.writeHead(200);
    if (err) throw err;
    else {
      response.end(file);
    }
  });
};

const handleHome = (target, request, response) => {
  const reqPage = {
    home: 'public/home/index.html',
    static: request.url,
  };
  fs.readFile(path.join(__dirname, '..', reqPage[target]), (err, file) => {
    response.writeHead(200);
    if (err) throw err;
    else {
      response.end(file);
    }
  });
};

const userRegistration = (request, response) => {
  let userInfo = '';
  request.on('data', (chunk) => {
    userInfo += chunk;
  });
  request.on('end', () => {
    const parsedInfo = querystring.parse(userInfo);
    const { password } = parsedInfo;
    bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
        response.end('<h2>Server Error</h2>');
        response.end(response.end(JSON.stringify({ error })));
      } else {
        newUser(parsedInfo, hash)
          .then(() => {
            response.writeHead(302, { location: '/mailer' });
            response.end();
          }).catch((err) => {
            response.end(response.end(JSON.stringify({ err: err.detail })));
          });
      }
    });
  });
};

module.exports = { handleHome, handlePages, userRegistration };
