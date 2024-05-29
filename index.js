
require("./utils.js");

const url = require('url');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// const MongoClient = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const CryptoJS = require('crypto-js')
// const secretKey = "mySecretKey";
// const iv = CryptoJS.lib.WordArray.random(16);
// const salt = CryptoJS.enc.Hex.parse('')
var key = CryptoJS.enc.Utf8.parse('b75524255a7f54d2726a951bb39204df');
var iv  = CryptoJS.enc.Utf8.parse('1583288699248111');
// const ObjectId = require('mongodb').ObjectId;
var iv = CryptoJS.enc.Utf8.parse('1583288699248111');
// const ObjectId = require('mongodb').ObjectId;
const nodemailer = require('nodemailer');
//Edit-profile
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');
const uri = 'mongodb+srv://Seohyeon:Qkrtjgus8663!@atlascluster.u56alig.mongodb.net/AtlasCluster?retryWrites=true&w=majority';



const passport = require('passport');
require('./auth');

// MongoDB database connection
var { database } = include('databaseConnection');

// // Groqcloud API connection and AI functionality
// var { makeAiReqAndRes, getGroqChatCompletion } = include('groqAIAPI');

const port = process.env.PORT || 3000;

const app = express();

const Joi = require("joi");
const { resourceLimits } = require("worker_threads");

const navLinks = [
    { name: "Home", link: "/" },
    { name: "Main", link: "/main" },
    { name: "Login", link: "/login" },
    { name: "Admin", link: "/admin" },

    { name: "Bookmarks", link: "saved" },
    { name: "Setting", link: "/setting" },
    {name: 'History', link: '/history'}
]

// To determine if the user is at the index page
// Header.ejs uses to determine if it should load the navbar side panel or not
var atIndexPage = false;
let username1 = 'to RoboRental';
app.use("/", (req, res, next) => {
    app.locals.navLinks = navLinks;
    app.locals.username = username1;
    app.locals.currentURL = url.parse(req.url).pathname;
    app.locals.atIndexPage = false;
    next();
})


const expireTime = 24 * 60 * 60 * 1000; //expires after 1 day  (hours * minutes * seconds * millis)

/* secret information section */
const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_database = process.env.MONGODB_DATABASE;
const mongodb_session_secret = process.env.MONGODB_SESSION_SECRET;
const mongodb_database2 = process.env.MONGODB_DATABASE2;

const node_session_secret = process.env.NODE_SESSION_SECRET;
/* END secret section */
const ordersCollection = database.db(mongodb_database).collection('orders');

const userCollection = database.db(mongodb_database).collection('users');
const stationsCollection = database.db(mongodb_database2).collection('Stations');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

//Edit profile
app.use(bodyParser.urlencoded({ extended: true })); 

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
app.use(express.static(__dirname + "/audio"));

// Map the file system paths to the app's virtual paths
// Parameters: The root parameter describes the root directory from which to serve static assets.

app.use(express.static(__dirname + "/scripts"));



app.use("/js", express.static("./public/js")); // Need this middleware since js files are not accessible unless they are in a folder called "public"
app.use("/img", express.static("./public/img"));

// WILL NEED TO UNCOMMENT THESE TWO IF WE PUT CSS AND IMAGES FOLDER INTO PUBLIC FOLDER, see footer.ejs line 30 for how to link-------------------------------------------------
// app.use("/css", express.static("./public/css"));
// app.use("/img", express.static("./public/images"));
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }


app.use(session({
    secret: node_session_secret,
    store: mongoStore,
    saveUninitialized: false,
    resave: true
}
));
app.use(passport.initialize());
app.use(passport.session());

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
app.get('/auth/google', (req, res, next) => {
    const signup = req.query.signup === 'true';
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      state: signup ? 'signup' : 'login'
    })(req, res, next);
  });
  
  // Google callback route
  app.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
      if (err) { return next(err); }
      if (!user) { return res.redirect('/auth/google/failure'); }
  
      req.logIn(user, (err) => {
        if (err) { return next(err); }
        const redirectUrl = req.query.state === 'signup' ? '/signup' : '/login';
        return res.redirect(redirectUrl);
      });
    })(req, res, next);
  });


app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

app.get('/', (req, res) => {
    if (!req.session.authenticated) {
        // Set global variable atIndexPage to true
        atIndexPage = true;

        res.render('index', { atIndexPage: atIndexPage });

        // Reset atIndexPage to false
        atIndexPage = false;

    } else {
        // console.log(req.session.user_type);
        res.redirect("/main");
    }

});

app.get('/signup', (req, res) => {
    let username = ""
    let userEmail = ''

    if (req.user && req.user.displayName) {
       
        userEmail = req.user.emails[0].value;
        username = req.user.displayName;
        console.log(userEmail);
        console.log(username);
    } 

    res.render("signup", {username, userEmail})
});


app.get('/setting', (req, res) => {
    res.render("setting")
});

app.get('/edit-profile', async (req, res) => {
    let id = await req.session._id;
    let email = await req.session.email;
    console.log(email);
    let unencryptedEmail = CryptoJS.AES.decrypt(email, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    res.render("edit-profile", { name: req.session.username, email: unencryptedEmail, userId: id });
});

app.get('/edit-password', (req, res) => {
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
            username: Joi.string()
            .pattern(/^[a-zA-Z0-9 ]*$/)
            .max(20)
            .required(),
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
    var encryptedEmail = CryptoJS.AES.encrypt(email, key, { iv: iv }).toString();
    var _id = new ObjectId();
    await userCollection.insertOne({ _id: _id, username: username, password: hashedPassword, email: encryptedEmail, user_type: "user" });
    console.log("Inserted user");
    // console.log(CryptoJS.AES.decrypt(encryptedEmail, key, { iv: iv}).toString(CryptoJS.enc.Utf8));


    var html = "successfully created user";
    console.log(html);

    req.session._id = _id;
    req.session.email = encryptedEmail;
    req.session.authenticated = true;
    req.session.username = username;
    req.session.cookie.maxAge = expireTime;
    req.session.user_type = "user";
    username1 = username;


    res.redirect("/main");
});

app.get("/signupSubmit", (req, res) => {
    res.render("signupSubmit", { problem: req.query.problem });
});

app.get('/login', (req, res) => {
    let username = ""
    let userEmail = ''

    if (req.user && req.user.displayName) {
       
        userEmail = req.user.emails[0].value;
        username = req.user.displayName;
        console.log(userEmail);
    } 

    
    res.render("login",{username: username, userEmail});
});


app.post('/loggingin', async (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    var validationError = false;
    var userDoesNotExist = false;
    var incorrectFields = false;

    // Validate the input (email and password) 
    // using joi to prevent noSQL injection attacks
    const schema = Joi.object(
        {
            email: Joi.string().max(40).required(),
            password: Joi.string().max(20).required()
        });

    // Validate the email entered by the user
    const validationResult = schema.validate({ email, password });
    // If the email and password are not valid,
    // redirect back to signup page
    if (validationResult.error != null) {
        console.log(validationResult.error);
        validationError = true;
        res.render("loginSubmit", { validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields });
        return;
    }

    var encryptedEmail = CryptoJS.AES.encrypt(email, key, { iv: iv }).toString()
    // console.log(encryptedEmail === 'WTfm6CGGEKx6XwoGKopaRg==');
    // Check if a user account with the entered email and password exists in the MongoDB database
    const result = await userCollection.find({ email: encryptedEmail }).project({ username: 1, email: 1, password: 1, user_type: 1, _id: 1 }).toArray();

    // If a user with the entered email and password combination was NOT found (result array length = 1)
    if (result.length != 1) {
        userDoesNotExist = true;
        res.render("loginSubmit", { validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields });
        return;
    }

    // If the entered password matches the BCrypted password,
    // then store the user's name in a session and log the 
    // user in by redirecting to 'members' page
    if (await bcrypt.compare(password, result[0].password)) {
        req.session.authenticated = true;
        // Store the user's name and user_type values
        req.session._id = result[0]._id;
        req.session.email = result[0].email;
        req.session.username = result[0].username;
        req.session.user_type = result[0].user_type;

        req.session.cookie.maxAge = expireTime;
        req.session.email = result[0].email;
        username1 = result[0].username;
        

        res.redirect('/main');
        return;
    } else {
        incorrectFields = true;
        res.render("loginSubmit", { validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields });
        return;
    }
});

app.get("/loginSubmit", (req, res) => {
    //var loginErrorResults = {validationError: validationError, userDoesNotExist: userDoesNotExist, incorrectFields: incorrectFields}
    res.render("loginSubmit");
});

app.post('/updateProfile', async (req, res) => {
    const { username, email } = req.body;
    var encryptedEmail = CryptoJS.AES.encrypt(email, key, { iv: iv }).toString();
    const userId = new ObjectId(req.session._id); // Replace with actual user ID (e.g., from session)
    const MONGODB_URI = 'mongodb+srv://Seohyeon:Qkrtjgus8663!@atlascluster.u56alig.mongodb.net/AtlasCluster?retryWrites=true&w=majority';
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('AtlasCluster'); // Use the database name directly
        const collection = database.collection('users'); // Use the collection name directly

        // Ensure email is not empty before updating
        if (!email || !username) {
            console.log('Invalid username or email.');
            return res.status(400).send('Invalid username or email.');
        }

        const result = await collection.updateOne(
            { _id: userId },
            { $set: { username: username, email: encryptedEmail } }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated user profile.');

            // Encrypt the email before storing it in the session
            const encryptedEmail = CryptoJS.AES.encrypt(email, key, { iv: iv }).toString();

            // Update session data with new username and email
            req.session.username = username;
            req.session.email = encryptedEmail;

            console.log("Session updated with email: " + req.session.email);

            res.redirect('/edit-profile'); // Redirect to settings or a confirmation page
        } else {
            console.log('User not found.');
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error('An error occurred while updating the user profile:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});

app.post('/updatePassword', async (req, res) => {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = new ObjectId(req.session._id); // Replace with actual user ID (e.g., from session)
    const MONGODB_URI = 'mongodb+srv://Seohyeon:Qkrtjgus8663!@atlascluster.u56alig.mongodb.net/AtlasCluster?retryWrites=true&w=majority';
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    if (newPassword !== confirmNewPassword) {
        return res.status(400).send('<div style="align-items: center;"><h1 style="text-align: center;">New password and confirm new password do not match.<br><a href="/edit-password">Try Again</a></h1><br></div>');
    }

    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const database = client.db('AtlasCluster'); // Use the database name directly
        const collection = database.collection('users'); // Use the collection name directly

        // Find the user by ID
        const user = await collection.findOne({ _id: userId });

        if (!user) {
            return res.status(404).send('User not found.');
        }

        // Check if the current password matches the one in the database
        const passwordMatch = await bcrypt.compare(currentPassword, user.password);

        if (!passwordMatch) {
            return res.status(400).send('<div style="align-items: center;"><h1 style="text-align: center;">Current password is incorrect.<br><a href="/edit-password">Try Again</a></h1><br></div>');
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the password in the database
        const result = await collection.updateOne(
            { _id: userId },
            { $set: { password: hashedNewPassword } }
        );

        if (result.matchedCount > 0) {
            console.log('Successfully updated user password.');
            res.redirect('/setting'); // Redirect to settings or a confirmation page
        } else {
            console.log('User not found.');
            res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error('An error occurred while updating the user password:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close();
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy();

    res.redirect('/');
});


app.get('/deleteAccount', (req, res) => {
    async function deleteUserAccount(userId) {
        const uri = 'mongodb+srv://Seohyeon:Qkrtjgus8663!@atlascluster.u56alig.mongodb.net/AtlasCluster?retryWrites=true&w=majority';
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

        try {
            await client.connect();
            const database = client.db('AtlasCluster');
            const collection = database.collection('users'); 

            const result = await collection.deleteOne({ _id: new ObjectId(userId) });

            if (result.deletedCount === 1) {
                console.log('Successfully deleted one document.');
            } else {
                console.log('No documents matched the query. Deleted 0 documents.');
            }
        } catch (err) {
            console.error('An error occurred while deleting the user account:', err);
        } finally {
            await client.close();
        }
    }
    
    let userId = new ObjectId(req.session._id);
    deleteUserAccount(userId);

    res.redirect('/logout')
});


app.get('/main', async (req, res) => {
    if (!req.session.authenticated) {
        res.redirect('/');
        return;
    }
    // console.log('finding...');
    const services = await general.find({}).project({ _id: 1, name: 1, description: 1, background: 1, price: 1 }).toArray();
    const stations = await stationsCollection.find({}).toArray();
    currentUserName = await userCollection.find({ username: req.session.username }).project({ username: 1, password: 1, _id: 1, user_type: 1, bookmarks: 1 }).toArray();
    // console.log('this is ' + services);
    // services.forEach(service => {
    //     console.log(service.name);
    // })
    var username = req.session.username;
    // console.log('username is ' +  username);
    res.render("main", { services, username, stations });



});

// app.post('/main/ai-assistance', async (req, res) => {
//     // Get message from user
//     const AIRequestMsg = req.body.aiAssistanceInput;

//     // Get list of services from the database, store the names in an array
//     var listOfServices = await general.find({}).project({_id: 1, name: 1, description: 1, background: 1, price: 1 }).toArray();

//     var filteredServices = [];

//     var aiResponseHTML;

//     var aiFoundServices = false;

//     console.log("AIRequestMsg: " + AIRequestMsg);

//     // Make AI request, passing in the user text message and the list of services. Save the AI response text
//     var AIResponse = await makeAiReqAndRes(AIRequestMsg, listOfServices);

//     console.log("AIResponse: " + AIResponse);

//     //--------------------

//     // If any applicable services were found in the list of services ('I'm sorry' is NOT contained in the response String)
//     if (!(AIResponse.includes("I'm sorry"))) {
    
//     aiFoundServices = true;

//     var listOfAIRecommendedServices = [];

//     // Parse the AI-generated response - divide listOfAIRecommendedServices 
//     // into an array of Strings, using '/' as delimeter
//     listOfAIRecommendedServices = AIResponse.split('/');

//     // Remove first and last empty string elements (first and last = '')
//     listOfAIRecommendedServices.shift();
//     listOfAIRecommendedServices.pop();

//     // Filter the listOfServices array (only include the ones that have name values in the listOfAIRecommendedServices array)
//     filteredServices = listOfServices.filter(service => listOfAIRecommendedServices.includes(service.name));

//     aiResponseHTML = "Here are some of our services that I can recommend based on your request:";

//     } else {
//         // only send the generated apology message
//         // Remove '/' characters if they were included in the not found response
//         if (AIResponse.includes('/')) {
//             AIResponse = AIResponse.replace(/\//g, '');
//         }
//         aiFoundServices = false;
//         aiResponseHTML = AIResponse;
//     }

//     // Send the filteredServices (array of json objects) back to the main page as a json object
//     res.json({aiResponseHTML, filteredServices, aiFoundServices});
// });

app.get('/checkout', sessionValidation, async (req, res) => {
    let stationId = req.query.stationId;
    let userId = new ObjectId(req.session._id);
    let result = await userCollection.findOne({ _id: userId }, { projection: { remember: 1 } });
    let remember = ""
    try {
        remember = result.remember;
    } catch (error) {
        console.error("Cannot find remember", error.message);
    }
    if (remember) {
        let paypalEmail = "";
        let cardnumber = "";
        let expirydate = "";
        let cvv = "";
        const user = await userCollection.findOne({ _id: userId }, { projection: { cardnumber: 1, expirydate: 1, cvv: 1, paypalEmail: 1 } });
        try {
            paypalEmail = CryptoJS.AES.decrypt(user.paypalEmail, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Cannot find paypalEmail", error.message);
        }

        try {
            cardnumber = CryptoJS.AES.decrypt(user.cardnumber, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Cannot find cardnumber", error.message);
        }

        try {
            expirydate = CryptoJS.AES.decrypt(user.expirydate, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Cannot find expirydate", error.message);
        }

        try {
            cvv = CryptoJS.AES.decrypt(user.cvv, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
        } catch (error) {
            console.error("Cannot find cvv", error.message);
        }
        res.render("checkout", { query: req.query, remember: true, paypalEmail: paypalEmail, cardnumber: cardnumber, expirydate: expirydate, cvv: cvv });
    } else {
        res.render("checkout", { query: req.query, remember: false });
    }
});

app.post('/submit-payment', sessionValidation, async (req, res) => {
    let stationId = req.body.stationID;
    let paymentType = req.body.paymentType;


    try {
        let userId = new ObjectId(req.session._id);
        let remember = req.body.remember;
        if (remember === "on") {
            await userCollection.findOneAndUpdate({ _id: userId }, { $set: { remember: true } });
        } else {
            await userCollection.findOneAndUpdate({ _id: userId }, { $set: { remember: false } });
        }
        if (paymentType === "credit") {
            let cardnumber = req.body.cardnumber;
            let expirydate = req.body.expirydate;
            let cvv = req.body.cvv;

            if(!cardnumber || !expirydate || !cvv){
                res.redirect('/checkout?type=credit&stationId=' + stationId + '&error=emptycc');
                return;
            }

            const encryptedCardNumber = CryptoJS.AES.encrypt(cardnumber, key, { iv: iv }).toString();
            const encryptedExpirydate = CryptoJS.AES.encrypt(expirydate, key, { iv: iv }).toString();
            const encryptedCvv = CryptoJS.AES.encrypt(cvv, key, { iv: iv }).toString();
            await userCollection.findOneAndUpdate({ _id: userId },
                { $set: { cardnumber: encryptedCardNumber, expirydate: encryptedExpirydate, cvv: encryptedCvv } });
                removeRobotFromDatabase()

        } else if (paymentType === "paypal") {
            let paypalEmail = req.body.paypalEmail;
            if(!paypalEmail){
                res.redirect('/checkout?type=paypal&stationId=' + stationId + '&error=emptypp');
                return;
            }
            const encryptedPaypalEmail = CryptoJS.AES.encrypt(paypalEmail, key, { iv: iv }).toString();
            await userCollection.findOneAndUpdate({ _id: userId }, { $set: { paypalEmail: encryptedPaypalEmail } });
            removeRobotFromDatabase()
        }
    } catch (e) {
        console.log(e);
    }

    res.redirect('/confirmation?paymentType=' + paymentType);
});

async function removeRobotFromDatabase(){
    try {
        const station = await stationsCollection.findOne({ _id: new ObjectId(stationId) });
        current = station.robots_in_stock;
        await stationsCollection.updateOne({ _id: new ObjectId(stationId) }, { $set: { robots_in_stock: current - 1 } });

        setTimeout(() => {
            current = station.robots_in_stock;
            current++;
            stationsCollection.updateOne({ _id: new ObjectId(stationId) }, { $set: { robots_in_stock: current } });
        }, 1000 * 60 * 60);
    } catch (e) {
        console.log(e);
    }
}


app.get('/confirmation', sessionValidation, (req, res) => {
    function generateuuid() {
        const uuid = uuidv4().replace(/-/g, '');
        return uuid.slice(0, 24);
    }
    let total = req.query.total;
    let paymentType = req.query.paymentType;
    let service = req.query.service;
    let orderNumber = generateuuid();
    let timestamp = new Date().toISOString();

    res.render("confirmation", { orderNumber: orderNumber });
    if (total != null) {
        let id = new ObjectId(orderNumber);
        ordersCollection.insertOne({
            _id: id,
            timestamp: timestamp,
            paymentType: paymentType,
            customerId: req.session._id,
            total: total,
            service: service
        });
    }
});

const general = database.db('Services').collection('General')
const fs = require('fs');
const { time } = require("console");
let isNewDataInserted = false; // This should be false when all data in service.json is stored in mongo db
if (isNewDataInserted) {
    const jsonData = fs.readFileSync('service.json', 'utf8');
    const dataArray = JSON.parse(jsonData);
    // console.log('this is data array');
    // console.log(dataArray);
    dataArray.forEach(async (data) => {
        // console.log('this is data' + data.name);
        const existingData = await general.findOne({ name: data.name });
        if (!existingData) {
            data.background = `${data.name.trim().replace(/\s+/g, '')}.png`;
            await general.insertOne(data);
            // console.log('Inserted new data:', data);
        } else {
            if (existingData.description !== data.description) {
                await general.updateOne({ name: data.name }, { $set: { description: data.description } })
            }
        }
    });
}
// to delete all data in general database
// general.deleteMany({})


// background
// "/plumbing.png"

app.post('/search', async (req, res) => {
    const query = req.body.query;
    // console.log('this is my query ' + query);
    const regex = new RegExp(query, 'i'); // 'i' flag for case-insensitive matching

    const result = await general.find({ name: { $regex: regex } }).project({ _id: 1, name: 1, description: 1, background: 1, price: 1 }).toArray();

    // Iterate through the result array and display the name of each object
    result.forEach(item => {
        // console.log("found it: " + item.name);
    });

    res.json({ result });
})

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
        res.render("enterCode", { resetCode: resetCode, userEmail: email });
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

app.post('/loginfromcode', async (req, res) => {
    try {
        let code1 = req.body.resetCode;
        let code2 = req.body.inputCode;
        let email = req.body.email;
        if (code1 !== code2) {
            res.send("Invalid code. Please try again.");
        } else {
            res.render("reset-password", { email: email });
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
        if (password1 === password2) {
            let hashedPassword = await bcrypt.hash(password1, saltRounds);
            console.log("Email: " + email);
            console.log("Password: " + hashedPassword);

            await userCollection.updateOne({ email: email }, { $set: { password: hashedPassword } });
            res.redirect("/login");
        } else {
            res.send("Passwords do not match. Please try again.");
        }
    } catch (error) {
        console.error('Error occurred:', error);
    }
});



app.get('/stations', async (req, res) => {
    try {
        const stations = await stationsCollection.find({}).toArray();
        const users = await userCollection.find({}).toArray();
        currentUserName = await userCollection.find({ username: req.session.username }).project({ username: 1, password: 1, _id: 1, user_type: 1, bookmarks: 1 }).toArray();

        res.render("stations", { stations: stations, users: users, currentUserName: currentUserName });
    } catch (error) {
        console.error("Error fetching stations:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.post('/editBookmark', async (req, res) => {
    const cardId = req.body.data;
    const currentUserName = await userCollection.findOne({ username: req.session.username });

    if (currentUserName) {
        if (currentUserName.bookmarks && currentUserName.bookmarks.includes(cardId)) {
            const updatedBookmarks = currentUserName.bookmarks.filter(bookmark => bookmark !== cardId);
            await userCollection.updateOne({ username: req.session.username }, { $set: { bookmarks: updatedBookmarks } });
        } else {
            const updatedBookmarks = currentUserName.bookmarks ? [...currentUserName.bookmarks, cardId] : [cardId];
            await userCollection.updateOne({ username: req.session.username }, { $set: { bookmarks: updatedBookmarks } });
        }
    } else {
        console.log("User not found");
    }

    res.redirect('/stations');
});


app.get('/saved', async (req, res) => {
    try {
        const stations = await stationsCollection.find({}).toArray();
        const users = await userCollection.find({}).toArray();
        currentUserName = await userCollection.find({ username: req.session.username }).project({ username: 1, password: 1, _id: 1, user_type: 1, bookmarks: 1 }).toArray();

        // console.log("haha" + currentUserName);
        res.render("saved", { stations: stations, users: users, currentUserName: currentUserName });
    } catch (error) {
        console.error("Error fetching stations:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/displayStation', async (req, res) => {
    const cardId = req.body.data;
    const distance = req.body.data2;


    const objectId = new ObjectId(cardId);
  
    const currentStation = await stationsCollection.findOne({_id: objectId});
    res.render('station', {station1: currentStation , distance: distance, cardId });
});

app.get('/businessCheckout', async (req, res) => {

    const currentUser = await userCollection.findOne(
        { username: req.session.username },
        {
          projection: {
            username: 1,
            user_type: 1, 
            businessOwnerRequestInProgress: 1,
          },
        }
      );
      console.log(currentUser.user_type == "user");
    const cardId = req.body.data;
    const distance = req.body.data2;
 
    
    const objectId = new ObjectId(cardId);
    const services = await general.find({}).project({_id: 1, name: 1, description: 1, background: 1, price: 1 }).toArray();

    const currentStation = await stationsCollection.findOne({_id: objectId});
      
    res.render('businessCheckout', {station1: currentStation , distance: distance , services, cardId, user_type: currentUser.user_type});
});

app.post('/addRobot', async (req, res) => {
    const stationId = req.body.station;
    const station = await stationsCollection.findOne({_id: new ObjectId(stationId)});
    const current = station.robots_total_stock;
    const added = req.body.number;
    const newStock = current + parseInt(added);
    await stationsCollection.updateOne({_id: new ObjectId(stationId)}, {$set: {robots_total_stock: newStock}});
    res.redirect('/businessConfirmation');
});

app.get('/businessConfirmation', sessionValidation, (req, res) => {
    function generateuuid() {
        const uuid = uuidv4().replace(/-/g, '');
        return uuid.slice(0, 24);
    }
    let orderNumber = generateuuid();
    let timestamp = new Date().toISOString();

    res.render("businessConfirmation", { orderNumber: orderNumber });
        let id = new ObjectId(orderNumber);
        ordersCollection.insertOne({
            _id: id,
            business: true,
            timestamp: timestamp,
            customerId: req.session._id
        });
    
});

app.get('/station', async (req, res) => {


    res.render("station");
});



app.get('/bussinessOwnerForm', async (req, res) => {
    const currentUser = await userCollection.findOne(
        { username: req.session.username },
        {
            projection: {
                username: 1,
                user_type: 1,
                businessOwnerRequestInProgress: 1,
            },
        }
    );
    console.log(currentUser.user_type == "user");
    if (!currentUser.businessOwnerRequestInProgress) {
        res.render("bussinessOwnerForm", { email: req.session.email, request: false, user_type: currentUser.user_type });
    } else {
        res.render("bussinessOwnerForm", { email: req.session.email, request: true, user_type: currentUser.user_type });
    }

})




app.post('/bussinessOwnerSubmission', async (req, res) => {
    let name = req.body.first_name;
    let lastname = req.body.last_name;
    let email = req.body.email;
    let address = req.body.Address;
    let phonenumber = req.body.Phone;
    let businessName = req.body.Business_Name;
    let businessAddress = req.body.Business_Address;
    let description = req.body.textArea;
    let dateOfBirth = req.body.date; // assuming 'date' is the field name for birth date
    let gender = req.body.Gender; // assuming 'Gender' is the field name for gender

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'roborental.bcit@gmail.com', // Your email address
            pass: process.env.EMAIL_PASSWORD // Your app-specific password
        }
    });

    // Example usage
    const htmlContent = `
    <h1>Hello ${name} ${lastname},</h1>
    <p>Thank you for your request we will process your request and reach out to you soon.</p>
    <p><strong>Best regards,</strong></p>
    <p>Robo Rental App</p>
  `;

    console.log(htmlContent);

    // Function to send an email
    async function sendEmail(email, htmlContent) {
        try {
            let info = await transporter.sendMail({
                from: 'roborental.bcit@gmail.com', // Sender address
                to: email, // List of receivers
                subject: "Request In Progress", // Subject line
                html: htmlContent // HTML body content
            });

            console.log('Message sent: %s', info.messageId);
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    await sendEmail(email, htmlContent);

    await userCollection.updateOne({ username: req.session.username }, { $set: { businessOwnerRequestInProgress: true, name, lastname, phonenumber, address, businessName, businessAddress, description, dateOfBirth, gender } });
    res.render('bussinessOwnerSignupConfirmation', {});
});



app.get('/bussinessOwnerSignupConfirmation', async (req, res) => {

    console.log(req.session.email);
    res.render("bussinessOwnerSignupConfirmation", { email: req.session.email });
})

app.get('/admin', sessionValidation, adminAuthorization, async (req, res) => {
    const result = await userCollection.find().project({ username: 1, _id: 1, phonenumber: 1, businessOwnerRequestInProgress: 1, address: 1, businessAddress: 1, businessName: 1, dateOfBirth: 1, gender: 1, name: 1, lastname: 1, email: 1, description: 1 }).toArray();

    res.render("admin", { users: result });
});

app.post('/PromoteToBusinessOwner', async (req, res) => {
    let user_id = req.body.data;
    console.log(user_id);
    const objectId = new ObjectId(user_id);
    await userCollection.updateOne({ _id: objectId }, { $set: { businessOwnerRequestInProgress: false, user_type: "businessOwner" } });
    const result = await userCollection.find().project({ username: 1, _id: 1, phonenumber: 1, businessOwnerRequestInProgress: 1, address: 1, businessAddress: 1, businessName: 1, dateOfBirth: 1, gender: 1, name: 1, lastname: 1, email: 1, description: 1 }).toArray();
    res.redirect("/admin");
});

app.post('/DemoteToUser', async (req, res) => {
    let user_id = req.body.data;
    console.log(user_id);
    const objectId = new ObjectId(user_id);
    await userCollection.updateOne({ _id: objectId }, { $set: { businessOwnerRequestInProgress: false } });
    const result = await userCollection.find().project({ username: 1, _id: 1, phonenumber: 1, businessOwnerRequestInProgress: 1, address: 1, businessAddress: 1, businessName: 1, dateOfBirth: 1, gender: 1, name: 1, lastname: 1, email: 1, description: 1 }).toArray();
    res.redirect("/admin");
});

app.post('/submitEmailBL', async (req, res) => {
    var email = req.body.email;
    await emailsCollection.insertOne({ email: email });
    try {
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'roborental.team@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });
        if (!email) {
            res.render("index");
            return;
        }
        let mailOptions = {
            from: 'roborental.team@gmail.com',
            to: email,
            subject: 'Robo Rental Launch',
            text: `Exciting news! Robo Rental, the app that makes it easy to rent robots for various services, is launching soon.
            By signing up you will be notified on the day of our apps launch.
            Robo Rental offers a seamless solution for renting robots to assist with a variety of tasks. Stay tuned for more details!

            Thank you for your interest.

            Best regards,

            The Robo Rental Team`,
        };
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        res.redirect('/index2');
    } catch (error) {
        console.error('Error occurred:', error);
    }
});


async function sendAllEmails() {
    try {
        // Fetch email addresses from the collection
        let emails = await emailsCollection.find({}, { projection: { email: 1 } }).toArray();
        console.log("Emails array:", emails);

        // Create a transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'roborental.team@gmail.com',
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Iterate over each email and send the notification
        for (let { email } of emails) {
            console.log("Sending email to:", email);

            // Email options
            let mailOptions = {
                from: 'roborental.team@gmail.com',
                to: email,
                subject: 'Robo Rental Launched',
                text: `We are thrilled to announce that Robo Rental, the app that makes it easy to rent robots for various services, has officially launched!

With Robo Rental, you can seamlessly rent robots to assist with a variety of tasks, providing you with innovative solutions for your needs. Our app is designed to offer you convenience and efficiency at your fingertips.

Thank you for your interest and support. We invite you to explore the app and discover the future of robotic services.

Stay tuned for more updates and features coming soon!

Best regards,

The Robo Rental Team`
            };

            // Send email
            try {
                let info = await transporter.sendMail(mailOptions);
                console.log('Email sent:', info.messageId);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
    } catch (error) {
        console.error('Error fetching emails:', error);
    }
}

const sendEmails = process.env.SEND_EMAILS_PAGE_NAME;
app.get("/" + sendEmails, (req, res) => {
    sendAllEmails();
    res.redirect('/');
});


const orders = database.db('AtlasCluster').collection('orders');
app.get('/history', async(req, res) => {
    if (!req.session.authenticated) {
        res.redirect('/');
        return;
    }
    //timestamp:1, paymentType:1, customerId:1, total:1, service:1
    // change it to customerId: req.session._id 
    const history = await orders.find({customerId: '664fb094254567cab99f3cfa', business: { $ne: true }}).project({}).toArray()
    var username = req.session.username;
    // console.log(username);
    // console.log(history);
    // console.log(req.session._id);
    res.render("history", {username, history})
})
app.get("*", (req, res) => {
    res.status(404);
    res.render("404",);
})

app.listen(port, () => {
    console.log("Node application listening on port " + port);
}); 