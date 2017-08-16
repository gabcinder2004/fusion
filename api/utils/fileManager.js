var nrc = require('node-run-cmd');
var mongoose = require('mongoose');
var Drive = mongoose.model('Drive');

exports.mountDrive = function (filePath, oneOffKey) {
    assignDriveLetter(oneOffKey, function (err, driveLetter, oneOffKey) {
        console.log('driveletter: ' + driveLetter);
        var command = "net.exe use " + driveLetter + ": " + filePath;
        nrc.run(command).then(
            function (exitCodes) {
                console.log("Mounted " + driveLetter + " to '" + filePath + "'");
                console.log(exitCodes);
            }, function (err) {
                console.log("error mounting drive: " + err);
            });
    });
};

exports.mountDriveWithCredentials = function (filePath, username, password, oneOffKey) {
    assignDriveLetter(oneOffKey, function (err, driveLetter) {
        console.log('driveletter: ' + driveLetter + ' | ' + oneOffKey);

        var command = "net.exe use " + driveLetter + ": '" + filePath + "' /user:" + username + " " + password;

        nrc.run(command).then(function (exitCodes) {
            console.log("Mounted " + driveLetter + " to " + filePath);
            console.log(exitCodes);
        }, function (err) {
            console.log("error mounting drive: " + err);
        });
    });
}

exports.deleteDrive = function (oneOffKey) {
    Drive.findOne({ oneOff: oneOffKey }, function (err, res) {
        if (err) {
            return null;
        }

        var command = "net.exe use " + res.driveLetter + ": /DELETE /YES";
        nrc.run(command);

        res.status = "not used";
        res.oneOff = '';
        console.log("Deleted " + res.driveLetter);
    })
}

var assignDriveLetter = function (oneOffKey, callback) {
    Drive.find({ status: "not used" }).exec(function (err, data) {
        if (err) {
            console.log('failed to get drive letter');
            console.error(err);
            return callback(err, null);
        }

        data[0].status = "used";
        data[0].oneOff = oneOffKey;
        data[0].save();
        return callback(null, data[0].letter);
    });
}