const config = {
  app: {
    port: parseInt(process.env.PORT || 15000),
    upload_folder: "uploads",
  },
  db: {
    host: "localhost",
    port: 27017,
    name: "uploader",
  },
};

module.exports = config;
