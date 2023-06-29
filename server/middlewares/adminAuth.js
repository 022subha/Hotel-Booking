import jwt from "jsonwebtoken";

export const authMiddleware=async(req,res,next)=>{
    try
    {
      const token=req.body.headers["Authorization"].split(" ")[1];
      jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
        if(err)
        {
            return res.status(402)
            .json({
                status:false,
                message:"Authentication failed!!"
            })
        }
        if(decoded.isAdmin)
        {
            next();
        }
        else{
            return res.status(401)
            .json({
                status:false,
                message:"You are not an admin and you have not access to this!!",
            })
        }
      })
    }
    catch(error)
    {
        return res.status(501)
        .json({
            status:false,
            message:"Authentication failed!"
        })
    }
}