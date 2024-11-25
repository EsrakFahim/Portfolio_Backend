import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CORS configuration
const allowedOrigins = [
      "https://www.esrakfahim.me/",
];

console.log("Allowed origins:", allowedOrigins);

const corsOptions = {
      origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin || allowedOrigins.includes(origin)) {
                  callback(null, true);
            } else {
                  callback(new Error("Not allowed by CORS"));
            }
      },
      credentials: true, // Allow cookies to be sent
      optionsSuccessStatus: 200, // For legacy browser support
};

app.set('trust proxy', 1); // Trust first proxy (e.g., Vercel or other reverse proxies)
app.use(cors(corsOptions)); // Enable CORS with options
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
