require('dotenv').config(); 
// const express = require("express"); 
// const connectToMongoDB = require('./connect');
// const urlRoute = require("./routes/url");
// const app = express();
// const URL = require('./models/url');
// const PORT = 8001; 

// connectToMongoDB("mongodb://localhost:27017/mydatabase")
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => {
//     console.error("Failed to connect to MongoDB", err);
//     process.exit(1);
//   });

// app.use(express.json());

// app.use("/url", urlRoute);

// app.get('/:shortId',async (req, res) => {
//     const shortId = req.params.shortId;
//     const entry = await URL.findOneAndUpdate({
//       shortId
//     },{$push:{
//       visitHistory: {
//          timestamp: Date.now(),
//       }

//     },  
//    });
//    res.redirect(entry.redirectURL);
// });

// app.listen(PORT, () => console.log(`Server started at port:${PORT}`));

const express = require("express");
const connectToMongoDB = require('./connect');
const urlRoute = require("./routes/url");
const app = express();
const URL = require('./models/url');
const PORT = process.env.PORT || 8001;

// Use the MongoDB Atlas URI from environment variables
const mongoURI = process.env.MONGODB_URI || "mongodb+srv://sshivansh11:sshivansh11@cluster0.nxxvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB Atlas
connectToMongoDB(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Middleware to parse JSON requests
app.use(express.json());

// URL route for creating short URLs
app.use("/url", urlRoute);

// Route for handling redirection
app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    try {
      const entry = await URL.findOneAndUpdate(
        { shortId },
        { $push: { visitHistory: { timestamp: Date.now() } } },
        { new: true }  // Return the updated document
      );

      if (entry) {
        res.redirect(entry.redirectURL);
      } else {
        res.status(404).send("Short URL not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});
