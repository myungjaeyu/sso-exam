const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .get('/info', (req, res) => {
 
        // http://localhost:3000/info

        const { sso_token } = req.cookies

        if (!sso_token) return res.redirect(`http://localhost:3001/login?redirect_url=http://localhost:3000${ req.url }`)

        res.send(`info user ${ sso_token }`)

    })
    .get('/auth/sso', (req, res) => {

        // http://localhost:3000/auth/sso?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiQGV4YW1wbGUuY29tIiwiZmlyc3RfbmFtZSI6IktpbSIsImxhc3RfbmFtZSI6Ik15dW5namFlIiwibmlja25hbWUiOiJBIiwiY2FzaCI6MTUwMDAsImlhdCI6MTU0ODE5MjM3NH0.xLZLi9s9fJwY-npsy8OOwU6zcJCcrLvEm8M2sS1-Iko&redirect_url=http%3A%2F%2Flocalhost%3A3000%2Finfo

        const { token, redirect_url } = req.query

        res.json({ token, redirect_url })

    })

const PORT = process.env.SP_PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀  Started on port ${ PORT }`)
})