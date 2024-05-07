const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("node:fs/promises");
const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
  try {
    const data = fsPromises.readFile(filePath, "utf8");
    response.writeHead(200, { "Content-Type": contentType });
    response.end();
  } catch (err) {
    console.log(err);
    response.statusCode = 500;
    response.end();
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  console.log(path.join(__dirname, "views", req.url, "index.html"));

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case "jpg":
      contentType = "imgage/jpeg";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case "txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }

  let filePath =
    contentType === "text/html" && req.url === "/"
      ? path.join(__dirname, "views", "index.html")
      : contentType === "text/html" && req.url.slice(-1) === "/"
      ? path.join(__dirname, "views", req.url, "index.html")
      : contentType === "text/html"
      ? path.join(__dirname, "views", req.url)
      : path.join(__dirname, req.url);

  // If statement that if there is not html extension to the filePath it adds it
  if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

  const fileExist = fs.existsSync(filePath);

  if (fileExist) {
    serveFile(filePath, contentType, res);
  } else {
    // could be 404 or 301 aka redirect
    switch (path.parse(filePath).base) {
      case "old-page.html":
        res.writeHead(301, { Location: "/new-page.html" });
        res.end();
        break;
      case "www-page.html":
        res.writeHead(301, { Location: "/" });
        res.end();
        break;
      default:
        serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
    }
  }
});

// initialize object
const myEmitter = new Emitter();

// add listener for event
// myEmitter.on("log", (msg) => logEvents(msg));

//   myEmitter.emit("log", "Log event emitted!");

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
