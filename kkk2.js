// ... other imports and code ...

// MongoDB configuration (updated)
const mongoURI = 'mongodb://<username>:<password>@<remote_host>:<port>/routes'; // Replace with your actual credentials and host

// Define a Mongoose model for the "-21b" collection
const BusModel = mongoose.model('Bus', {
  route: String, // Adjust schema based on your actual bus data structure
  // ... other bus data fields ...
}, '-21b'); // Specify the collection name

// ... rest of the code (unchanged) ...
