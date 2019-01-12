const {handleHome,handleStatic} = require('./handler');

const router=(request,response)=>{
  const endPoint =request.url;
  if (endPoint=='/') {
    handleHome(request,response);
  }
if (endPoint=='/public') {
  handleStatic(request,response);
}
}

module.exports=router
