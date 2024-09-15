import { Router } from "express";
import { registerUser } from "../controllers/Users/registerUser.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), registerUser);


export default router;