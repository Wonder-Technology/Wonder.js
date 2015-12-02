var express = require("express");
var http = require("http");
var app = express();
var port = 8050;

app.use("/", express.static(__dirname + "/../"));

http.createServer(app).listen(port, function () {
    console.log('Static server listening on port %d', port);
});
