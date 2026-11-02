const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });
const noteRoutes = require("./routes/noteRoutes");
const app = express();
const connectDB = require('./config/db');
const authRoutes = require("./routes/authRoutes");  
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);                     
app.use("/api/notes", noteRoutes);


const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
