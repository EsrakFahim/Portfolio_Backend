import { Router } from "express";
import { UploadProjects } from "../controllers/Projects/UploadProjects.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getProjects } from "../controllers/Projects/getProjects.controller.js";

const router = Router();

router.route("/upload").post(
      verifyJWT, // Middleware to verify the JWT token
      upload.fields([
            {
                  name: "projectCoverImage", // The key expected in the form data
                  maxCount: 1, // Limits the number of files to 1
            },
      ]),
      UploadProjects // Controller handling the logic for project upload
);

router.route("/").get(getProjects);

export default router;
