const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//routes
const createLibraryRoute = require("./routes/createlib");
// const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/createlib", createLibraryRoute);
// app.use("/auth", authRoutes);

//error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//mongo db
mongoose
  .connect("mongodb://localhost:27017")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
