var through = require("through-gulp"),
    gutil = require("gulp-util"),
    path = require("path"),
    fs = require("fs"),
    fileOperator = require("../lib/fileOperator");

var PLUGIN_NAME = "concat";

function concat() {
    var DELIMITER = "\n\r";
    var container = {};

    return through(function (file, encoding, callback) {
        var fileContent = null,
            filePath = null;

        if (file.isNull()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, "Streaming not supported"));
            return callback();
        }
        if (file.isBuffer()) {
            fileContent = file.contents.toString();
            filePath = file.dist;

            if (!container[filePath]) {
                container[filePath] = fileOperator.createFile(new Buffer(fileContent), filePath);
            }
            else {
                fileOperator.append(container[filePath], file, DELIMITER);
            }

            callback();
        }
        //todo support stream
        if (file.isStream()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, "Streaming not supported"));
            return callback();
        }
    }, function (callback) {
        _concatStream(container, this);

        callback();
    });
}

function _concatStream(container, stream){
    var i = null;

    for (i in container) {
        if (container.hasOwnProperty(i)) {
            stream.push(container[i]);
        }
    }
}


module.exports = concat;
