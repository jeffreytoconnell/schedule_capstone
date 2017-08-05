// LOAD EVERYTHING NEEDED
var LocalStrategy = require('passport-local').Strategy;

// LOAD UP USER MODEL
var User = require('../app/models/user');
var Course = require('../app/models/course');

// EXPOSE THIS FUNCTION TO OUR APP USING MODULE.EXPORTS
module.exports = function (passport) {
    // PASSPORT SESSION SETUP
    // SERIALIZE USER FOR THE SESSION
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    // DESERIALIZE USER
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // LOCAL SIGNUP
    // USING NAMED STRATEGIES SINCE WE HAVE ON EFOR LOGIN AND ONE FOR SIGNUP
    // BY DEFAULT IF NO NAME WAS USED DEFAULTS TO 'LOCAL'
    passport.use('local-signup', new LocalStrategy({
            // USERNAME AND PASSWORD DEFAULT LOCAL STRATEGY, OVERRIDE WITH EMAIL
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // ALLOWS TO PASSBACK THE ENTIRE REQUEST TO THE CALLBACK
        },
        function (req, email, password, done) {
            // CHECKING IF EMAIL EXIST
            User.findOne({
                'local.email': email
            }, function (err, user) {
                // IF ERRORS, RETURN THE ERROR
                if (err)
                    return done(err);
                // CHECK TO SEE IF USER EMAIL ALREADY EXISTS
                if (user) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
                    // ELSE CREATE THE USER
                    var newUser = new User();
                    // SET USERS LOCAL CREDENTIALS
                    newUser.local.email = email;
                    newUser.local.password = newUser.generateHash(password); // USE generateHash FUNCTION IN USER MODEL
                    // SAVE USER
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        }));

    // LOCAL LOGIN
    // USING NAME STRATEGIES, LOGIN AND SIGNUP, DEFAULT LOCAL
    passport.use('local-login', new LocalStrategy({
            // USERNAME PASSWORD DEFAULT - OVERRIDDEN WITH EMAIL
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // ALLOWS TO PASS BACK THE ENTIRE REQUEST TO THE CALLBACK
        },
        function (req, email, password, done) { // CALLBACK EMAIL PASSWORD FROM FORM
            // FIND EMAIL SUBMITTED IN FORM CHECKING TO SEE IF LOGIN EXISTS
            User.findOne({
                'local.email': email
            }, function (err, user) {
                if (err)
                    return done(err);
                // NO USER FOUND
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                // INCORRECT PASSWORD
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                // ALL IS GOOD RETURN SUCCESSFUL USER
                return done(null, user);
            });
        }));
};