const { checkUser } = require('./database/queries/user');
const jwtDecode = require('jwt-decode');

const auth = (request, response, cb) => {
  const token = request.headers.cookie;
  if (token !== undefined) {
    const { email } = jwtDecode(token);
    checkUser(email).then((res) => {
      if (res.rows.length > 0) {
        return cb();
      }
      return response.end(JSON.stringify({ msg: 'you must Sign in first' }));
    }).catch(() => response.end(JSON.stringify({ msg: 'you must Sign in first' })));
  } else {
    return response.end(JSON.stringify({ msg: 'you must Sign in first' }));
  }
};

module.exports = auth;
