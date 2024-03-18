// // app.js

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const itemRoutes = require('./routes/itemRoutes');

// const app = express();
// const PORT = process.env.PORT || 3006;
// //const MONGODB_URI = 'your-mongodb-connection-string';
// const MONGODB_URI='mongodb://localhost:27017/Technostacks'

// app.use(bodyParser.json());

// mongoose.connect(MONGODB_URI, { })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err);
//   });

// app.use('/api/items', itemRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// module.exports = app; // Export the app for testing purposes










const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const PORT = process.env.PORT || 3006;
const MONGODB_URI = 'mongodb://localhost:27017/Technostacks'; // Your MongoDB connection string

app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, { })
  .then(() => {
    console.log('Connected to MongoDB');
    startServer(); // Start the server once MongoDB connection is established
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

function startServer() {
  const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    console.error('Error starting server:', error);
  });
}

app.use('/api/items', itemRoutes);

module.exports = app; // Export the app for testing purposes

