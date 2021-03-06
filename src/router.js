const {
  handleHome, handlePages, userRegistration, userSignin, userSignout, handleMail,
} = require('./handler');
const auth = require('./authentication');

const router = (request, response) => {
  const endPoint = request.url;
  const { method } = request;
  if (endPoint === '/' && method === 'GET') {
    handleHome('home', request, response);
  } else if (endPoint === '/signin' && method === 'GET') {
    handlePages('signin', request, response);
  } else if (endPoint === '/signup' && method === 'GET') {
    handlePages('signup', request, response);
  } else if (endPoint === '/mailer' && method === 'GET') {
    auth(request, response, handlePages('mailer', request, response));
  } else if (endPoint === '/mailer' && method === 'POST') {
    handleMail(request, response);
  } else if (endPoint === '/signup' && method === 'POST') {
    userRegistration(request, response);
  } else if (endPoint === '/signin' && method === 'POST') {
    userSignin(request, response);
  } else if (endPoint === '/signout' && method === 'GET') {
    userSignout(request, response);
  } else if (endPoint.includes('public') && method === 'GET') {
    handleHome('static', request, response);
  } else {
    handleHome('home', request, response);
  }
};

module.exports = router;
