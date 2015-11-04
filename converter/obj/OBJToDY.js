///<reference path='../../node_modules/dyrt/dist/dyRt.node.d.ts' />
var through = require("through-gulp");
var gutil = require("gulp-util");
//path = require("path"),
//fs = require("fs"),
//buildConfigOperator = require("../lib/buildConfigOperator"),
//mapOperator = require("../lib/resourceMapOperator"),
//parse = require("../lib/parse");
//var PLUGIN_NAME = "createBuildMap";
var dyRt = require("dyrt");
module.exports = (function () {
    function Convert() {
        this.name = "OBJToDY";
    }
    Convert.create = function () {
        var obj = new this();
        return obj;
    };
    Convert.prototype.convert = function () {
        //var result = {},
        //    buildConfig = null;
        //
        //buildConfig = buildConfigOperator.read();
        var self = this;
        return through(function (file, encoding, callback) {
            var fileContent = null, filePath = null;
            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(self.name, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                //fileContent = file.contents.toString();
                //filePath = file.path;
                //
                //result[filePath] = new parse.ParseCss(this, PLUGIN_NAME, file.path).parse(fileContent, buildConfig)
                //    .concat(new parse.ParseJs(this, this.name, file.path).parse(fileContent, buildConfig));
                var that = this;
                var a = [];
                var stream = dyRt.fromArray(["aaa"]).subscribe(function (data) {
                    a.push(data);
                }, null, function () {
                    that.push(new Buffer(a[0]));
                    return callback();
                });
            }
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(self.name, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            //mapOperator.write(JSON.stringify(result));
            callback();
        });
    };
    return Convert;
})();
