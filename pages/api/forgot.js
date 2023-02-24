import Forgot from "@/models/forgot"
import User from "@/models/User"

export default async function handler(req, res) {
    // Check if user exists in the Database 

    // Send an email to the user 
    if (req.body.senMail) {
        let token = `djkcvdshjchcjhvjsahhjchhcchjbcdcs`

        let forgot = new Forgot({
            email: req.body.email,
            token: token
        })

        let email = ` We have sent you this email in response to your request to reset your password on Shoppy.com.

    To reset your password, please follow the link below;
    
    <a href="http://shoppy.com/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your My Account Page and change your password.

    <br/><br/>`
    } else {
        // RESET USER PASSWORD

    }

    res.status(200).json({ name: "ayush" })
}