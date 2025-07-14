import express from 'express';
import { registerUser, loginUser, currentUser, logoutUser } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { body } from "express-validator";
const router = express.Router();


const validateRegister = [
    body("fullname").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        .withMessage(
            "Password must contain uppercase, lowercase, number, and special character"
        ),
];





const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];



router.post('/register',validateRegister, registerUser)
router.post('/login',validateLogin, loginUser);
router.get('/', authMiddleware, currentUser);
router.get('/logout', authMiddleware, logoutUser);




export default router;
