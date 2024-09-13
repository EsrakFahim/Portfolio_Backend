import mongoose, { Schema } from "mongoose";

// Enum for project status
const projectStatusEnum = ["completed", "in progress", "on hold"];
const projectTypeEnum = [
      "web development",
      "mobile development",
      "data science",
      "AI/ML",
];
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
            projectURL: {
                  type: String,
                  required: [true, "Project URL is required"],
                  match: [/^https?:\/\/.+\..+$/, "Please enter a valid URL"],
            },
            projectImage: {
                  type: [String],
                  required: [
                        true,
                        "At least one project image URL is required",
                  ],
                  validate: {
                        validator: function (value) {
                              return value.length > 0;
                        },
                        message: "Project images cannot be empty",
                  },
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
                  enum: {
                        values: projectTypeEnum,
                        message: "Invalid project type",
                  },
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
                  type: Date,
                  required: [true, "Project start date is required"],
            },
            projectEndDate: {
                  type: Date,
                  required: [true, "Project end date is required"],
                  validate: {
                        validator: function (value) {
                              return value > this.projectStartDate;
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
                  required: [true, "Your role in the project is required"],
            },
            projectTeamSize: {
                  type: Number,
                  required: [true, "Team size is required"],
                  min: [1, "Team size cannot be less than 1"],
            },
            projectTechnologies: {
                  type: [String],
                  required: [true, "At least one technology is required"],
            },
            projectResponsibilities: {
                  type: [String],
                  required: [true, "At least one responsibility is required"],
            },
            projectChallenges: {
                  type: [String],
                  required: [true, "At least one challenge is required"],
            },
            projectAchievements: {
                  type: [String],
                  required: [true, "At least one achievement is required"],
            },
            projectClient: {
                  type: String,
                  required: [true, "Client name is required"],
            },
            projectClientFeedback: {
                  type: String,
                  required: [true, "Client feedback is required"],
                  minlength: [
                        10,
                        "Client feedback must be at least 10 characters long",
                  ],
            },
            projectClientFeedbackRating: {
                  type: Number,
                  required: [true, "Client feedback rating is required"],
                  enum: {
                        values: feedbackRatingEnum,
                        message: "Feedback rating must be between 1 and 5",
                  },
            },
            projectClientFeedbackDate: {
                  type: Date,
                  required: [true, "Feedback date is required"],
            },
            projectClientFeedbackURL: {
                  type: String,
                  required: [true, "Feedback URL is required"],
                  match: [/^https?:\/\/.+\..+$/, "Please enter a valid URL"],
            },
            projectClientFeedbackImage: {
                  type: String,
                  required: [true, "Feedback image URL is required"],
            },
            projectClientFeedbackImageAlt: {
                  type: String,
                  required: [true, "Feedback image alt text is required"],
                  maxlength: [150, "Alt text can't exceed 150 characters"],
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
            const durationInMs = this.projectEndDate - this.projectStartDate;
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
