const mongoose = require("mongoose");

async function db() {
  await mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("databaseConnectted"))
    .catch((err) => console.log("database error", err));
}

module.exports = db;
