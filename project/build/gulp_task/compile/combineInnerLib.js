var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var fs = require("fs");

gulp.task("combineDefinitionFile", function(done){
    var engineDTsPath = path.join(process.cwd(), "dist/Engine.d.ts"),
        bowserDTsPath = path.join(process.cwd(), "engine/lib/inner/bowser/bowser.d.ts");

    //todo newline char
    fs.writeFileSync(
        engineDTsPath,
        fs.readFileSync(bowserDTsPath, "utf8") + "\n" + fs.readFileSync(engineDTsPath, "utf8").replace(/\/\/\/\s*<reference\spath=".+bowser\.d\.ts"\s*\/>/, "")
    );

    done();
});
gulp.task("combineContent", function(done){
    var enginePath = path.join(process.cwd(), "dist/Engine.js"),
        bowserPath = path.join(process.cwd(), "engine/lib/inner/bowser/bowser.js");

    //todo newline char
    fs.writeFileSync(
        enginePath,
        fs.readFileSync(bowserPath, "utf8") + "\n" + fs.readFileSync(enginePath, "utf8").replace(/\/\/\/\s*<reference\spath=".+bowser\.d\.ts"\s*\/>/, "")
    );

    done();
});

gulp.task("combineInnerLib", gulpSync.sync(["combineDefinitionFile","combineContent"]));


