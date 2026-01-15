import jwt from 'jsonwebtoken';

// doctor authentication middleware
const authDoctor = async(req, res, next) => {
    try {
        const {dtoken} = req.headers;
        if(!dtoken){
            return res.json({success:false, message:"Not authorized Login Again"})
        }
        const token_decoded = jwt.verify(dtoken, process.env.JWT_SECRET);
        
        req.user = token_decoded;  //worked both //tranfer the userId to getProfile
        // req.body = { userId: token_decoded.id };    //remove all body data add only userId
        // req.body.userId = token_decoded;    //remove all body data add only userId



        next();
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}
export default authDoctor;