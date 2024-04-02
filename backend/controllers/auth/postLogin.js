const User = require('../../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const postLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        // checking if the email entered
        // is already present in the database

        const user = await User.findOne({ email: email.toLowerCase() })
        
        if(user && (await bcrypt.compare(password, user.password))) {
            // if this matches then we can send new token
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

            return res.status(200).json({
                userDetails:{
                    email: user.email,
                    token: token,
                    username: user.username,
                    _id: user._id
                },
            })
        } 
        return res.status(400).send('Invalid Credentials. Please try again.')
        }

     catch (err) {
        return res.status(500).send('Something went wrong. Please try again.')
    }
}

module.exports = postLogin