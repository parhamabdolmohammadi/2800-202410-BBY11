
require("./utils.js");

const url = require('url');

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const CryptoJS = require('crypto-js')
const secretKey = "mySecretKey";
const iv = CryptoJS.lib.WordArray.random(16);
const salt = CryptoJS.enc.Hex.parse('')
const ObjectId = require('mongodb').ObjectId;
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

const app = express();

const Joi = require("joi");

const navLinks = [
    {name: "Home", link: "/"},
    {name: "Main", link: "/main"},
    {name: "Login", link: "/login"},
    {name: "Admin", link: "/admin"},
    {name: "404", link: "/*"},
    {name: "Setting", link: "/setting"}
]

app.use("/", (req, res, next) => {
    app.locals.navLinks = navLinks;
    app.locals.currentURL = url.parse(req.url).pathname;
    next();
})


const expireTime = 24 * 60 * 60 * 1000; //expires after 1 day  (hours * minutes * seconds * millis)

/* secret information section */
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;

const node_session_secret = process.env.NODE_SESSION_SECRET;
/* END secret section */

var {database} = include('databaseConnection');

const userCollection = database.db(mongodb_database).collection('users');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

var mongoStore = MongoStore.create({
    mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
    crypto: {
        secret: mongodb_session_secret
    }
})

// WILL NEED TO REMOVE THESE TWO IF WE PUT CSS AND IMAGES FOLDER INTO PUBLIC FOLDER, see footer.ejs line 30 for how to link-------------------------------------------------
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/js"));

// Map the file system paths to the app's virtual paths
// Parameters: The root parameter describes the root directory from which to serve static assets.

app.use("/js", express.static("./public/js")); // Need this middleware since js files are not accessible unless they are in a folder called "public"

// WILL NEED TO UNCOMMENT THESE TWO IF WE PUT CSS AND IMAGES FOLDER INTO PUBLIC FOLDER, see footer.ejs line 30 for how to link-------------------------------------------------
// app.use("/css", express.static("./public/css"));
// app.use("/img", express.static("./public/images"));

app.use(session({
    secret: node_session_secret,
    store: mongoStore,
    saveUninitialized: false,
    resave: true
}
));

function isValidSession(req) {
    if (req.session.authenticated) {
        return true;
    } else {
        return false;
    }
}

function sessionValidation(req, res, next) {
    if (isValidSession(req)) {
        next();
    }
    else {
        res.redirect('/login');
    }
}

function isAdmin(req) {
    if (req.session.user_type == 'admin') {
        return true;
    }
    return false;
}

function adminAuthorization(req, res, next) {
    if (!isAdmin(req)) {
        res.status(403);
        res.render("errorMessage", { error: "Not Authorized" });
        return;
    }
    else {
        next();
    }
}

app.get('/', (req, res) => {
    if (!req.session.authenticated) {
        res.render('index', {username: req.session.username});
    } else {
        console.log(req.session.user_type);
        res.render("main", {username: req.session.username});
    }

});

app.get('/signup', (req, res) => {
    res.render("signup")
});

app.get('/setting', (req,res) => {
    res.render("setting")
});

app.get('/edit-profile', (req,res) => {
    res.render("edit-profile")
});

app.get('/edit-password', (req,res) => {
    res.render("edit-password")
});

app.get('/setting', (req,res) => {
    res.render("setting")
});

app.get('/edit-profile', (req,res) => {
    res.render("edit-profile")
});

app.get('/edit-password', (req,res) => {
    res.render("edit-password")
});

app.post('/submitUser', async (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (!username) {
        res.redirect("/signupSubmit?problem=Username");
        return;
    }
    if (!email) {
        res.redirect("/signupSubmit?problem=Email");
        return;
    }
    if (!password) {
        res.redirect("/signupSubmit?problem=Password");
        return;
    }

    const schema = Joi.object(
        {
            username: Joi.string().alphanum().max(20).required(),
            password: Joi.string().max(20).required(),
            email: Joi.string().max(40).required()
        });

    const validationResult = schema.validate({ username, password, email });
    if (validationResult.error != null) {
        console.log(validationResult.error);
        res.redirect("/signup");
        return;
    }


    var hashedPassword = await bcrypt.hash(password, saltRounds);
	var encryptedEmail = CryptoJS.AES.encrypt(email, secretKey, { iv: iv, salt: salt }).toString();
	await userCollection.insertOne({username: username, password: hashedPassword, email: encryptedEmail, user_type: "user"});
	console.log("Inserted user");
   

    var html = "successfully created user";
    console.log(html);

    req.session.authenticated = true;
    req.session.username = username;
    req.session.cookie.maxAge = expireTime;
    req.session.user_type = "user";


    res.redirect("/main");
});

app.get("/signupSubmit", (req, res) => {
    res.render("signupSubmit", {problem : req.query.problem});
});

app.get('/login', (req,res) => {
    res.render("login");
});

app.post('/loggingin', async (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

    var validationError = false;
    var userDoesNotExist = false;
    var incorrectFields = false;

    // Validate the input (email and password) 
    // using joi to prevent noSQL injection attacks
    const schema = Joi.object(
        {
            email: Joi.string().max(20).required(),
            password: Joi.string().max(20).required()
    });
    
    // Validate the email entered by the user
    const validationResult = schema.validate({email, password});
    // If the email and password are not valid,
    // redirect back to signup page
    if (validationResult.error != null) {
        console.log(validationResult.error);
        validationError = true;
        res.render("loginSubmit", {validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields});
        return;
    }

    var encryptedEmail = CryptoJS.AES.encrypt(email, secretKey, { iv: iv, salt: salt }).toString();
    // Check if a user account with the entered email and password exists in the MongoDB database
    const result = await userCollection.find({email: encryptedEmail}).project({username: 1, email: 1, password: 1, user_type: 1, _id: 1}).toArray();
    
    // If a user with the entered email and password combination was NOT found (result array length = 1)
    if (result.length != 1) {
        userDoesNotExist = true;
        res.render("loginSubmit", {validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields});
        return;
    }

    // If the entered password matches the BCrypted password,
    // then store the user's name in a session and log the 
    // user in by redirecting to 'members' page
    if (await bcrypt.compare(password, result[0].password)) {
		req.session.authenticated = true;
        // Store the user's name and user_type values
		req.session.username = result[0].username;
        req.session.user_type = result[0].user_type;
		req.session.cookie.maxAge = expireTime;

        res.redirect('/main');
        return;
    } else {
        incorrectFields = true;
        res.render("loginSubmit", {validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields});
		return;
	}
});

app.get("/loginSubmit", (req, res) => {
    //var loginErrorResults = {validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields}
    res.render("loginSubmit");
});



app.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/');
});



app.get('/main', (req,res) => {
    if (!req.session.authenticated) {
        res.redirect('/');
        return;
    }
        res.render("main");
});

app.get('/checkout', sessionValidation, (req, res) => {
    res.render("checkout", { query: req.query });
});

app.post('/submit-payment', sessionValidation, async (req, res) => {
    try {
        let paymentType = req.body.paymentType;
        if (paymentType === "credit") {
            let cardnumber = req.body.cardnumber;
            let expirydate = req.body.expirydate;
            let cvv = req.body.cvv;

            const encryptedCardNumber = encryptjs.encrypt(cardnumber, encryptionKey, 256)
            const encryptedExpirydate = encryptjs.encrypt(expirydate, encryptionKey, 256)
            const encryptedCvv = encryptjs.encrypt(cvv, encryptionKey, 256)

        } else if(paymentType ==="paypal"){
            let paypalEmail = req.body.paypalEmail;
            const encryptedPaypalEmail = encryptjs.encrypt(paypalEmail, encryptionKey, 256)            
        }
    } catch (e) {
        console.log(e);
    }
});

app.get('/forgot-password', async (req, res) => {
    res.render("forgot-password");
});

app.post('/sendEmail', async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'roborental.bcit@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });
        if (!req.body.email) {
            res.render("forgot-password");
            return;
        }
        let email = req.body.email;
        let resetCode = Math.floor(Math.random() * 1000000);
        const mailOptions = {
            from: 'roborental.bcit@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: 'This is your one time login code to reset your password: ' + resetCode,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        res.render("enterCode", {resetCode: resetCode, userEmail: email});
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

app.post('/loginfromcode', async (req, res) => {
    try {
        let code1= req.body.resetCode;
        let code2 = req.body.inputCode;
        let email = req.body.email;
        if (code1 !== code2) {
            res.send("Invalid code. Please try again.");
        } else {
            res.render("reset-password", {email: email});
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

app.post('/resetPassword', async (req, res) => {
    try {
        let password1 = req.body.password1;
        let password2 = req.body.password2;
        let email = req.body.email;

        console.log(password1, password2);
        if(password1 === password2) {
            let hashedPassword = await bcrypt.hash(password1, saltRounds);
            console.log("Email: "+email);
            console.log("Password: "+hashedPassword);

            await userCollection.updateOne({email: email}, {$set: {password: hashedPassword}});
            res.redirect("/login");
        } else {
            res.send("Passwords do not match. Please try again.");
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

app.get("*", (req, res) => {
    res.status(404);
    res.render("404",);
})

app.listen(port, () => {
    console.log("Node application listening on port " + port);
}); 