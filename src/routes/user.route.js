import { Router } from "express";
import { registerUser } from "../controllers/Users/registerUser.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import {
      loginUser,
      logoutUser,
} from "../controllers/Users/loginUser.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
      forgetPassword,
      resetPassword,
} from "../controllers/Users/forgetPassword.controller.js";
import { changePassword } from "../controllers/Users/changePassword.controller.js";
import { deleteAccount } from "../controllers/Users/deleteAccount.controller.js";
import { refreshAccessToken } from "../controllers/Users/refreshAccessToken.controller.js";
import { getAllUsers } from "../controllers/Users/getAllUsers.controllers.js";
import { verifyAdmin } from "../middlewares/adminAuth.middlewares.js";

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
router.route("/reset-forget").post(resetPassword);
router.route("/change-password").post(verifyJWT, changePassword);
router.route("/delete-account").delete(verifyJWT, deleteAccount);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);

// admin routes
router.route("/all-users").get(verifyJWT, verifyAdmin, getAllUsers);

export default router;
