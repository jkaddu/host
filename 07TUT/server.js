const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3500;

// "^" the carrot symbol is saying if it starts with a "/" and "$" is saying is must end with the "/" or "|"(represents or) end with "/index.html"
app.get("^/$|/index(.html)?", (req, res) => {
  // "sendFile" is one way to send aka serve a file
  // res.sendFile("./views/index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  // default statusCode is 302 for the redirect method
  res.redirect(301, "/new-page.html");
});

// Route Handlers
app.get(
  "/hey(.html)?",
  (req, res, next) => {
    console.log("Attempted to load hello.html");
    next();
  },
  (req, res) => {
    res.send("Hey World");
  }
);

// Chaining route handlers
const one = (req, res, next) => {
  console.log("one");
  next();
};

const two = (req, res, next) => {
  console.log("two");
  next();
};

const three = (req, res, next) => {
  console.log("three");
  res.send("Finished");
};

app.get("/chain(.html)?", [one, two, three]);

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
