var fs = require("fs");
var gulp = require("gulp");

var tsconfigFilePathData = require("./pathData.js");

gulp.task("removeTsconfigFiles", function(done) {
    for(var key in tsconfigFilePathData) {
        if (tsconfigFilePathData.hasOwnProperty(key)) {
            var configPath = tsconfigFilePathData[key],
                fileContent = fs.readFileSync(configPath).toString(),
                tsconfig = null;

            tsconfig = JSON.parse(fileContent);
            delete tsconfig.files;

            fs.writeFileSync(configPath, JSON.stringify(tsconfig, null, '\t'));
        }
    }

    done();
});

