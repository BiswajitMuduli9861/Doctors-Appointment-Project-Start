import express from 'express';
import { bookAppointment, getProfile, loginUser, registerUser, updateProfile, listAppointment, cancelAppointment, paymentCashfree, verifyCashfree} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.put('/update-profile',upload.single('image'),authUser, updateProfile)
userRouter.post('/book-appointment',authUser, bookAppointment)
userRouter.post('/book-appointment',authUser, bookAppointment)
userRouter.get('/appointments',authUser, listAppointment)
userRouter.put('/cancel-appointment',authUser, cancelAppointment)
userRouter.post('/payment-cashfree',authUser, paymentCashfree)
userRouter.post('/payment-verify', verifyCashfree)



export default userRouter;