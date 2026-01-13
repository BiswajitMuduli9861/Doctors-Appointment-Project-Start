import jwt from 'jsonwebtoken';

// user authentication middleware
const authUser = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if(!token){
            return res.json({success:false, message:"Not authorized Login Again"})
        }
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = token_decoded;  //worked both //tranfer the userId to getProfile
        // req.body = { userId: token_decoded.id };    //remove all body data add only userId
        // req.body.userId = token_decoded;    //remove all body data add only userId



        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export default authUser;