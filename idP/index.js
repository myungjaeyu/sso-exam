const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const getUser = require('./internal/getUser')
const verification = require('./internal/verification')
const signToken = require('./internal/signToken')
const formatURL = require('./internal/formatURL')

const app = express()

// http://localhost:3001/login?redirect_url=http://localhost:3000/info

app
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/login', (req, res) => {

        const { redirect_url } = req.query
        if (!redirect_url) return res.send('invalid redirect url')


        const { idp_sso_token } = req.cookies
        if (idp_sso_token) return res.redirect(formatURL(idp_sso_token, redirect_url))


        res.send(`
            <html>
                <h1>idP Login</h1>
                <form method="post" action="/login">

                    Email
                    <input type="text" name="email">

                    Password
                    <input type="password" name="password">

                    <input type="hidden" name="redirect_url" value="${ redirect_url }">
                    <input type="submit" value="send">

                </form>
            </html>
        `)

    })
    .post('/login', (req, res) => {

        const { email, password, redirect_url } = req.body
        const user = getUser(email)

        if (!user || !verification(user, password)) return res.send('invalid user or password')


        const token = signToken(user)
        res.cookie('idp_sso_token', token, { httpOnly: true })

        res.redirect(formatURL(token, redirect_url))

    })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`🚀  Started on port ${ PORT }`)
})