const express = require('express');
const mongoose = require('mongoose');
const mqtt = require('mqtt');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const port = 5000;
const server = http.createServer(app);
const io = socketIO(server);

// MongoDB configuration
const mongoURI = 'mongodb://admin:password@localhost:27017/admin'; // Default admin database

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose model for your data
const DataModel = mongoose.model('Data', {
  content: String,
  timestamp: { type: Date, default: Date.now },
});

// MQTT broker configuration
const brokerUrl = 'mqtt://13.233.250.28'; // Replace with your MQTT broker's IP address or hostname
const topic = 'ayan'; // Replace with your desired topic

// Create MQTT client
const client = mqtt.connect(brokerUrl);

// Store received data
let receivedData = ''; // Use a single string to store the latest data

// MQTT client event handlers
client.on('connect', () => {
  client.subscribe(topic);
  console.log('Connected to MQTT broker');
});

client.on('message', async (topic, message) => {
  const content = message.toString();
  receivedData = content; // Update the stored data with the latest content

  // Log the received data and timestamp
  console.log('Received Data:', content);
  const timestamp = new Date();
  console.log('Timestamp:', timestamp);

  // Save data to MongoDB using async/await
  try {
    const newData = new DataModel({ content, timestamp });
    await newData.save();
    console.log('Data saved to MongoDB');
  } catch (error) {
    console.error('Error saving data to MongoDB:', error);
  }

  io.emit('data', receivedData); // Emit the received data to all connected clients
});

// Serve the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// Handle all other routes by serving the React app's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Socket.IO connection event handler
io.on('connection', (socket) => {
  console.log('A client connected');
  socket.emit('data', receivedData); // Send the initial data to the connected client

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

