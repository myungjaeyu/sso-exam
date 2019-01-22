const USERS = require('./_USERS_DATA')

module.exports = getUser = email => USERS.find(user => user.email === email)