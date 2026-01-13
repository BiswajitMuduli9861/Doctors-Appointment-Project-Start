import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import {v2 as cloudinary} from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import {cashfree} from '../config/cashfree.js'
import crypto from "crypto"

//API to register user
const registerUser = async(req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.json({success:false, message: 'Missing Details' });
        }
        //validating email format
        if(!validator.isEmail(email)) {
            return res.json({success:false, message: 'Enter a valid Email' });
        }
        //validating string password
        if(password.length < 8) {
            return res.json({success:false, message: 'Password must be at least 8 characters long' });
        }
        //hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        //generate user JWT token
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({success:true, token})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API for user login
const loginUser = async(req,res) =>{

    try {
        const {email, password} = req.body;
        if(!email || !password) {
            return res.json({success:false, message:"Missing Details"})
        }
        const user = await userModel.findOne({email});
        if(!user) {
        return res.json({success:false, message:"User not found"})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch) {
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({success:true, token})
    }else{
        res.json({success:false, message:"Invalid credentials"})
    }
} catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
}

}

//API to get user profile data
const getProfile = async(req,res) => {
    try {
        const userId = req.user.id; // getting userId from authUser 
        // console.log(userId)
        const userData = await userModel.findById(userId).select('-password');
        res.json({success:true,userData})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API TO UPDATE USER profile
const updateProfile = async(req,res) => {
    try {
        const userId = req.user.id; //getting userId from authUser
        const {name, phone, address,dob, gender} = req.body;  
        const imageFile = req.file;
        // console.log(userId,89)
            // console.log(req.file)
        await userModel.findByIdAndUpdate(userId,{name,phone, address: JSON.parse(address),dob, gender})
        if(imageFile){
            //upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, {image: imageUrl})
        }
        res.json({success:true, message:"Profile Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const bookAppointment = async(req,res) => {
    try {
        const userId = req.user.id; //getting userId from authUser
        const {docId, slotDate, slotTime} = req.body;
        // console.log(userId, docId, 111)
        const docData = await doctorModel.findById(docId).select('-password');
        // console.log(docData)
        //check doctor available or not
        if(!docData.available){
            return res.json({success:false, message:"Doctor not available"})
        }

        let slots_booked = docData.slots_booked;

        //checking for slot availability date or time
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:"Slot not available, Please choose another slot"})
            }else{
                slots_booked[slotDate].push(slotTime);
            }
        }else{
            slots_booked[slotDate]= []
            slots_booked[slotDate].push(slotTime);
        }
        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked; //removing slots_booked from docData to avoid redundancy

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success:true, message:"Appointment Booked"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get user appointments for frontend my-appointment page

const listAppointment = async(req,res) =>{
    try {
        const userId = req.user.id; //getting userId from authUser
        const appointments = await appointmentModel.find({userId})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to cancel appointment

const cancelAppointment = async(req,res)=>{
    try{
        const userId = req.user.id; //getting userId from authUser
        const {appointmentId} = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if(appointmentData.userId !== userId){
            return res.json({success:false, message:"Unauthorized action"})
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

        //releasing doctor slot
        const {docId, slotDate, slotTime} = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        let slots_booked = doctorData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter(slot => slot !== slotTime);
        console.log(userId,slots_booked)
        await doctorModel.findByIdAndUpdate(docId, {slots_booked});

        res.json({success:true, message:"Appointment cancelled"})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})   
    }
}



function generateOrderId(){
  return "APT_" + crypto.randomBytes(8).toString("hex")
}


//API to make payment of appointment using Cashfree
// chatgpt url - https://chatgpt.com/c/69653968-41bc-8332-a7db-4fc849b5a1f6

const paymentCashfree = async (req, res) => {
  try {
    const { appointmentId } = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)
    // console.log(appointmentId)
    // console.log(appointmentData)
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success:false, message:"Appointment Cancelled or not found" })
    }

    const orderId = generateOrderId()

    const request = {
      order_id: orderId,
      order_amount: Number(appointmentData.amount),
       order_currency: process.env.CURRENCY,
       customer_details: {
        customer_id: String(appointmentData.userId).slice(0, 40),
         customer_name: appointmentData.userData.name || "Patient",
         customer_email: appointmentData.userData.email || `${appointmentId}@yourapp.com`,
         customer_phone: appointmentData.userData.phone.padEnd(10, "0") || "9999999999"
       },
    //   order_meta: {
    //     return_url: "http://localhost:5173/payment-success?order_id={order_id}"

    //   }
      order_meta: {
        return_url: `http://localhost:5173/payment-success?appointment_id=${appointmentData._id}&order_id=${orderId}`
      }

    }

      const response = await cashfree.PGCreateOrder(request);
    //   console.log(response,274)
    res.json(response.data);

  } catch (error) {
    console.log(error)
        res.json({success:false, message:error.message})   
  }
}

//verify payment cashfree

const verifyCashfree = async (req, res) => {
  try {
    const { order_id, appointment_id } = req.body;
    console.log(order_id, appointment_id)
    const response = await cashfree.PGFetchOrder(order_id);

    // console.log(response)
    if (response.data.order_status === "PAID") {
      await appointmentModel.findOneAndUpdate(
        { _id: appointment_id },
        { payment: true }
      );
      return res.json({ success:true });
    }

    res.json({ success:false, message:"Payment Pending" });

  } catch (error) {
    res.json({ success:false, message:error.message });
  }
};


export { registerUser, loginUser, getProfile,updateProfile,bookAppointment,listAppointment,cancelAppointment, paymentCashfree,verifyCashfree};