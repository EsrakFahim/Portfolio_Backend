import mongoose from "mongoose";

const clientMessageSchema = new mongoose.Schema({
      clientName: {
            type: String,
            required: [true, "Client name is required"],
      },
      clientEmail: {
            type: String,
            required: [true, "Client email is required"],
            match: [/.+\@.+\..+/, "Please enter a valid email address"],
      },
      clientMessage: {
            type: String,
            required: [true, "Message is required"],
      },
      reqService: {
            type: String,
            default: "Not specified",
      },
      clientIP: {
            type: String,
            default: "Not specified",
      },
});

const ClientMessage = mongoose.model("ClientMessage", clientMessageSchema);

export { ClientMessage };
