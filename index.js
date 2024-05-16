
require("./utils.js");

const url = require('url');

require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bcrypt = require('bcrypt');
const saltRounds = 12;

// const port = process.env.PORT || 3000;
const port = 3000;

const app = express();

const Joi = require("joi");

const navLinks = [
    {name: "Home", link: "/"},
    {name: "Members", link: "/members"},
    {name: "Login", link: "/login"},
    {name: "Admin", link: "/admin"},
    {name: "404", link: "/*"},
    {name: "Setting", link: "/setting"}
]

app.use("/", (req,res,next) => {
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

app.use(express.urlencoded({extended: false}));

var mongoStore = MongoStore.create({
	mongoUrl: `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/sessions`,
	crypto: {
		secret: mongodb_session_secret
	}
})


app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/images")); 


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

function adminAuthorization(req,res,next) {
    if (!isAdmin(req)) {
        res.status(403);
        res.render("errorMessage", {error: "Not Authorized"});
        return;
    }
    else {
        next();
    }
}

app.get('/', (req,res) => {
    if (!req.session.authenticated) {
        res.render('index');
    } else {
        console.log(req.session.user_type);
        res.render( "main"
        , {username: req.session.username});
    }
    
});

app.get('/signup', (req,res) => {
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

app.post('/submitUser', async (req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;

    if (!username) {
        res.redirect("/signupSubmit?problem=email");
        return;
    }
    if (!email) {
        res.redirect("/signupSubmit?problem=email");
        return;
    }
    if (!password) {
        res.redirect("/signupSubmit?problem=password");
        return;
    }

	const schema = Joi.object(
		{
			username: Joi.string().alphanum().max(20).required(),
			password: Joi.string().max(20).required(),
            email: Joi.string().max(40).required()
		});
	
	const validationResult = schema.validate({username, password, email});
	if (validationResult.error != null) {
	   console.log(validationResult.error);
	   res.redirect("/signup");
	   return;
   }


    var hashedPassword = await bcrypt.hash(password, saltRounds);
	
	await userCollection.insertOne({username: username, password: hashedPassword, email: email, user_type: "user"});
	console.log("Inserted user");
   

    var html = "successfully created user";
    console.log(html);

    req.session.authenticated = true;
    req.session.username = username;
    req.session.cookie.maxAge = expireTime;
    req.session.user_type = "user";


    res.redirect("/members");
});

app.get("/signupSubmit", (req, res) => {
    res.render(
     "signupSubmit", {problem : req.query.problem}
    );
});

app.get('/login', (req,res) => {
   
    res.render("login");
});



app.post('/loggingin', async (req,res) => {
    var email = req.body.email;
    var password = req.body.password;

	const schema = Joi.string().max(40).required();
	const validationResult = schema.validate(email);
	if (validationResult.error != null) {
	   console.log(validationResult.error);
	   res.redirect("/login");
	   return;
	}

	const result = await userCollection.find({email: email}).project({username: 1, password: 1, _id: 1, user_type: 1}).toArray();

	console.log(result);
	if (result.length != 1) {
		console.log("user not found");
		res.redirect("/login");
		return;
	}
	if (await bcrypt.compare(password, result[0].password)) {
		console.log("correct password");
		req.session.authenticated = true;
		req.session.username = result[0].username;
		req.session.cookie.maxAge = expireTime;
        req.session.user_type = result[0].user_type;

		res.redirect('/members');
		return;
	}
	else {
		console.log("incorrect password");
		res.redirect("/loginSubmit");
		return;
	}
}); 
app.get("/loginSubmit", (req, res) => {
    res.render("loginSubmit");
});



app.get('/logout', (req,res) => {
	req.session.destroy();
    
    res.redirect('/');
});



app.get('/members', (req,res) => {
    if (!req.session.authenticated) {
        res.redirect('/login');
    }
    cat = Math.floor(Math.random() * 3) + 1;
    
   

        res.send("Members page shoud be placed here");
});




app.get("*", (req,res) => {
	res.status(404);
	res.render("404",);
})

app.listen(port, () => {
	console.log("Node application listening on port "+port);
}); 