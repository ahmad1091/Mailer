const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const mailer = require('./mailer');

const { newUser, checkUser } = require('./database/queries/user');

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
      } else {
        newUser(parsedInfo, hash)
          .then(() => {
            response.writeHead(302, { location: '/mailer' });
            response.end();
          }).catch((err) => {
            response.end(JSON.stringify({ err: err.detail }));
          });
      }
    });
  });
};

const userSignin = (request, response) => {
  let userInfo = '';
  request.on('data', (chunk) => {
    userInfo += chunk;
  });
  request.on('end', () => {
    const paresdData = querystring.parse(userInfo);
    const { email, password } = paresdData;

    checkUser(email)
      .then((result) => {
        const { pass, id } = result.rows[0];
        bcrypt.compare(password, pass)
          .then((res) => {
            if (res) {
              const user = {
                email,
                user_id: id,
              };
              const userJWT = sign(user, process.env.SECRET);
              response.setHeader('Set-Cookie', `jwt=${userJWT};`);
              response.writeHead(302, {
                location: '/mailer',
              });
              response.end();
            } else {
              response.writeHead(302, {
                location: '/',
              });
              response.end();
            }
          }).catch((err) => {
            response.end(JSON.stringify({ err: err.detail }));
          });
      }).catch((err) => {
        response.end(JSON.stringify({ err: err.detail }));
      });
  });
};

const userSignout = (request, response) => {
  response.writeHead(302, {
    location: '/',
    'Set-Cookie': 'jwt=0; Max-Age=0',
  });
  response.end();
};

const handleMail = (request, response) => {
  let message = '';
  request.on('data', (chunk) => {
    message += chunk;
  });

  request.on('end', () => {
    const parsedFile = JSON.parse(message);
    mailer(parsedFile);
    response.end(JSON.stringify({ msg: 'hi there' }));
  });
};

module.exports = {
  handleHome, handlePages, userRegistration, userSignin, userSignout, handleMail,
};
