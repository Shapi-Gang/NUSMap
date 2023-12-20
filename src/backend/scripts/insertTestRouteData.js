const mongoose = require('mongoose');
const path = require('path');
const BusRoute = require('../models/busRoute'); // Adjust the path as needed
const BusStop = require('../models/busStop'); // Adjust the path as needed

async function insertTestRouteData() {
    try {
        // Load environment variables
        require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
        const mongoUri = process.env.MONGODB_URI;

        // Connect to MongoDB
        await mongoose.connect(mongoUri);
        console.log('Database connection successful');

        // Fetch and map bus stops' names to their ObjectIds
        const stopNamesToIds = {};
        const busStops = await BusStop.find({});
        busStops.forEach(stop => {
            stopNamesToIds[stop.name] = stop._id;
        });

        const testRoutes = [
            {
                name: 'Campus Loop Route',
                code: 'CLOOP',
                stops: [
                    stopNamesToIds['Central Library'], 
                    stopNamesToIds['Yusof Ishak House'],
                    stopNamesToIds['University Town'],
                    stopNamesToIds['Faculty of Engineering'],
                    stopNamesToIds['Science Park Drive'],
                    stopNamesToIds['Business School'],
                    stopNamesToIds['Prince George\'s Park'],
                    stopNamesToIds['COM2 (School of Computing)'],
                    stopNamesToIds['Opposite Kent Ridge MRT'],
                    stopNamesToIds['Ventus (Opp LT13)'],
                    stopNamesToIds['Opposite University Health Center'],
                    stopNamesToIds['Raffles Hall'],
                    stopNamesToIds['Opposite Hon Sui Sen Memorial Library']
                ],
                description: 'A comprehensive loop covering major academic and residential areas in NUS.'
            },
            {
                name: 'Science and Business Route',
                code: 'SCI-BIZ',
                stops: [
                    stopNamesToIds['Science Park Drive'],
                    stopNamesToIds['Faculty of Engineering'],
                    stopNamesToIds['Business School'],
                    stopNamesToIds['Opposite Hon Sui Sen Memorial Library'],
                    stopNamesToIds['Ventus (Opp LT13)']
                ],
                description: 'Connects key faculties and departments related to science and business studies.'
            }
            // ... You can add more routes as needed
        ];        

        // Delete existing routes and insert new test data
        await BusRoute.deleteMany({});
        await BusRoute.insertMany(testRoutes);
        console.log('Test route data inserted successfully!');
    } catch (error) {
        console.error('Error inserting test route data:', error);
    } finally {
        // Disconnect from the database
        await mongoose.disconnect();
        console.log('Disconnected from database');
    }
}

insertTestRouteData();
