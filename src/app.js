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

// Routes setup
app.use("/api/v1/project", projectRouter); // Mount project routes

export { app };
