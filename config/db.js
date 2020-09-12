const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

async function connectDB() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit app with nonzero code
    process.exit(1);
  }
}

module.exports = connectDB;
