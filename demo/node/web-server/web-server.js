let http = require("http");
let url = require("url");
let fs = require("fs");

let webFolderPath = "public";

/* Create an HTTP server.
The callback is called for every client request : function(request, response)
*/
var serverHTTP = http.createServer(function (request, response) {
  let myURL = url.parse(request.url);
  console.log("Ressource requested : " + myURL.pathname.substr(1));

  // if no ressource is requested, consider that the index.html file is requested
  if (myURL.pathname === "/") {
    myURL.pathname = "/index.html";
  }

  let localPath = webFolderPath + myURL.pathname;

  fs.readFile(localPath, function (err, data) {
    if (err) {
      // the ressource was not found on the servor. Provide the error status code.
      console.log("err:",err.toString());
      response.writeHead(404, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Language": "fr",
      });
      response.write(err.toString());
      response.end();
    } else {
      /* the ressource was found. Provide status code 200 confirming that everything is OK
            200 signifie que tout est OK*/
      response.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Language": "fr",
      });
      //Write the content of the file in the response to be sent back to the client
      response.write(data.toString());
      // end the response
      response.end();
    }
  });
});
// listen on the 777 port
serverHTTP.listen(777);
console.log("Minimal web server");
