var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var fs = require("fs-extra");

var distPath = path.join(process.cwd(), "dist");
var combineDTsList = [
    "DYCommonLib",
    "DYReactive"
    ],
    combineContentList = [
        "DYCommonLib",
        "DYReactive",
        "bowser",
        "rsvp"
    ];
var definitionsPath = "src/definitions.d.ts";

gulp.task("combineDefinitionFile", function(done){
    combineInnerLibDTs(
        path.join(distPath, "dy.d.ts"),
        path.join(process.cwd(), definitionsPath),
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

    done();
});

gulp.task("combineContent", function(done){
    combineInnerLibContent(
        path.join(distPath, "dy.js"),
        path.join(process.cwd(), definitionsPath),
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

    done();
});

function createInnerLibJs(){
    fs.createFileSync( path.join(distPath, "dy.innerLib.js") );

    combineInnerLibContent(
        path.join(distPath, "dy.innerLib.js"),
        path.join(process.cwd(), definitionsPath),
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

function combineInnerLibDTs(mainFilePath, definitionDTsPath, filterFunc){
    getInnerLibDTsPathArr(definitionDTsPath)
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
function combineInnerLibContent(mainFilePath, definitionDTsPath, filterFunc){
    getInnerLibDTsPathArr(definitionDTsPath)
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

function getInnerLibDTsPathArr(definitionDTsPath){
    var regex = /"[^"]+\.d\.ts"/g,
        content = null,
        result = null,
        resultArr = [];

    content = fs.readFileSync(definitionDTsPath, "utf8");

    while((result = regex.exec(content)) !== null){
        resultArr.push(
            parseInnerLibDTsPath(result[0].slice(1, -1))
        );
    }

    //to make finial file is build based on definitions.d.ts's sequence
    return resultArr.reverse();
}

function parseInnerLibDTsPath(pathInDefinitionFile){
    return path.join(process.cwd(), pathInDefinitionFile.slice(3));
}

gulp.task("combineInnerLib", gulpSync.sync(["combineDefinitionFile","combineContent"]));


