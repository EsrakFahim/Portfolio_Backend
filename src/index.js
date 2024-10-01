import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import { inject } from "@vercel/analytics";

dotenv.config({
      path: "./env",
});

inject();

connectDB()
      .then(() => {
            app.get("/", (req, res) => {
                  res.send("Welcome to the API");
            });

            app.listen(process.env.PORT || 5050, () => {
                  console.log(
                        `Server running on port ${process.env.PORT || 5050}`
                  );
            });

            app.on("error", (err) => {
                  console.log(err);
            });
      })
      .catch((error) => {
            console.error(error);
      });
