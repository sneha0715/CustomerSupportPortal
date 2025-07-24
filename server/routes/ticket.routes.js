import { addTicket, viewTicket, deleteTicket ,viewTickets ,updateTicketStatus} from "../controllers/ticket.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import { body, param } from "express-validator";
const routes = express.Router();

const validateTicketId = [
    param("ticketId").isMongoId().withMessage("Invalid Ticket ID"),
];

routes.post("/", authMiddleware, addTicket);
routes.get("/:ticketId", authMiddleware,validateTicketId, viewTicket);
routes.delete("/:ticketId", authMiddleware,validateTicketId, deleteTicket);
routes.get("/",authMiddleware, viewTickets);
routes.patch("/status/:ticketId", authMiddleware, validateTicketId, updateTicketStatus);
export default routes