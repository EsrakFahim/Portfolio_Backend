import mongoose, { Schema } from "mongoose";

// Enum for project status, type, role, and feedback rating
const projectStatusEnum = ["completed", "in progress", "on hold"];
const projectTypeEnum = [
      "Web Development",
      "Mobile Development",
      "Data Science",
      "AI/ML",
];
const projectRoleEnum = ["Development", "Design", "Both"];
const feedbackRatingEnum = [1, 2, 3, 4, 5];

const projectSchema = new Schema(
      {
            title: {
                  type: String,
                  required: [true, "Project title is required"],
                  index: true,
                  minlength: [5, "Title must be at least 5 characters long"],
                  maxlength: [100, "Title can't exceed 100 characters"],
            },
            description: {
                  type: String,
                  required: [true, "Project description is required"],
                  minlength: [
                        20,
                        "Description must be at least 20 characters long",
                  ],
            },
            projectOwner: {
                  type: Schema.Types.ObjectId,
                  ref: "User",
            },
            projectURL: {
                  type: String,
                  required: [true, "Project URL is required"],
                  match: [/^https?:\/\/.+\..+$/, "Please enter a valid URL"],
            },
            projectCoverImage: {
                  type: String,
                  required: [true, "Project cover image is required"],
            },
            projectCoverImageAlt: {
                  type: String,
                  required: [true, "Project cover image alt text is required"],
                  maxlength: [150, "Alt text can't exceed 150 characters"],
            },
            projectType: {
                  type: String,
                  // enum: {
                  //       values: projectTypeEnum,
                  //       message: "Invalid project type",
                  // },
                  required: [true, "Project type is required"],
            },
            projectStatus: {
                  type: String,
                  enum: {
                        values: projectStatusEnum,
                        message: "Invalid project status",
                  },
                  required: [true, "Project status is required"],
            },
            projectStartDate: {
                  type: String,
                  required: [true, "Project start date is required"],
            },
            projectEndDate: {
                  type: String,
                  required: [true, "Project end date is required"],
                  validate: {
                        validator: function (value) {
                              const startDate = new Date(this.projectStartDate);
                              const endDate = new Date(value);
                              return endDate > startDate;
                        },
                        message: "End date must be after the start date",
                  },
            },
            projectDuration: {
                  type: String,
                  required: [true, "Project duration is required"],
            },
            projectRole: {
                  type: String,
                  enum: {
                        values: projectRoleEnum,
                        message: "Invalid project role",
                  },
                  required: [true, "Your role in the project is required"],
            },
            projectTeamSize: {
                  type: Number,
                  required: [true, "Team size is required"],
                  min: [1, "Team size cannot be less than 1"],
            },
            projectTechnologies: {
                  type: [String],
                  // required: [true, "At least one technology is required"],
            },
            projectAchievements: {
                  type: [String],
                  // required: [true, "At least one achievement is required"],
            },
            projectClient: {
                  type: String,
                  // required: [true, "Client name is required"],
            },
      },
      {
            timestamps: true,
            toJSON: { virtuals: true },
            toObject: { virtuals: true },
      }
);

// Virtual field to compute project duration from start to end date
projectSchema.virtual("calculatedDuration").get(function () {
      if (this.projectStartDate && this.projectEndDate) {
            const startDate = new Date(this.projectStartDate);
            const endDate = new Date(this.projectEndDate);
            const durationInMs = endDate - startDate;
            const durationInDays = Math.floor(
                  durationInMs / (1000 * 60 * 60 * 24)
            );
            return `${durationInDays} days`;
      }
      return null;
});

// Indexes for better performance on fields commonly searched or filtered
projectSchema.index({ projectStatus: 1, projectType: 1 });

export const Project = mongoose.model("Project", projectSchema);
