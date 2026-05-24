const express = require('express');
const validator = require('validator');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

app.use(csrf());

app.get('/form', (req, res) => {

    res.send(`
        <h2>Secure Form</h2>

        <form action="/process" method="POST">

            <input type="hidden"
                   name="_csrf"
                   value="${req.csrfToken()}">

            <input type="text"
                   name="username"
                   placeholder="Enter Username">

            <button type="submit">
                Submit
            </button>

        </form>
    `);
});

app.post('/process', (req, res) => {

    const username = req.body.username;

    if (!validator.isAlphanumeric(username)) {
        return res.send('Invalid Username');
    }

    res.send('SQLi and CSRF Protection Working');
});

app.listen(3000, () => {
    console.log('Secure Server Running on Port 3000');
});