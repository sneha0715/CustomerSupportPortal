import mongoose from "mongoose";
/**
 * Note model for storing notes related to tickets.
 * Each note is associated with a user and a ticket.
 */
const noteSchema = new mongoose.Schema(
   {
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      ticketId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Ticket",
         required: true,
      },
      content: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: true,
   }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;

