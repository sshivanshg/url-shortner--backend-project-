const express = require("express");
const connectToMongoDB = require('./connect');
const urlRoute = require("./routes/url");
const app = express();
const PORT = 8080; // Changed from 8001 to 8080

connectToMongoDB('mongodb://localhost:27017/mydatabase')
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.use(express.json());

app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));