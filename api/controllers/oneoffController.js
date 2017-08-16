'use strict';

var mongoose = require('mongoose'),
    Environment = mongoose.model('Environment'),
    jira = require('../utils/jira_util'),
    fileManager = require('../utils/fileManager'),
    stringUtil = require('../utils/string_util'),
    queue = require('../utils/simple-job-queue'),
    rcloud = require('../utils/rCloud');

exports.get_upcoming_oneoffs = function (req, res) {
    jira.getUpcomingOneoffs().then(r => {
        var response = {
            issues: []
        };

        for (var i = 0; i < r.issues.length; i++) {
            response.issues.push(r.issues[i].key);
        }

        return res.status(200).send(response);
    }).catch(error => {
        console.log(error);
        return res.status(500).send(error);
    });
}

exports.apply_upcoming_oneoffs = function (req, res) {
    jira.getUpcomingOneoffs().then(r => {
        var environmentName = req.body.environment.name;
        var response = {
            issues: [],
            environment: {}
        };

        for (var i = 0; i < r.issues.length; i++) {
            response.issues.push(r.issues[i].key);
        }

        rcloud.getEnvironment(environmentName, function (err, environment) {
            if (err) {
                res.status(500).send(err);
                return;
            }

            for (var i = 0; i < r.issues.length; i++) {
                queue.newJob("apply_oneoff", r.issues[i], environment);
            }
            
            response.environment = environment;
            res.status(200).send(response);
        });
    }).catch(error => {
        console.log(error)
        return res.status(500).send(error);
    });
}