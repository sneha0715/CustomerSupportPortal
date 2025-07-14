import catchAsyncErrors from '../middlewares/catchAsyncErrors.js';
import User from '../models/users.js';
import ErrorHandler from '../middlewares/errorhandler.js';
import { validationResult } from "express-validator";

export const registerUser = catchAsyncErrors(async (req, res, next) => {


   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   const { fullname, email, password } = req.body;
   if (!fullname || !email || !password)
      return next(new ErrorHandler("Credentilas are required", 404))

   const existingUser = await User.findOne({ email });
   if (existingUser) return next(new ErrorHandler("User already Exists", 400))

   const hashedPassword = await User.hashPassword(password);

   const user = await User.create({
      fullname,
      email,
      password: hashedPassword
   })
   if (!user) return next(new ErrorHandler("Failed to register User", 400))

   const token = await user.generateToken();
   res.cookie('token', token);

   res.status(201).json({
      user,
      token,
      message: "Registration Successful"
   })

})

export const loginUser = catchAsyncErrors(async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
   }


   const { email, password } = req.body;
   // if (!email || !password) {
   //    return next(new ErrorHandler("Credentials are required", 404))
   // }

   const user = await User.findOne({ email }).select('+password')


   if (!user) {
      return next(new ErrorHandler("User not Found", 404))
   }

   const isPasswordMatched = await user.comparePassword(password)

   if (!isPasswordMatched) {
      return next(new ErrorHandler("Incorrect Password", 404))
   }
   const token = await user.generateToken();
   res.cookie('token', token)

   res.status(200).json({
      user,
      token,
      message: "login successful"
   })


})
export const currentUser = catchAsyncErrors(async (req, res, next) => {
   res.status(200).json(
      req.user
   )

})

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
   const token = req.cookies.token || req.headers.authorization.split(' ')[1]
   res.clearCookie('token')
   res.cookie('token', '', { expires: new Date(Date.now()) })
   res.status(200).json({
      message: "logout successful"
   })

})
