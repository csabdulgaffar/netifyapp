// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");

require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://root:root@cluster0.mbr3hwy.mongodb.net/");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// API Routes
app.use("/api/todos", todoRoutes);

// Server Setup
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
