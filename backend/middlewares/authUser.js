import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token){
            return res.json({success:false, message:"Not authorized Login Again"})
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // req.body = { userId: token_decoded.id };   //tranfer the userId to getProfile
        // req.user = token_decoded
        req.user = token_decoded;  //worked both
        // req.body.userId = token_decoded;


        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export default authUser;