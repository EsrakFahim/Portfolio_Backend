import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user validation enum values
const workPostEnum = [
      "developer",
      "designer",
      "manager",
      "tester",
      "devops",
      "data scientist",
      "marketing",
      "HR",
      "finance",
      "legal",
      "content writer",
      "sales",
      "customer support",
      "video editor",
      "photographer",
      "SEO",
      "SMM",
      "UI/UX designer",
      "product manager",
      "business analyst",
      "quality analyst",
      "system administrator",
      "network administrator",
      "security analyst",
      "technical writer",
      "technical support",
      "technical recruiter",
      "technical architect",
      "technical consultant",
      "technical lead",
      "technical manager",
      "other",
];
const roleEnum = ["user", "admin"];

// Password validation function
const passwordReqCheck = function (value) {
      const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      // Check if password meets complexity criteria
      if (!passwordRegex.test(value)) {
            this.invalidate(
                  "userPassword",
                  "Password must be at least 8 characters long, contain 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
            );
            return false;
      }

      const { userName, fullName, email } = this;
      const lowerValue = value.toLowerCase();

      // Check if password contains the username
      if (lowerValue.includes(userName.toLowerCase())) {
            this.invalidate(
                  "userPassword",
                  "Password should not contain your username."
            );
            return false;
      }

      // Check if password contains the full name
      if (lowerValue.includes(fullName.toLowerCase())) {
            this.invalidate(
                  "userPassword",
                  "Password should not contain your full name."
            );
            return false;
      }

      // Check if password contains the email
      if (lowerValue.includes(email.toLowerCase())) {
            this.invalidate(
                  "userPassword",
                  "Password should not contain your email."
            );
            return false;
      }

      return true;
};

const userSchema = new Schema(
      {
            userName: {
                  type: String,
                  required: [true, "User name is required"],
                  unique: true,
                  index: true,
                  lowercase: true,
                  trim: true,
            },
            fullName: {
                  type: String,
                  required: [true, "Full name is required"],
                  lowercase: true,
            },
            userEmail: {
                  type: String,
                  required: [true, "User email is required"],
                  unique: true,
                  index: true,
                  lowercase: true,
                  trim: true,
            },
            userPhone: {
                  type: Number,
                  required: [true, "User phone is required"],
                  unique: true,
                  index: true,
            },
            userPassword: {
                  type: String,
                  required: [true, "User password is required"],
                  validate: {
                        validator: passwordReqCheck, // Passing the function as a reference
                  },
            },
            role: {
                  type: String,
                  default: "user",
                  enum: {
                        values: roleEnum,
                        message: "Invalid role",
                  },
            },
            workPost: {
                  type: String,
                  default: "",
                  enum: {
                        values: workPostEnum,
                        message: "Invalid work post",
                  },
            },
            refreshToken: {
                  type: String,
                  default: null,
            },
            accessToken: {
                  type: String,
                  default: null,
            },
            otp: {
                  type: String,
                  default: null,
            },
            otpExpiry: {
                  type: Date,
                  default: null,
            },
            avatar: {
                  type: String,
                  required: true,
            },
            avatarAlt: {
                  type: String,
                  required: true,
            },
      },
      {
            timestamps: true,
      }
);

// Hash password & OTP before saving
userSchema.pre("save", async function (next) {
      if (this.isModified("userPassword"))
            this.userPassword = await bcrypt.hash(this.userPassword, 10);

      if (this.isModified("otp") && this.otp)
            this.otp = await bcrypt.hash(this.otp, 10);

      next();
});

// Check if password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
      return await bcrypt.compare(password, this.userPassword);
};

// Check if OTP is correct
userSchema.methods.isOtpCorrect = async function (otp) {
      return await bcrypt.compare(otp, this.otp);
};

// Generate access token
userSchema.methods.generateAccessToken = function () {
      return jwt.sign(
            {
                  _id: this._id,
                  userEmail: this.userEmail,
                  userName: this.userName,
                  role: this.role,
                  workPost: this.workPost,
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                  expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
      );
};

// Generate refresh token
userSchema.methods.generateRefreshToken = function () {
      return jwt.sign(
            {
                  _id: this._id,
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                  expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
            }
      );
};

export const User = mongoose.model("User", userSchema);
