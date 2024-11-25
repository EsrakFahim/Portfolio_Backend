import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// Corrected CORS configuration
const allowedOrigins = [
      "https://www.esrakfahim.me", // Corrected without trailing slash
];

const corsOptions = {
      origin: (origin, callback) => {
            console.log("Request origin:", origin); // Debug incoming origin
            if (!origin || allowedOrigins.includes(origin)) {
                  callback(null, true);
            } else {
                  console.error("CORS blocked origin:", origin);
                  callback(new Error("Not allowed by CORS"));
            }
      },
      credentials: true, // Allow credentials like cookies
      optionsSuccessStatus: 200, // For legacy browsers
};

// Apply middleware
app.set("trust proxy", 1); // Trust proxies for production (e.g., Vercel)
// app.options("*", cors(corsOptions)); // Handle preflight requests
app.use(cors(corsOptions)); // Enable CORS with the options
app.use(cookieParser()); // Enable cookie parsing
app.use(express.json({ limit: "50mb" })); // Support JSON payloads
app.use(express.urlencoded({ extended: true, limit: "50mb" })); // Support URL-encoded payloads
app.use(express.static("public")); // Serve static files

// Routes import
import projectRouter from "./routes/project.route.js";
import userRoute from "./routes/user.route.js";
import clientRouter from "./routes/client.route.js";

// Routes setup
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/client", clientRouter);

export { app };
