import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { ClientMessage } from "../../models/clientMessage.model.js";

const clientMessage = asyncHandler(async (req, res, next) => {
      const {
            orgName,
            clientName,
            clientEmail,
            clientMessage: message,
            reqService,
      } = req.body;

      if (!orgName || !clientName || !clientEmail || !message) {
            return next(
                  new apiErrorHandler(res, 400, "All fields are required")
            );
      }

      const newMessage = await ClientMessage.create({
            orgName,
            clientName,
            clientEmail,
            clientMessage: message,
            reqService: reqService || "Not specified",
      });

      if (!newMessage) {
            return next(new apiErrorHandler(res, 500, "Error sending message"));
      }

      return res
            .status(201)
            .json(
                  new apiResponse(true, newMessage, "Message sent successfully")
            );
});

export { clientMessage };
