import { apiErrorHandler } from "../utils/apiErrorHandler";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

const verifyJWT = asyncHandler(async (req, res, next) => {
      try {
            const token =
                  req?.cookie?.accessToken ||
                  req?.headers("authorization")?.replace("Bearer ", "");

            if (!token) {
                  throw new apiErrorHandler(401, "Unauthorized");
            }

            const decodedToken = jwt.verify(
                  token,
                  process.env.ACCESS_TOKEN_SECRET
            );

            const user = await User.findOne(decodedToken?._id).select(
                  "-userPassword -otp -otpExpiry -refreshToken -accessToken"
            );

            if (!user) {
                  throw new apiErrorHandler(401, "unauthorized");
            }

            req.user = user;
            next();
      } catch (error) {
            console.log("error from jwt auth:", error);
            throw new apiErrorHandler(401, "Unauthorized");
      }
});
