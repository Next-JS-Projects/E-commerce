import User from "@/models/User";
import connectDb from "@/middleware/Mongoose";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jwt.verify(token, process.env.JWT_SECRET);
    let dbuser = await User.findOneAndUpdate(
      { email: user.email },
      {
        address: req.body.address,
        pincode: req.body.pincode,
        name: req.body.name,
        phone: req.body.phone,
      }
    );
    const { name, email, address, phone, pincode } = dbuser;
    res
      .status(200)
      .json({ success: true, name, email, address, phone, pincode });
  } else {
    res.status(200).json({ success: false, error: "error" });
  }
};

export default connectDb(handler);
