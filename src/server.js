import express from "express";
import setupRoutes from "./router.js";
import mongoose from "mongoose";
import cors from "cors";

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await mongoose.connect("mongodb+srv://xlizer1_:mustag252@asiaco.1czqfvx.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to the Database");

    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(cors());

    setupRoutes(app);

    app.listen(port, () => console.log("server is running on port 4000"));

  } catch (error) {
    console.log(error);
  }
};

start();