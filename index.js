require("dotenv").config();
const express = require("express"); 
const connectToMongoDB = require('./connect');
const urlRoute = require("./routes/url");
const app = express();
const URL = require('./models/url');
const PORT = process.env.PORT || 8001; 

connectToMongoDB(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

app.use(express.json());

app.use("/url", urlRoute);

app.get('/:shortId',async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
      shortId
    },{$push:{
      visitHistory: {
         timestamp: Date.now(),
      }

    },  
   });
   res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server started at port:${PORT}`));