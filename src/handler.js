const fs = require('fs');
const path = require('path');

  const handleHome=(request,response)=>{
    response.writeHead(200,{"Content-Type":"text/html"});
    fs.readFile(path.join(__dirname,'..','public','index.html'),(err,file)=>{
      if (err) {
        console.log(err);
        return;
      }
      response.end(file);
    })
  }

  const handleStatic=(request,response)=>{
    const endPoint=request.url;
    const extention=endPoint.split('.')[1];
    console.log('extention and endPoint',endPoint,extention);
    const contentType = {
       html: 'text/html',
       css: 'text/css',
       js: 'application/javascript',
       ico: 'image/x-icon',
       jpg: 'image/jpg',
       png: 'image/png',
       jpeg: 'image/jpeg',
     };
     response.writeHead(200,{"contentType":contentType[extention]})
fs.readFile(path.join(__dirname,'..',endPoint),(err,file)=>{
  if (err) {
    response.end(err.message)
  }
  response.end(file);
})
     }



module.exports={handleHome,handleStatic};
