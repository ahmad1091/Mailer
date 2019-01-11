var http = require('http');

var server = http.createServer();

server.listen(4000, function () {

    console.log("listen to port 3000");
});
