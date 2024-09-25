import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { Project } from "../../models/project.model.js";

const getProjects = asyncHandler(async (req, res, next) => {
      const { category = "all", page, limit } = req.query; // Use req.query instead of req.params

      try {
            const query = category === "all" ? {} : { projectType: category };

            const projects = await Project.find(query)
                  .skip((page - 1) * limit)
                  .limit(parseInt(limit));

            if (!projects) {
                  throw new apiErrorHandler(404, "No projects found");
            }

            const totalProjects = await Project.countDocuments(query);

            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              200,
                              {
                                    projects,
                                    totalProjects,
                              },
                              "Projects fetched successfully"
                        )
                  );
      } catch (error) {
            console.log(error);
            throw new apiErrorHandler(500, "Internal Server Error");
      }
});

export { getProjects };
