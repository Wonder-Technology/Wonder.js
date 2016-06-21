var fs = require("fs");
var gulp = require("gulp");
var through = require("through-gulp");

var tsconfigFilePath = require("./pathData.js");

gulp.task("removeTsconfigFiles", function() {
    return gulp.src(tsconfigFilePath)
        .pipe(through(function (file, encoding, callback) {
            var tsconfig = null;

            if (file.isNull()) {
                this.emit("error", "file shouldn't be null");

                return callback();
            }

            if (file.isBuffer()) {
                tsconfig = JSON.parse(file.contents);
                delete tsconfig.files;

                fs.writeFileSync(file.path, JSON.stringify(tsconfig, null, '\t'));

                this.push(file);

                callback();
            }

            if (file.isStream()) {
                this.emit("error", "Streaming not supported");

                return callback();
            }
        }, function (callback) {
            callback();
        }));
});

