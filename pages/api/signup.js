import User from "@/models/User";
import connectDb from "@/middleware/Mongoose";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    const { name, email } = req.body;
    let u = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(req.body.password, `secret123`).toString(),
    });

    res.status(200).json({ success: "success" });
    await u.save();
  } else {
    res.status(500).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
