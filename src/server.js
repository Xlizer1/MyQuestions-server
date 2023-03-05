import express from "express";
import setupRoutes from "./router.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 8080;

const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to the Database");

    const app = express();

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use(cors());

    setupRoutes(app);

    app.listen(port, () =>
      console.log(`server is running on port ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
