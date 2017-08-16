var request = require('request');
var mongoose = require('mongoose');
var Environment = mongoose.model('Environment');

exports.getEnvironment = function (environmentName, callback) {
    var rCloudApiBaseURL = 'http://deploy.newgen.corp';
    console.log(rCloudApiBaseURL + '/env/' + environmentName);

    request(rCloudApiBaseURL + '/env/' + environmentName, function (error, response, body) {
        if (error) {
            callback(error, null);
            return;
        }

        if (response.statusCode != 200) {
            callback("Response code from rCloud API was not 200", null);
            return;
        }

        var rCloud = JSON.parse(body);

        if (body === JSON.stringify({}) || rCloud.failure) {
            callback("rCloud environment is not a successfully created environment", null)
            return;;
        }

        if (response.statusCode === 200) {
            var environment = new Environment();
            environment.name = rCloud.name;

            for (var i = 0; i < rCloud.servers.length; i++) {
                var server = rCloud.servers[i];
                var serverName = server.name + "." + rCloud.dns_suffix;

                switch (server.role) {
                    case "supersite": {
                        environment.servers.supersite = serverName;
                        break;
                    }
                    case "site": {
                        environment.servers.site = serverName;
                        break;
                    }
                    case "company": {
                        environment.servers.company = serverName;
                        break;
                    }
                    case "hub_internal": {
                        environment.servers.hubInternal = serverName;
                        break;
                    }
                    case "hub_external": {
                        environment.servers.hubExternal = serverName;
                        break;
                    }
                    case "application": {
                        environment.servers.application = serverName;
                        break;
                    }
                    case "dpm": {
                        environment.servers.dpm = serverName;
                        break;
                    }
                    case "client": {
                        environment.servers.client = serverName;
                        break;
                    }
                    case "web": {
                        environment.servers.web = serverName;
                        break;
                    }
                }
            };

            Environment.findOne({ "name": environmentName }, function (err, res) {
                if (err) {
                    callback(err, null);
                    return;
                }

                if (res) {
                    callback(null, res);
                    return;
                }

                environment.save();
                callback(null, environment);
            })
        }

    });
}