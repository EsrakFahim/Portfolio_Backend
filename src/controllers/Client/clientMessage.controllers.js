import { asyncHandler } from "../../utils/asyncHandler.js";
import { apiResponse } from "../../utils/apiResponse.js";
import { apiErrorHandler } from "../../utils/apiErrorHandler.js";
import { ClientMessage } from "../../models/clientMessage.model.js";
import {
      messageReceivedConfig,
      notifyAdminConfig,
} from "../../utils/messageReceivedConfig.js"; // Import config for admin notification
import { transporter } from "../../Services/mailSender.js";

const clientMessage = asyncHandler(async (req, res, next) => {
      const {
            orgName,
            clientName,
            clientEmail,
            clientMessage: message,
            reqService,
            clientIP
      } = req.body;

      if (!orgName || !clientName || !clientEmail || !message) {
            return next(
                  new apiErrorHandler(res, 400, "All fields are required")
            );
      }

      // Create and save client message in the database
      const newMessage = await ClientMessage.create({
            orgName,
            clientName,
            clientEmail,
            clientMessage: message,
            reqService: reqService || "Not specified",
            clientIP: clientIP || "Not specified",
      });

      if (!newMessage) {
            return next(new apiErrorHandler(res, 500, "Error sending message"));
      }

      try {
            // Send acknowledgment email to the client
            const clientMailOption = messageReceivedConfig({
                  clientName,
                  clientEmail,
            });
            await transporter.sendMail(clientMailOption);

            // Send a notification email to you (the admin)
            const adminMailOption = notifyAdminConfig({
                  orgName,
                  clientName,
                  clientEmail,
                  message,
                  reqService,
                  clientIP
            });
            await transporter.sendMail(adminMailOption);

            // Respond with success
            return res
                  .status(200)
                  .json(
                        new apiResponse(
                              true,
                              newMessage,
                              "Message sent successfully and emails delivered"
                        )
                  );
      } catch (error) {
            console.error("Error sending email:", error);
            return next(
                  new apiErrorHandler(
                        res,
                        500,
                        "Message saved but failed to send email"
                  )
            );
      }
});

export { clientMessage };
