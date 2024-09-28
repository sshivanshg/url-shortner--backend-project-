const mongoose = require('mongoose');
 async function connectToMongoDB(url){
    return mongoose.connect(url);

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