/* Database connection to MongoDB for Nodejs server
 * This client side validation block of code was adapted from code found here:
 * source: https://github.com/greencodecomments/COMP2537_Demo_Code_1/commit/f43c54b9aec50ffad0ddf56e4927be6f328a71cb
 * (from COMP2537 week 1 example code with variable names changed).
 */

require('dotenv').config();

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
// const mongodb_database = process.env.MONGODB_DATABASE;
// const mongodb_database2 = process.env.MONGODB_DATABASE2;


const MongoClient = require("mongodb").MongoClient;
const atlasURI = `mongodb+srv://${mongodb_user}:${mongodb_password}@${mongodb_host}/?retryWrites=true`;

// Create an instance of MongoClient
var database = new MongoClient(atlasURI);

// Export the database object
module.exports = {database};
