import { Router } from "express";
import { UploadProjects } from "../controllers/Projects/UploadProjects.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/upload").post(
      upload.fields([
            {
                  name: "projectCoverImage", // The key expected in the form data
                  maxCount: 1, // Limits the number of files to 1
            },
      ]),
      UploadProjects // Controller handling the logic for project upload
);

export default router;
