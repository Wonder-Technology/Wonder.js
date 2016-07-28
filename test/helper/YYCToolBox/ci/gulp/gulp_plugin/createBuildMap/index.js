var through = require("through-gulp"),
    gutil = require("gulp-util"),
    path = require("path"),
    fs = require("fs"),
    buildConfigOperator = require("../lib/buildConfigOperator"),
    mapOperator = require("../lib/resourceMapOperator"),
    parse = require("../lib/parse");

var PLUGIN_NAME = "createBuildMap";


//todo filter annotated script
function createBuildMap() {
    var result = {},
        buildConfig = null;

    buildConfig = buildConfigOperator.read();

    return through(function (file, encoding, callback) {
        var fileContent = null,
            filePath = null;

        if (file.isNull()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
        if (file.isBuffer()) {
            fileContent = file.contents.toString();
            filePath = file.path;

            result[filePath] = new parse.ParseCss(this, PLUGIN_NAME, file.path).parse(fileContent, buildConfig)
                .concat(new parse.ParseJs(this, PLUGIN_NAME, file.path).parse(fileContent, buildConfig));

            return callback();
        }
        //todo support stream
        if (file.isStream()) {
            this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return callback();
        }
    }, function (callback) {
        mapOperator.write(JSON.stringify(result));

        callback();
    });
}


module.exports = createBuildMap;

