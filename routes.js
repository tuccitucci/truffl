'use strict'

var Auth = require('./controllers/controller.auth'),
    Journal = require('./controllers/controller.journals');


module.exports = function(app) {
    // SITE ROOT
    // app.get('/', (req, res) => { // replace this route with a landing or home page, or break this out into another controller if needed!
    //     res.send('home');
    // });

    console.log("Getting to the route")
    app.post('/api/journal/delete', Journal.remove);

    app.get('/api/me', Auth.getMe);
    app.get('/api/login', Auth.render); // route for the login page
    app.get('/api/logout', Auth.logout); // route for logging out
    app.get('/api/journal', Journal.get); // route for retriving user's journal entries

    app.post('/api/login', Auth.login); // form request emdpoint for loggin in
    app.post('/api/register', Auth.register); // form request endpoint for user registration
    app.post('/api/journal', Journal.create); // populates user's journal collection

    // delete items from user's journal collection
    // CLIENT ROUTES
    // app.all('/*', Auth.session); // protect all dashboard routes from unauthorized users
    app.get('/', (req, res) => { // renders the dashboard, break this out into another controller if needed!
        res.sendFile('index.html', {root : "./public/views"});
    });
}
