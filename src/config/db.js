const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }

    try {
        mongoose.set('strictQuery', true);
        const connection = await mongoose.connect(process.env.MONGO_URI, {});
        isConnected = connection.connections[0].readyState === 1;
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
