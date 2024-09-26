import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Project } from "../../models/project.model.js";

const getProjects = asyncHandler(async (req, res, next) => {
      const { category, page = 1, limit = 10 } = req.query; // Default values for page and limit

      // Build the query object based on the category
      const query = category === "all" ? {} : { projectRole: category };

      // Get the projects and apply pagination
      const projects = await Project.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

      if (!projects || projects.length === 0) {
            throw new apiErrorHandler(404, "No projects found");
      }

      // Get the total number of projects matching the query
      const totalProjects = await Project.countDocuments(query);

      // Respond with the paginated projects and total count
      return res.status(200).json(
            new apiResponse(
                  200,
                  {
                        projects,
                        totalProjects,
                        currentPage: parseInt(page),
                        totalPages: Math.ceil(totalProjects / limit),
                  },
                  "Projects fetched successfully"
            )
      );
});

export { getProjects };
