import express from 'express'
import { GetUserProfile, Login, Logout, Register, UpdateProfile,UpdatePassword } from '../Controllers/UserController.js';
import { isAuthenticated } from '../Middlewares/Auth.js';
const router = express.Router();

router.post("/register",Register)
router.post("/login",Login)
router.get("/logout",isAuthenticated,Logout)
router.get("/getUserProfile",isAuthenticated,GetUserProfile)
router.put("/UpdateProfile",isAuthenticated,UpdateProfile)
router.post("/UpdatePassword",isAuthenticated,UpdatePassword)

export default router