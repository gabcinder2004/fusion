var Drive = require('../drive');
var seededDriveData = require('./drive.data').data;

module.exports.seed = function (mongoose) {
    seedDriveData();
}

var seedDriveData = function () {
    Drive.collection.drop();
    Drive.collection.insertMany(seededDriveData, function (err, res) {
        if (err) {
            console.log("seeding failed");
            return;
        }

        console.log("seeding succeeded");
    });
}