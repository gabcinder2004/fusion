'use strict';

var request = require('request');
var jiraBaseUrl = 'https://ultidev/rest/api/2/search';
var config = require('../../config/config.json');
var JiraApi = require('jira-client');

exports.getUpcomingOneoffs = function() {
    var jql = 'project = UltiPro AND type = OneOff AND "Target Customer Deployment Date" > 0d AND "Target Customer Deployment Date" < 7d AND status not in (Canceled) ORDER BY key ASC';

    var jira = new JiraApi({
        protocol: 'https',
        host: 'ultidev',
        username: config.user.name,
        password: config.user.password,
        apiVersion: '2',
        strictSSL: false
    });

    return jira.searchJira(jql);
}