var http = require("http");


var fs = require('fs');
var path = require('path');
var mime = require('mime');




function send404(response) {
  response.writeHead(404, {"Content-type" : "text/plain"});
  response.write("Error 404: resource not found");
  response.end();
}

function sendPage(response, filePath, fileContents) {
  response.writeHead(200, {"Content-type" : mime.lookup(path.basename(filePath))});
  response.end(fileContents);
}

function serverWorking(response, absPath) {
  fs.exists(absPath, function(exists) {
    if (exists) {
      fs.readFile(absPath, function(err, data) {
        if (err) {
          send404(response)
        } else {
          sendPage(response, absPath, data);
        }
      });
    } else {
      send404(response);
    }
  });
}

var server = http.createServer(function(request, response) {
  var filePath = false;

  response.writeHead(200, {"Content-Type": "text/plain"});

  if (request.url == '/') {
    filePath = "/index.html";
  } else {
    filePath = request.url;
  }

  var absPath = "./" + filePath;

  console.log('WOW I AM RUNNING')
  serverWorking(response, absPath);
  
}).listen(process.env.PORT || 3001);



// http.createServer(function(request, response) {
  
// }).listen(3000);


// server();