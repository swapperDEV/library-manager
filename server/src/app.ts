import express from "express";
import type { ErrorRequestHandler } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";

//routes
import createLibraryRoute from "./routes/createlib";
import authRoutes from "./routes/auth";
//https://jonathan-holloway.medium.com/node-and-express-session-a23eb36a052

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

app.set("trust proxy", 1);
app.use(
  session({
    name: `authSession`,
    secret: `swapperdev`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 60000 * 20, // 20 min
    },
  })
);

app.use("/createlib", createLibraryRoute);
app.use("/auth", authRoutes);

//error handling
app.use(((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
}) as ErrorRequestHandler);

//mongo db
mongoose
  .connect("mongodb://localhost:27017")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
