import express from 'express';
import { registerUser, loginUser ,currentUser, logoutUser} from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser);
router.get('/',authMiddleware,currentUser);
router.get('/logout',authMiddleware,logoutUser);


export default router;
