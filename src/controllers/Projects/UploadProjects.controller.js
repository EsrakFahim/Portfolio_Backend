import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const UploadProjects = asyncHandler(async (res, req) => {
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

      let errors = [];

      // Check required fields
      Object.entries(req?.body).forEach(([key, value]) => {
            if (!value || (Array.isArray(value) && value === 0)) {
                  errors.push(`${key} is required`);
            }
      });

      if (errors.length > 0) {
            return new apiErrorHandler(400, "Validation Error", errors);
      }
      

});

export { UploadProjects };
