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

module.exports = corsOptions;
