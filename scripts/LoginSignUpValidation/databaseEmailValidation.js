const CryptoJS = require('crypto-js')

// Check if the entered email for signup already exists in the database:

const checkIfEmailExists = async function(email, userCollection, key, iv) {
    try {
        // Get all of the users from the 'users' collection in db using .find with empty query '{}'
        const dbUserEmails = await userCollection.find({}).project({email: 1, _id: 1}).toArray();

        // Decrypt each email, comparing each with the user entered email in sign up page
        dbUserEmails.forEach((dbEmail) => {

            const decryptedDbEmail = CryptoJS.AES.decrypt(dbEmail.email, key, { iv: iv}).toString(CryptoJS.enc.Utf8);

            // If the user entered email matches an email in the database
            if (email == decryptedDbEmail) {
                throw new Error("Entered email already exists");
            }
        });

    } catch (emailExistsError) { // If a user in the db with the same email was found
        
        // Throw the error - caught by function in signup-joi-schema.js
        throw emailExistsError;
    }
};

// Save the function in a variable to be able to export it to client side and server side
module.exports = {
    checkIfEmailExists,
};
