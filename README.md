# 2800-202410-BBY11

## Robo Rental

RoboRental is an App to help people get their tasks done faster with less physical effort, by providing an application that shows available assistant robots in any station nearby your location where you can order robots and take advantage of their services.

## About Us
Team Name: BBY-11
Team Members: 
- Person 1 Coda Miles
- Person 2 Parham Abdolmohammadi
- Person 3 Shayan Nikpour
- Person 4 Seohyeon Park
- Person 5 Jason Lau

## Sources
Sweet alert - https://sweetalert2.github.io/
Before launch page - https://github.com/nipanimaju/coming-soon
Chat GPT - https://chat.openai.com/
Google Maps API
Sendbird with ChatGPT4o (https://github.com/sendbird/chat-ai-widget)
Javascript
Html and Ejs
CSS
MongoDB
node.js
express.js
crypto.js
Bcrypt
Google oauth2
Joi
Browserify 
Body parser
Connect
Connect-mongo
Dotenv
express-session
Uuid
Url
Require
Passport-google-oauth2
Passport
Nodemon
Nodemailer
Fs (filestream)
Google maps api
Bootstrap
github/git
jquery
client side user validation (https://github.com/greencodecomments/COMP2537_Demo_Code_5/commit/05be996aa7bb50622db9d5e23e8dfa426fc9fc87)
Directory.txt (list of all files)

## How to Install/Run
- Download the source code

- Create a .env file and fill out 

(PORT= [4 digit port number]
MONGODB_HOST= [connected from MongoDB]
MONGODB_USER= [connected from MongoDB]
MONGODB_PASSWORD= [MongoDB user password (not personal)]
MONGODB_DATABASE= [first database name for users and orders]
MONGODB_DATABASE2= [second database name for stations services]
ENCRYPTION_KEY= [key used for encryption and decryption]
MONGODB_SESSION_SECRET= [session secret for encryption]
NODE_SESSION_SECRET= [session secret for node]
EMAIL_PASSWORD= [app password for gmail account (use in nodemailer)]
GOOGLE_CLIENT_ID =  [unique client id generated from google cloud console for OAuth2]
GOOGLE_CLIENT_SECRET = [unique client secret generated from google cloud console for OAuth2])

- on cli, run npm i (if it doesnt work add [package] (replace package with packages listed))
(
        "bcrypt": "^5.1.1",
        "browserify": "^17.0.0",
        "body-parser": "^1.20.2",
        "connect": "^3.7.0",
        "connect-mongo": "^5.1.0",
        "crypto-js": "^4.2.0",
        "dotenv": "^16.4.5",
        "ejs": "^3.1.10",
        "express": "^4.19.2",
        "express-session": "^1.18.0",
        "fs": "^0.0.1-security",
        "joi": "^17.13.1",
        "mongodb": "^6.6.2",
        "multer": "^1.4.5-lts.1",
        "node": "^20.13.1",
        "nodemailer": "^6.9.13",
        "nodemon": "^3.1.0",
        "passport": "^0.7.0",
        "passport-google-oauth2": "^0.2.0",
        "require": "^0.4.4",
        "sweetalert2": "^11.6.13",
        "url": "^0.11.3",
        "uuid": "^9.0.1"
)
- run "npm run watch" on cli when in root file (not node index.js or nodemon or else client side validation doesnt work)

