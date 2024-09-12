import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
      cors({
            // to allow cross-origin requests
            origin: process.env.SITE_ORIGIN,
            credentials: true,
      })
);
app.use(cookieParser()); // to support cookie parsing
app.use(express.json());
app.use(express.static("public"));
app.use(
      express.urlencoded({
            // to support URL-encoded bodies
            extended: true,
            limit: "50mb",
      })
);
app.use(express.json({ limit: "50mb" })); // to support JSON-encoded bodies

export { app };
