import ErrorHandler from "../middlewares/errorhandler.js";
import Ticket from "../models/ticket.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const addTicket=catchAsyncErrors(async(req,res,next)=>{
    const userId=req.user.id;
    const{title,description,product}=req.body;
    if(!title || !description || !product){
        return next(new ErrorHandler("Credentials not found",404));
    }
    const ticket=await Ticket.create({ 
        title,
        description,
        userId,
        product
    })
    if(!ticket){
        return next(new ErrorHandler("Error while creating the ticket",404));
    }
    res.status(201).json({
        ticket,
        message:"Ticket created successfully"
    })
})
export const viewTicket=catchAsyncErrors(async(req,res,next)=>{
    const ticketId=req.params.ticketId;
    const ticket=await Ticket.findById(ticketId).populate({path:"userId",select:"-password"});
    if(!ticket){
        return next(new ErrorHandler("ticket not found",404))
    }
    const userId=req.user.id;
    if(ticket.userId._id.toString()!=userId.toString()){
        return next(new ErrorHandler("You are not authorized to access ticket",401));
    }
    res.status(200).json({
        ticket
    })

    
})

export const deleteTicket=catchAsyncErrors(async(req,res,next)=>{
    const ticketId=req.params.ticketId;
    const ticket=await Ticket.findById(ticketId).populate({path:"userId",select:"-password"});
    if(!ticket){
        return next(new ErrorHandler("ticket not found",404));
    }
    const userId=req.user.id;
    if(ticket.userId._id.toString()!=userId.toString()){
        return next(new ErrorHandler("You are not aithorize to delete ticket"))
    }
    await Ticket.findByIdAndDelete(ticketId);
    res.status(200).json({
        message:"ticket deleted"
    })
})