import { Router } from "express";
import { registerUser } from "../controllers/Users/registerUser.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(
      upload.fields([
            {
                  name: "avatar",
                  maxCount: 1, // For a single file
            },
      ]),
      registerUser
);

export default router;
