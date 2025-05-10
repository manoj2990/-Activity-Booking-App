
require("dotenv").config();
const app = require("./app");
const dbconnection = require("./config/databaseConfig");


dbconnection()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`----> Server is running at port: ${process.env.PORT}`);
    });

  })
  .catch((error) => {
    console.log( error);
  });


module.exports = app;