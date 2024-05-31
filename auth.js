/*

sso Implementation using passport-google-oauth2 library
   * @author  "Google Cloud console"
   * @see "https://console.cloud.google.com/apis/credentials/oauthclient/939315208905-mip1pa8mdl5faa7mept4d3u0hue8oodn.apps.googleusercontent.com?project=bby11-423421"
   */




const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const  GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID:`${GOOGLE_CLIENT_ID}`,
  clientSecret: `${GOOGLE_CLIENT_SECRET}`,
  callbackURL: "https://two800-202410-bby11-1-dogh.onrender.com/google/callback",
  
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});








