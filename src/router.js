const { handleHome } = require('./handler');

const router = (request, response) => {
  const endPoint = request.url;
  const method = request.method;
  if (endPoint == '/' && method == 'GET') {
    handleHome('home', request, response);
  } else if (endPoint.includes('home') && method == 'GET') {
    handleHome('static', request, response);
  }
};

module.exports = router;
