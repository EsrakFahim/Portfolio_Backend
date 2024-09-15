import { uploadFileCloudinary } from "../../FileHandler/Upload.js";
import { User } from "../../models/user.model.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res, next) => {
      console.log(req.body);
      console.log(req.files);

      const {
            userName,
            fullName,
            userEmail,
            userPassword,
            userPhone,
            workPost,
      } = req.body;

      if (
            [userName, fullName, userEmail, userPassword].some(
                  (field) => field?.trim() === ""
            )
      ) {
            throw new apiErrorHandler(400, "All fields are required");
      }

      // Check if the user already exists
      const existingUser = await User.findOne({
            $or: [
                  {
                        userEmail: userEmail,
                  },
                  {
                        userPhone: userPhone,
                  },
                  {
                        userName: userName,
                  },
            ],
      });

      switch (true) {
            case existingUser?.userEmail === userEmail:
                  throw new apiErrorHandler(
                        400,
                        "Provided Email already exists"
                  );
            case existingUser?.userPhone === userPhone:
                  throw new apiErrorHandler(
                        400,
                        "Provided Phone number already exists"
                  );
            case existingUser?.userName === userName:
                  throw new apiErrorHandler(
                        400,
                        "Provided Username already exists"
                  );
      }

      // avatar is a file, so we need to check if it is uploaded
      const avatarLocalPath = req.files?.avatar[0]?.path;

      if (!avatarLocalPath) {
            throw new apiErrorHandler(400, "Avatar is required");
      }

      const uploadAvatar = await uploadFileCloudinary(avatarLocalPath);

      if (!uploadAvatar) {
            throw new apiErrorHandler(500, "Error uploading avatar");
      }

      const user = await User.create({
            userName,
            fullName,
            userEmail,
            userPassword,
            userPhone,
            workPost,
            avatar: uploadAvatar.secure_url,
            avatarAlt: uploadAvatar.original_filename,
      });

      if (!user) {
            throw new apiErrorHandler(500, "Error registering user");
      }

      const createUser = await User.findById(user._id).select(
            "-userPassword -refreshToken -accessToken -otp -otpExpiry"
      );

      if (!createUser) {
            throw new apiErrorHandler(500, "Error creating user");
      }

      return res
            .status(201)
            .json(
                  new apiResponse(
                        201,
                        "User registered successfully",
                        createUser
                  )
            );
});

export { registerUser };
