var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var fs = require("fs-extra");

var distPath = path.join(process.cwd(), "dist");
var combineDTsList = [
    "Wonder-CommonLib",
    "Wonder-FRP",
    "cannon"
    ],
    combineContentList = [
        "Wonder-CommonLib",
        "Wonder-FRP",
        "bowser",
        "rsvp",
        "chai"
    ];
var tsconfigPath = "src/tsconfig.json";

gulp.task("combineDefinitionFile", function(done){
    var wdFilePath = path.join(distPath, "wd.d.ts");

    try{
        combineInnerLibDTs(
            wdFilePath,
            path.join(process.cwd(), tsconfigPath),
            function(innerLibDtsPath){
                var result = false;

                combineDTsList.forEach(function(dts){
                    if(innerLibDtsPath.indexOf(dts) > -1){
                        result = true;
                    }
                })

                return result;
            }
        );

        gulp.src(wdFilePath)
            .pipe(gulp.dest(distPath));
    }
    catch(e){
        console.log(e);
    }
    finally {
        done();
    }
});

gulp.task("combineContent", function(done){
    var wdFilePath = path.join(distPath, "wd.js");

    try{
        combineInnerLibContent(
            wdFilePath,
            path.join(process.cwd(), tsconfigPath),
            function(innerLibDtsPath){
                var result = false;

                combineContentList.forEach(function(dts){
                    if(innerLibDtsPath.indexOf(dts) > -1){
                        result = true;
                    }
                })

                return result;
            }
        );

        createInnerLibJs();

        gulp.src(wdFilePath)
            .pipe(gulp.dest(distPath));
    }
    catch(e){
        console.log(e);
    }
    finally {
        done();
    }
});

function createInnerLibJs(){
    fs.createFileSync( path.join(distPath, "wd.innerLib.js") );

    combineInnerLibContent(
        path.join(distPath, "wd.innerLib.js"),
        path.join(process.cwd(), tsconfigPath),
        function(innerLibDtsPath){
            var result = false;

            combineContentList.forEach(function(dts){
                if(innerLibDtsPath.indexOf(dts) > -1){
                    result = true;
                }
            })

            return result;
        }
    );
}

function combineInnerLibDTs(mainFilePath, tsconfigPath, filterFunc){
    getInnerLibDTsPathArr(tsconfigPath)
        .filter(filterFunc)
        .forEach(function(innerLibDtsPath){
        fs.writeFileSync(
            mainFilePath,
            fs.readFileSync(innerLibDtsPath, "utf8")
            + "\n"
            + fs.readFileSync(mainFilePath, "utf8")
        );
    });
}
function combineInnerLibContent(mainFilePath, tsconfigPath, filterFunc){
    getInnerLibDTsPathArr(tsconfigPath)
        .filter(filterFunc)
        .forEach(function(innerLibDtsPath){
        fs.writeFileSync(
            mainFilePath,
            fs.readFileSync(innerLibDtsPath.replace("d.ts", "js"), "utf8")
            + "\n"
            + fs.readFileSync(mainFilePath, "utf8")
        );
    });
}

function getInnerLibDTsPathArr(tsconfigPath){
    var regex = /\.d\.ts$/,
        files = null,
        resultArr = [];

    files = JSON.parse(fs.readFileSync(tsconfigPath, "utf8")).files;

    for(var i = 0, len = files.length; i < len; i++){
        var file = files[i];

        if(file.match(regex) !== null){
            resultArr.push(
                parseInnerLibDTsPath(file)
            );
        }
    }

    return resultArr.reverse();
}

function parseInnerLibDTsPath(pathInDefinitionFile){
    return path.join(process.cwd(), pathInDefinitionFile.slice(3));
}

gulp.task("combineInnerLib", gulpSync.sync(["combineDefinitionFile","combineContent"]));


