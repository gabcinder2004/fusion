var kue = require('kue'),
    fileManager = require('../utils/fileManager');

var jobs = kue.createQueue();



exports.newJob = function newJob(jobName, oneOff, environment) {
    var job = jobs.create(jobName, {
        oneOff: oneOff,
        environment: environment
    });

    job.save();
}

jobs.process('apply_oneoff', function (job, done) {
    var environment = job.data.environment;
    var oneoff = job.data.oneOff;

    console.log("APPLYING " + oneoff.key + " to " + environment.name);
    openNetworkDrive(environment.servers.web, oneoff.key);
    closeNetworkDrive();
    done && done();
});

/// Assign one-off to drive in database

var openNetworkDrive = function (environmentName, oneOffKey) {
    var sourcePath = "\\\\denver2\\clientOneOffs\\UltiPro 12.2.1 - 2017 R1 Release\\" + oneOffKey;
    var destPath = "\\\\" + environmentName + "\\c$\\temp";

    fileManager.mountDrive(sourcePath, oneOffKey);
    fileManager.mountDriveWithCredentials(destPath, "Administrator", "Passw0rd", oneOffKey);
}

var closeNetworkDrive = function(driveLetter){
    fileManager.deleteDrive(driveLetter);
}
