exports.clean = function (message) {
    return message.replace(/\\/g, '\\\\');
}

exports.randomizeDriveLetter = function () {
    var possible = "ABFGIJKLMNOPQRSTUVWXYZ";

    return possible.charAt(Math.floor(Math.random() * possible.length));
}