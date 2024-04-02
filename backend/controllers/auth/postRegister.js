const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postRegister = async (req, res) => {
    //res.send('register route')

    try {
        const { email, username ,password } = req.body

        //check if user already exists

        const userExists = await User.exists({ email: email.toLowerCase() })

        if(userExists) {
            return res.status(409).send("E-mail already in use.")
        }

        // encrypting the password of user

        const encryptedPassword = await bcrypt.hash(password, 10)

        // creating user document to save in the database

        const user = await User.create({
            
            username,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        // create JWT Token

        const token = jwt.sign(
            {
                userId: user._id,
                email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn : "24h",
            }
        )

        res.status(201).json({
            userDetails: {
                email: user.email,
                token: token,
                username: user.username,
                _id: user._id
            },
        })

    } catch(err) {
        return res.status(500).send("Error occured. Please try again.")
    }
}

module.exports = postRegister