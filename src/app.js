import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Middleware setup
app.use(
      cors({
            origin: process.env.SITE_ORIGIN, // CORS configuration for the specified origin
            credentials: true, // Allow cookies
      })
);
app.use(cookieParser()); // Enable cookie parsing
app.use(express.json({ limit: "50mb" })); // Enable JSON parsing with a size limit
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Support for URL-encoded data
app.use(express.static("public")); // Serve static files from 'public' directory

// Routes import
import projectRouter from "./routes/project.route.js";
import userRoute from "./routes/user.route.js";
import clientRouter from "./routes/client.route.js";

// Routes setup

// #user routes
app.use("/api/v1/user", userRoute);

// # projects routes
app.use("/api/v1/project", projectRouter); // Mount project routes

// # client routes
app.use("/api/v1/client", clientRouter); // Mount client routes


export { app };
