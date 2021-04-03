const mongoose = require("mongoose");

const connectionURL = "mongodb://localhost:27017/uploader";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

module.exports = mongoose;
