import { Router } from "express";
import { loginController, logoutController, registerUserController, verifyEmailController } from "../controllers/user.controllers.js";
import auth from "../middlware/auth.js";
import upload from "../middlware/multer.js";

const userRouter = Router()

userRouter.post('/register', registerUserController)
userRouter.post('/verify-email', verifyEmailController)
userRouter.post('/login', loginController)
userRouter.get('/logout', logoutController)
// userRouter.post('/upload-photo', auth, upload.single('photo'), uploadPhoto)


export default userRouter