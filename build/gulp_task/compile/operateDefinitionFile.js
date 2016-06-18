var through = require("through-gulp");
var fs = require("fs");
var path = require("path");
var glob = require("glob");
var gulp = require("gulp");

var convert = require("./convertDefinitionFileToPathArray");

var tsconfigFile = [
    "src/tsconfig.json"
];

var filePath = path.join(process.cwd(), "src/filePath.d.ts");
var backUp = null;

function findFiles(recipePath, filesGlob) {
    var folderPath = path.dirname(recipePath);

    var result = [];
    filesGlob.forEach(function(globPattern) {
        result = result.concat(glob.sync(globPattern, {
            cwd: folderPath
        }));
    });
    return result;
}

gulp.task("rewriteDefinitionFileByParseFilesGlob", function(done) {
    var files = null,
        file = null,
        tempArr = [];

    backUp = fs.readFileSync(filePath, "utf8");

    files = findFiles(filePath, convert.convertToPathArray());

    for(var i = 0, len = files.length; i < len; i++){
        file = files[i];

        tempArr.push("/// <reference path=\"" + file + "\"/>");
    }

    fs.writeFileSync(filePath, tempArr.join("\n"));

    done();
});

gulp.task("restoreDefinitionFile", function(done) {
    fs.writeFileSync(filePath, backUp);

    done();
});

gulp.task("compileTsConfig", function(){
    return gulp.src(tsconfigFile)
        .pipe(through(function (file, encoding, callback) {
            var arr = null,
                tsconfig = null,
                outputConfigStr = null;

            if (file.isNull()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
            if (file.isBuffer()) {
                arr = convert.convertToPathArray();

                tsconfig = JSON.parse(file.contents);
                tsconfig.files = arr;

                outputConfigStr = JSON.stringify(tsconfig,null,"\t");

                fs.writeFileSync(file.path,outputConfigStr);

                this.push(file);

                callback();
            }
            if (file.isStream()) {
                this.emit("error", new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
                return callback();
            }
        }, function (callback) {
            callback();
        }));
});
