const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    // this statement is saying if the domain is in my list show it in the browser
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;
