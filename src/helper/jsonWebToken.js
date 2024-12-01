const jwt = require('jsonwebtoken');
require('dotenv').config()

const GenerateToken = async (payload) => {
    const token = await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRECT, { expiresIn: process.env.TOKEN_EXPIRY_DATE });
    return token
    
}

module.exports = { GenerateToken}