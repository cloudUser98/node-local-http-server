const http = require("http");
//const fs = require("fs").promises;
const fs = require("fs");
const path = require('path');

const host = 'localhost';
const port = 8000;

const types = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  json: 'application/json',
  xml: 'application/xml',
  ico: 'image/x-icon',
};


const requestListener = function (req, res) {

    const url = req.url === "/" ? "/index.html" : req.url
    const extension = path.extname(url).slice(1);
    const type = extension ? types[extension] : types.html;

    console.log("Serving file with extension: ", extension, type, url)

    fs.promises.readFile(__dirname + url, "utf8")
        .then(contents => {
            //res.setHeader("Contetn-Type", type);
            res.writeHead(200, {"Content-Type": type});
            res.end(contents);
        })
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
