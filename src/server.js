import express from "express";
import setupRoutes from "./router.js";
import mongoose from "mongoose";
import cors from "cors";
import { mongoURI } from "./helper/utility.js";

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the Database");

    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(cors());

    setupRoutes(app);

    app.listen(port, () => console.log("server is running on port 8080"));

  } catch (error) {
    console.log(error);
  }
};

start();