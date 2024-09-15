import { Router } from "express";
import { registerUser } from "../controllers/Users/registerUser.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { loginUser } from "../controllers/Users/loginUser.controller.js";

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
router.route("/login").post(loginUser);

export default router;
