const fs = require('fs');
const path = require('path');

  const handlePages=(target,request,response)=>{
    const reqPage = {
    signup: "public/signup/signup.html",
    login: "public/login/login.html",
    static: req.url
    };
    const filePath = path.join(__dirname, "..", reqPage[target]);
    fs.readFile(filePath, (err, file) => {
      res.writeHead(200);
      if (err) throw err;
      else {
        res.end(file);
      }
    });
  }

  const handleHome = (target, req, res) => {
  const reqPage = {
  home: "public/index.html",
  static: req.url
  };
  fs.readFile(path.join(__dirname, "..", reqPage[target]), (err, file) => {
  res.writeHead(200);
  if (err) throw err;
  else {
  res.end(file);
  }
  });
  };

module.exports={handleHome,handlePages};
