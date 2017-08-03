// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
//var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var configDB = require('./config/database.js');
var Course = require('./app/models/course.js');
//var server = require('./server')
let server;
module.exports = server;

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function () {

    // set up our express application
    app.use(express.static(__dirname + '/views'));
    app.use(express.logger('dev')); // log every request to the console
    app.use(express.cookieParser()); // read cookies (needed for auth)
    app.use(express.bodyParser()); // get information from html forms
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    //app.set('view engine', 'ejs'); // set up ejs for templating


    // required for passport
    app.use(express.session({
        secret: 'slipknot'
    })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
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
app.put('/course', function(req, res){
    console.log(req.body.id);
    console.log(req.body);
    console.log("PUT-HERE");

    Course.findByIdAndUpdate(req.body.id,  {
         date: req.body.date,
         course: req.body.course,
         location: req.body.location,
         courseDirector: req.body.courseDirector
         
    }, //{
       // "new": true
    //},
     function (err, res2) {
        console.log(err);
        console.log(res2);
    });
    res.status(204).end();
    });
    
   

// launch ======================================================================
//app.listen(port);
//console.log('Running on port ' + port);



// run server===================================================================
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
module.exports = server;
module.exports = app;
module.exports = runServer;
module.exports = closeServer;
// close server==================================================================
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
if (require.main === module) {
  runServer().catch(err => console.error(err));
};



