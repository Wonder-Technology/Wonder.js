var gulp = require("gulp");
var gulpTs = require("gulp-typescript");
var gulpSourcemaps = require("gulp-sourcemaps");
var gulpConcat = require("gulp-concat");
var del = require("del");
var gulpSync = require("gulp-sync")(gulp);
var merge = require("merge2");
var path = require("path");

var tsFilePaths = [
    "engine/*.ts",
    "engine/**/*.ts"
    //"engine/Camera.ts",
    //"engine/math/*.ts"
];
var distPath = "dist";

gulp.task("clean", function() {
    return del.sync([distPath], {
        force: true
    });
});

//todo remove "///reference" of d.ts file?
gulp.task("compileTs", function() {
    var tsResult = gulp.src(tsFilePaths)
        .pipe(gulpSourcemaps.init())
        .pipe(gulpTs({
            declarationFiles: true,
            target: "ES5",
            sortOutput:true,
            noEmitOnError: true
            //noExternalResolve: true
            //out: "dyR.js"
            //typescript: require("typescript")
        }));


    return merge([
        tsResult.dts
            .pipe(gulpConcat("Engine.d.ts"))
            .pipe(gulp.dest("dist")),
        tsResult.js
            .pipe(gulpConcat("Engine.js"))
            .pipe(gulpSourcemaps.write("./"))
            .pipe(gulp.dest("dist/"))
    ])
});

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



var fs = require("fs");

gulp.task("createBowerDefinitionFile", function(done){
    var allUserAgents = JSON.parse(fs.readFileSync("build/createDefinitionFile/bowser.json", "utf8")),
        fileName = path.join(process.cwd(), "engine/lib/inner/bowser/bowser.d.ts");

    fs.writeFileSync(fileName, _convertToDefinitionFileContent(_getProperty(allUserAgents)));
    //console.log("finish");
});

function _getProperty(allUserAgents){
    var i = null,
        j = null,
        property = null,
        result = {};

    for(i in allUserAgents){
        (function (userAgents) {
            for (j in userAgents) {
                (function(expections){
                    for (property in expections) {
                        if (!result[property]) {
                            result[property] = expections[property];
                        }
                    }
                }(userAgents[j]))
            }
        }(allUserAgents[i]));
    }

    return result;
}

function _convertToDefinitionFileContent(propertyObj){
    var content = "",
        property = null;

    //todo newline char
    content += "declare class bowser{\n";

    for(property in propertyObj) {
        content += "public static " + property + ":";
        content += _getType(propertyObj[property]) + ";\n";
    }


    content += "}";

    return content;
}

function _getType(value){
    return typeof(value);
}

gulp.task("build", gulpSync.sync(["clean", "compileTs", "combineInnerLib"]));






var karma = require("karma").server;
var karmaConfPath = path.join(process.cwd(), "test/karma.conf.js");

gulp.task("test", function (done) {
    karma.start({
        configFile: karmaConfPath
        //singleRun:true,
        //autoWatch:false
    }, done);
});

