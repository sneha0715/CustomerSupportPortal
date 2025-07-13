import {addTicket , viewTicket,deleteTicket} from "../controllers/ticket.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
const routes=express.Router();

routes.post("/",authMiddleware,addTicket);
routes.get("/:ticketId",authMiddleware,viewTicket);
routes.delete("/:ticketId",authMiddleware,deleteTicket);

export default routes