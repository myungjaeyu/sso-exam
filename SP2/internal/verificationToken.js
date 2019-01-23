const jwt = require('jsonwebtoken')

module.exports = verificationToken = token => jwt.verify(token, process.env.JWT_SECRET_KEY || 'secretKEYu4bi-test-1234@#')