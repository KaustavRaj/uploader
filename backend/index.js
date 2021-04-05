const express = require("express");
const cors = require("cors");

const config = require("./config");
const baseRouter = require("./routes");
const app = express();

app.use(cors());
app.use(baseRouter);

app.listen(config.app.port, () => {
  console.log("Server is running at port : ", config.app.port);
});
