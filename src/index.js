import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./db/index.js";

dotenv.config({
      path: "./env",
});

connectDB()
      .then(() => {
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
