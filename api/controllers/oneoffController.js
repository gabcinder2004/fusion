'use strict';

var mongoose = require('mongoose'),
    Environment = mongoose.model('Environments'),
    jira = require('../utils/jira_util');

exports.get_upcoming_oneoffs = function(req, res) {
    jira.getUpcomingOneoffs().then(r => {
        var response = {
            issues: []
        };

        for (var i = 0; i < r.issues.length; i++) {
            response.issues.push(r.issues[i].key);
        }

        return res.status(200).send(response);
    }).catch(error => {
        console.log(error)
        return res.status(500).send(error);
    });
}

exports.apply_upcoming_oneoffs = function(req, res) {
    jira.getUpcomingOneoffs().then(r => {
        var environment = req.body.environment;
        
    }).catch(error => {
        console.log(error)
        return res.status(500).send(error);
    });
}