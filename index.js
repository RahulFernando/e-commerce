const express = require('express');
const env = require('dotenv');
const mongoose = require('mongoose');
const app = express();

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');

// environment variable
env.config();

// database connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.a7til.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, 
    {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
).then(() => {
    console.log('Database connected');
});

// middlewares
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);

// listening to port
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
}); 