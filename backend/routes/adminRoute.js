import express from "express";
import { addDoctor, allDoctors, loginAdmin } from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/doctorController.js";

const adminRoute = express.Router();

adminRoute.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRoute.post('/login', loginAdmin);
adminRoute.get('/all-doctors', authAdmin, allDoctors)
adminRoute.post('/change-availability', authAdmin, changeAvailability)

export default adminRoute;