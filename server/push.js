var sys     = require('sys')
var http    = require('http');
var request = require("./handlers/Request");

http.createServer(request.Request()).listen(4599);
sys.puts("Server running at http://127.0.0.1:4599/");