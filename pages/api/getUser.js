import User from "@/models/User";
import connectDb from "@/middleware/Mongoose";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT_SECRET);
    let dbuser = await User.findOne({ email: user.email });

    
    const { name, email, address, phone, pincode } = dbuser;
    res.status(200).json({ name, email, address, phone, pincode });
  } else {
    res.status(200).json({ error: "error" });
  }
};

export default connectDb(handler);
