const fs = require('fs');
const path = require('path');

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

module.exports = { handleHome, handlePages };
