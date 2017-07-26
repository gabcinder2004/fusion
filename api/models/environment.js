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
    }
});

module.exports = mongoose.model('Environments', EnvironmentSchema);