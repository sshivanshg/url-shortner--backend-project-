require('dotenv').config();  // Load environment variables from .env file

// const mongoose = require('mongoose');

// const connectToMongoDB = async (uri) => {
//     try {
//         await mongoose.connect(uri);  // No options needed
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.error("Failed to connect to MongoDB", error);
//         throw error;  // Propagate the error
//     }
// };

// module.exports = connectToMongoDB;
const mongoose = require('mongoose');

async function connectToMongoDB() {
    try {
        const uri = process.env.MONGODB_URI; // Ensure this is your Atlas URI
        await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error; // Propagate the error for handling in the caller
    }
}

module.exports = connectToMongoDB;
