const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const port = 5000;
const server = http.createServer(app);
const io = socketIO(server);

// Existing MongoDB connection for incoming data
const mqttMongoURI = 'mongodb://root:example@localhost:27017/admin'; // Default admin database

// MongoDB configuration for fetching data
const routesMongoURI = 'mongodb://yourUser:yourPassword@localhost:27017/routes'; // Specify the 'routes' database
const collectionName = '-21b'; // Specify the collection name

console.log('Connecting to MQTT MongoDB...');
mongoose.connect(mqttMongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const mqttDb = mongoose.connection;
mqttDb.on('error', (err) => {
  console.error('MQTT MongoDB connection error:', err);
});

mqttDb.once('open', () => {
  console.log('Connected to MQTT MongoDB');
  // Now that we are connected, you can proceed with other operations
  startServer();
});

// Define a Mongoose model for incoming data
const DataModel = mongoose.model('Data', {
  content: String,
  timestamp: { type: Date, default: Date.now },
});

// Serve static files from the current directory
app.use(express.static(__dirname));

// Express route to serve the HTML page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/new.html');
});

// Socket.IO connection event handler
io.on('connection', (socket) => {
  console.log('A client connected');
  // Emit the initial data to the connected client if needed
  // socket.emit('data', initialData);
  
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// API endpoint to fetch data from the specific collection using the new model
app.get('/api/routesdata', async (req, res) => {
  try {
    // New connection and model for fetching data from the 'routes' database
    const routesDb = await mongoose.createConnection(routesMongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const RoutesDataModel = routesDb.model('RoutesData', {
      content: String,
      timestamp: { type: Date, default: Date.now },
    }, collectionName);

    // Use the new model to fetch data from the specific collection
    const data = await RoutesDataModel.find().exec();
    res.json(data);

    // Close the connection after fetching data
    routesDb.close();
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
function startServer() {
  server.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}