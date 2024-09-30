import mongoose from "mongoose";

const clientMessageSchema = new mongoose.Schema({
      orgName: {
            type: String,
            required: [true, "Organization name is required"],
      },
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
});

const ClientMessage = mongoose.model("ClientMessage", clientMessageSchema);

export { ClientMessage };
