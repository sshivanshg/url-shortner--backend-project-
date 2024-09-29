// const mongoose = require('mongoose');
//  async function connectToMongoDB(url){
//     return mongoose.connect(url);

//  }
// module.exports = connectToMongoDB;


const { MongoClient } = require('mongodb');

async function connectToMongoDB(mongoURI) {
  const client = new MongoClient(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: {
      version: '1', 
      strict: true, 
      deprecationErrors: true
    }
  });

  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Failed to connect to MongoDB Atlas", error);
    throw error;  // rethrow to handle in main app.js
  }
}

module.exports = connectToMongoDB;

// const mongoose = require('mongoose');

// async function connectToMongoDB(url) {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     console.log("Successfully connected to MongoDB");
//   } catch (error) {
//     // Log and exit if connection fails
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1); // Optional: Exit the process on failure
//   }
// }

// module.exports = connectToMongoDB;