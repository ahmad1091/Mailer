const http = require('http');
const router = require('./router');

var server = http.createServer(router);

server.listen(4000, function () {

    console.log("listen to port 4000");
});
