import { uploadFileCloudinary } from "../../FileHandler/Upload.js";
import { Project } from "../../models/project.model.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const UploadProjects = asyncHandler(async (req, res) => {
      const {
            title,
            description,
            projectURL,
            projectType,
            projectStatus,
            projectStartDate,
            projectEndDate,
            projectDuration,
            projectRole,
            projectTeamSize,
            projectTechnologies,
            projectAchievements,
            projectClient,
      } = req.body;

      // console.log(req.body);

      let errors = [];

      // Check required fields
      Object.entries(req?.body).forEach(([key, value]) => {
            if (!value || (Array.isArray(value) && value === 0)) {
                  errors.push(`${key} is required`);
            }
      });

      if (errors.length > 0) {
            throw new apiErrorHandler(400, "Validation Error", errors);
      }
      console.log(req.files);
      // Check if project image is uploaded
      const projectImagePath = req.files.projectCoverImage[0].path;

      if (!projectImagePath)
            throw new apiErrorHandler(
                  400,
                  "Validation Error",
                  "Project cover image is required"
            );

      const projectCoverImageUpload =
            await uploadFileCloudinary(projectImagePath);

      if (!projectCoverImageUpload)
            throw new apiErrorHandler(
                  500,
                  "Internal Server Error",
                  "Error uploading project cover image"
            );
      console.log("owner id",req.user._id);

      const project = await Project.create({
            title,
            description,
            projectURL,
            projectOwner: req.user._id,
            projectCoverImage: projectCoverImageUpload.secure_url,
            projectCoverImageAlt: projectCoverImageUpload.original_filename,
            projectType: projectType || "",
            projectStatus: projectStatus || "",
            projectStartDate: projectStartDate || "",
            projectEndDate: projectEndDate || "",
            projectDuration: projectDuration || "",
            projectRole: projectRole || "",
            projectTeamSize: projectTeamSize || "",
            projectTechnologies: projectTechnologies || "",
            projectAchievements: projectAchievements || "",
            projectClient: projectClient || "",
      });

      if (!project)
            throw new apiErrorHandler(
                  500,
                  "Internal Server Error",
                  "Error uploading project"
            );

      return res
            .status(201)
            .json(
                  new apiResponse(201, "Project uploaded successfully", project)
            );
});

export { UploadProjects };
