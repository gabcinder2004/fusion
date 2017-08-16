"use strict";

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var driveSchema = new Schema({
    letter: {
        type: String,
        Required: 'Enter the drive letter'
    },
    status: {
        type: String,
        enum: ['not used', 'used'],
        default: 'not useds'
    },
    oneOff: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('Drive', driveSchema);