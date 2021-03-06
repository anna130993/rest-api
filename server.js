const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use(helmet());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));
// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');
const daysRoutes = require('./routes/days.routes.js');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', daysRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});
app.use((req, res) => {
  res.status(404).json({ message: 'Page not found' });
});

const dbURI = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27017/NWTest' : `mongodb+srv://13099319AmZ:${process.env.DB_PASSWORD}@cluster0.jq4ob.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database: ', dbURI);
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: ', process.env.PORT || 8000);
});
const io = socket(server);
io.on('connection', socket => {
  console.log('New socket ', socket.id);
});

module.exports = server;