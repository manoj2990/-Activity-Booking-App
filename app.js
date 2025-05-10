

const express = require("express")
const app = express();
const cookieparser = require("cookie-parser")
const cors = require('cors');
const globalApiErrorHandler = require("./middlewares/globalApiError.middleware");
const routes = require("./routes/index");

const { CORS_ORIGIN } = require("./constant");



app.use(cors({
    origin: CORS_ORIGIN || '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  }));

  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ extended: true, limit: "16kb" }));

  app.use(cookieparser());


//all routes
  routes(app);


app.use(globalApiErrorHandler);


app.get('/', (req, res) => {
    console.log('api call at /');
    res.send('<------server api call is wroking-------->'); 
});  



module.exports = app;