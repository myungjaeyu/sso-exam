const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const verificationToken = require('./internal/verificationToken')

const PORT = process.env.SP_PORT || 3001

app
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/info', (req, res) => {
 
        // http://localhost:3001/info

        const { sdp2_sso_token } = req.cookies

        if (!sdp2_sso_token) return res.redirect(`http://localhost:11666/login?redirect_url=http://localhost:${ PORT }${ req.url }`)

        const { id, email, first_name, last_name } = verificationToken(sdp2_sso_token)

        res.send(`
        <html>
            <h1>SP2 User Info ${ first_name } ${ last_name }</h1>
        </html>
        `)

    })
    .get('/auth/sso', (req, res) => {

        // http://localhost:3001/auth/sso?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6Ik15dW5namFlIiwibGFzdF9uYW1lIjoiS2ltIiwiaWF0IjoxNTQ4MjEwNjI5fQ.c36dBUwF7VQwWZ8QToom12zNlwXyv8EhwJmnZHUox4s&redirect_url=http%3A%2F%2Flocalhost%3A3000%2Finfo

        const { token, redirect_url } = req.query

        verificationToken(token) && res
                                    .cookie('sdp2_sso_token', token, { httpOnly: true })
                                    .redirect(redirect_url)

    })

app.listen(PORT, () => {
    console.log(`🚀  Started on port ${ PORT }`)
})