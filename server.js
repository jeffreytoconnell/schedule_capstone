// GET ALL THE TOOLS NEEDED
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('./config/database.js');
var Course = require('./app/models/course.js');
//var port = process.env.PORT || 8080;
let server;
module.exports = server;

// CONFIGURATION
mongoose.connect(configDB.url); // CONNECT TO DB VAR FROM ABOVE
require('./config/passport')(passport); // PASS PASSPORT FOR CONFIG

app.configure(function () {
    // SET UP OUR EXPRESS APPLICATION
    app.use(express.static(__dirname + '/views'));
    app.use(express.logger('dev')); // LOG EVERY REQUEST TO CONSOLE
    app.use(express.cookieParser()); // READ COOKIES(NEEDED FOR AUTH)
    app.use(express.bodyParser()); // GET INFO FROM HTML FORMS
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    //app.set('view engine', 'ejs'); // SET UP EJS FOR TEMPLATING

    // REQUIRED FOR PASSPORT
    app.use(express.session({
        secret: 'slipknot'
    })); // SESSION SECRET
    app.use(passport.initialize());
    app.use(passport.session()); // PERSISTENT LOGIN SESSIONS
    app.use(flash()); // USE CONNECT-FLASH FOR FLASH MESSAGES STORED IN SESSION
});

// ROUTES
require('./app/routes.js')(app, passport); // LOAD OUR ROUTES AND PASS IN OUR APP AND FULLY CONFIGURED PASSPORT

// POST
app.post('/course', function (req, res, next) {
    console.log(req.body);
    thiscourse = new Course(req.body);
    thiscourse.save(function (err) {
        if (err) {
            res.send(err);
        }
    })
});

// GET
app.get('/course', function (req, res, next) {
    console.log(req.body)
    Course.find(function (err, docs) {
        if (err)
            res.send(err)
        res.json(docs)
    })
})

// DELETE
app.delete('/course/:id', (req, res) => {
    console.log(req.params);
    Course.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err)
            res.send(err)
    });
    console.log('Deleted', req.params.id);
    res.json({
        Message: "Item Deleted"
    })

});

// PUT
app.put('/course', function (req, res) {
    console.log(req.body.id);
    console.log(req.body);
    console.log("PUT-HERE");

    Course.findByIdAndUpdate(req.body.id, {
            date: req.body.date,
            course: req.body.course,
            location: req.body.location,
            courseDirector: req.body.courseDirector
        },
        function (err, res2) {
            console.log(err);
            console.log(res2);
        });
    res.status(204).end();
});

// RUN SERVER
function runServer() {
    const port = process.env.PORT || 8080;
    return new Promise((resolve, reject) => {
        server = app.listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve(server);
        }).on('error', err => {
            reject(err)
        });
    });
}
// END OF RUN SERVER

// CLOSE SERVER
function closeServer() {
    return new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}
// END OF CLOSE SERVER

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = server;
module.exports = app;
module.exports = runServer;
module.exports = closeServer;
