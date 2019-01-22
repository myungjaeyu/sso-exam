const express = require('express')
const bodyParser = require('body-parser')

const getUser = require('./internal/getUser')
const verification = require('./internal/verification')
const signToken = require('./internal/signToken')
const url = require('url')

const app = express()

// http://localhost:3001/login?redirect_url=http://localhost:3000/info

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/login', (req, res) => {

        const { redirect_url } = req.query

        if (!redirect_url) return res.send('invalid redirect url')

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

        res.redirect(url.format({
            pathname: 'http://localhost:3000/auth/sso',
            query: { token: signToken(user), redirect_url }
        }))

    })


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`🚀  Started on port ${ PORT }`)
})