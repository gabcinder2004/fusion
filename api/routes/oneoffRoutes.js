'use strict'
module.exports = function(app) {
    var oneOffController = require('../controllers/oneoffController');

    app.route('/oneoffs')
        .get(oneOffController.get_upcoming_oneoffs)
        .post(oneOffController.apply_upcoming_oneoffs);
}