import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
      cors({
            origin: 'https://www.esrakfahim.me',
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
      })
);
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static("public"));

// Routes import
import projectRouter from "./routes/project.route.js";
import userRoute from "./routes/user.route.js";
import clientRouter from "./routes/client.route.js";

// Routes setup
app.use("/api/v1/user", userRoute);
app.use("/api/v1/project", projectRouter);
app.use("/api/v1/client", clientRouter);

export { app };
