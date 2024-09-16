import { Router } from "express";
import { registerUser } from "../controllers/Users/registerUser.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
      loginUser,
      logoutUser,
} from "../controllers/Users/loginUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { forgetPassword } from "../controllers/Users/forgetPassword.controller.js";

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
router.route("/logout").post(verifyJWT, logoutUser);

router.route("/password-forget").post(forgetPassword);

export default router;
