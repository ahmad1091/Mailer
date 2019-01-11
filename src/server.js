const http = require('http');
const handler = require('./handler');

var server = http.createServer(handler);

server.listen(4000, function () {

    console.log("listen to port 4000");
});
