'use strict';

module.exports.init = init;

function init(app, passport) {
    require('../contact/contact.router.js')(app);
    require('../config/passport.js')(passport);
    require('../users/users.router.js')(app);
    require('../locate/routes/events_routes')(app);
}
