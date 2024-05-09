const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);
// Crsoo Orgin Resource Sharing
const mylist = [
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    // this statement is saying if the domain is in my list show it in the browser
    if (mylist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// built in middleware to handle urlencoded data aka form data: constentType: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// built in middkesware for json
app.use(express.json());

// serve static files
app.use(express.static(path.join(__dirname, "/public")));

app.get("^/$|/index(.html)?", (req, res) => {
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
    console.log("Attempted to load hey.html");
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

//
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("Not Found");
  }
});
// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
