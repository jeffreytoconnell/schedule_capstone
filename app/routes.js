// MODULE EXPORTS
module.exports = function (app, passport) {

	// HOME PAGE
	app.get('/', function (req, res) {
		res.render('index.html');
	});

	// LOGIN 
	// SHOW LOGIN FORM
	app.get('/login', function (req, res) {
		res.render('login.html', {
			message: req.flash('loginMessage')
		});
	});

	// PROCESS LOGIN FORM
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login?fail',
		failureFlash: true // ALLOW FLASH MESSAGES
	}));

	// SIGNUP
	// SHOW SIGNUP FORM
	app.get('/signup', function (req, res) {
		res.render('signup.html', {
			message: req.flash('signupMessage')
		});
	});

	// PROCESS SIGNUP FORM
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // ALLOW FLASH MESSAGES
	}));

	// PROFILE SECTION 
	// USES MIDDLEWARE -ISLOGGEDIN- TO VERIFY USER LOGGED IN
	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.html', {
			user: req.user // PASSES OBJECT
		});
	});

	// LOGOUT
	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});
}; // END OF MODULE EXPORTS FUNCTION

// isLoggedIn FUNCTION
function isLoggedIn(req, res, next) {
	// IF USER AUTHENTICATES 
	if (req.isAuthenticated())
		return next();
	// IF USER NOT AUTHENTICATED REDIRECTS TO HOMEPAGE
	res.redirect('/');
}