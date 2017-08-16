"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EnvironmentSchema = new Schema({
    name: {
        type: String,
        Required: 'Enter the name of the environment'
    },
    status: {
        type: String,
        enum: ['idle', 'in progress', 'unknown'],
        default: 'idle'
    },
    servers: {
        web: {type: String, trim: true},
        site: {type: String, trim: true},
        supersite: {type: String, trim: true},
        company: {type: String, trim: true},
        hubInternal: {type: String, trim: true},
        hubExternal: {type: String, trim: true},
        application: {type: String, trim: true},
        dpm: {type: String, trim: true},
        client: {type: String, trim: true}
    }
});

module.exports = mongoose.model('Environment', EnvironmentSchema);