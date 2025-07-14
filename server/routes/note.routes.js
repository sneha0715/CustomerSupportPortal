import {createNote , viewNote} from "../controllers/note.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js";
import express from "express";
import { body, param } from "express-validator";
const router=express.Router()
const validateTicketId=[
  param("ticketId").isMongoId().withMessage("Invalid Ticket ID"),
];

const validateContent=[
  body("content")
    .notEmpty()
    .withMessage("Note text is required")
    .isLength({ min: 3 })
    .withMessage("Note text must be at least 3 characters long")
    .isLength({max:100})
    .withMessage("Note must be under 100 characters")
];

router.post("/:ticketId",authMiddleware,validateTicketId,validateContent,createNote)
router.get("/:ticketId",authMiddleware,validateTicketId,viewNote)

export default router;