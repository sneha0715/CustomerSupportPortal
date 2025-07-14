import ErrorHandler from "../middlewares/errorhandler.js";
import Note from "../models/note.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models//users.js";
import Ticket from "../models/ticket.js";
import { validationResult } from "express-validator";
export const createNote = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { content } = req.body;
    const userId = req.user.id;
    const ticketId = req.params.ticketId;

    if (!content) {
        return next(new ErrorHandler("Provide some content", 404));
    }

    const ticket = await Ticket.findById(ticketId)
    if (ticket.userId.toString() != userId.toString()) {
        return next(new ErrorHandler("Not authorize for making note", 404))
    }

    const note = await Note.create({
        userId,
        ticketId,
        content
    })

    res.status(201).json({
        note,
        message: "note created"
    })
})

export const viewNote = catchAsyncErrors(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { ticketId } = req.params;
    // const req={
    //     params:{
    //         ticketId:1234567
    //     }
    // }
    if (!ticketId) {
        return next(new ErrorHandler("ticketId not found", 404))
    }
    const ticket = await Ticket.findById(ticketId)
    if (!ticket) {
        return next(new ErrorHandler("ticket not found", 404))
    }

    const userId = req.user.id
    if (ticket.userId.toString() != userId.toString()) {
        return next(new ErrorHandler("Not Authorize", 401))
    }

    const note = await Note.find({ ticketId })

    if (!note) {
        return next(new ErrorHandler("note not found", 404))
    }
    res.status(200).json({
        note
    })


})