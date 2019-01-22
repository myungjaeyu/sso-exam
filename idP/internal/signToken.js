const jwt = require('jsonwebtoken')

module.exports = signToken = ({ password, ...user }) => jwt.sign(user, process.env.JWT_SECRET_KEY || 'secretKEYu4bi-test-1234@#')