var gulp = require("gulp");
var path = require("path");
var fs = require("fs-extra");
var glob = require("glob");

var distPath = null;


var requireInnerLibToContent = require("../../../lib/inner/Wonder-Package/build/gulp_task/package/requireInnerLibToContent").requireInnerLibToContent;
var addModuleExports = require("../../../lib/inner/Wonder-Package/build/gulp_task/package/addModuleExports").addModuleExports;


function _createInnerLibJs(wdInnerLibFilePath, tsconfigPath, combineContentList){
    fs.createFileSync(wdInnerLibFilePath);

    _combineInnerLibContent(
        wdInnerLibFilePath,
        tsconfigPath,
        function(innerLibDtsPath){
            var result = false;

            combineContentList
                .map(function(data){
                    return data.keyword;
                })
                .forEach(function(dts){
                    if(innerLibDtsPath.indexOf(dts) > -1){
                        result = true;
                    }
                });

            return result;
        }
    );
}

function _combineInnerLibDTs(mainFilePath, tsconfigPath, filterFunc){
    _getInnerLibDTsPathArr(tsconfigPath)
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


function _combineInnerLibContent(mainFilePath, tsconfigPath, filterFunc){
    _getInnerLibDTsPathArr(tsconfigPath)
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

function _getInnerLibDTsPathArr(tsconfigPath){
    var regex = /\.d\.ts$/,
        files = null,
        resultArr = [];

    var tsconfigJson = JSON.parse(fs.readFileSync(tsconfigPath, "utf8").replace(/\/\/.+/g, "")),
        files = [];



    // var tsconfigFilePath = require("./pathData.js");
    var folderPath = path.dirname(tsconfigPath);

    // console.log(tsconfigJson.include);

    var allFileGlobs = null;

    if(tsconfigJson.include){
        allFileGlobs = tsconfigJson.include.concat(tsconfigJson.files);
    }
    else{
        allFileGlobs = tsconfigJson.files;
    }



    // console.log(allFileGlobs)

    allFileGlobs.forEach(function(globPattern) {
        files = files.concat(glob.sync(globPattern, {
            cwd: folderPath
        }));
    });

    // console.log(files);





    for(var i = 0, len = files.length; i < len; i++){
        var file = files[i];

        if(file.match(regex) !== null){
            resultArr.push(
                _parseInnerLibDTsPath(file)
            );
        }
    }

    return resultArr.reverse();
}

function _parseInnerLibDTsPath(pathInDefinitionFile){
    return path.join(process.cwd(), pathInDefinitionFile.slice(3));
}

// gulp.task("combineInnerLib", gulpSync.sync(["combineDefinitionFile","combineContent"]));



//
// var combineDTsList = [
//         "Wonder-CommonLib",
//         "Wonder-FRP",
//         "cannon"
//     ],
//     combineContentList = [
//         "Wonder-CommonLib",
//         "Wonder-FRP",
//         "bowser",
//         "rsvp",
//         "chai"
//     ];
// var tsconfigPath = "src/tsconfig.json";

function combineInnerLib(combineDTsList, combineContentList, tsconfigPath, wdDefinitionFilePath, wdFilePath, wdInnerLibFilePath, dPath, done) {
    distPath = dPath;

    _combineDefinitionFile(combineDTsList, tsconfigPath, wdDefinitionFilePath, function () {
        _combineContent(tsconfigPath, combineContentList, wdFilePath, wdInnerLibFilePath, done);
    });
}


function _combineDefinitionFile(combineDTsList, tsconfigPath, wdFilePath, combineContentFunc) {
    try {
        _combineInnerLibDTs(
            wdFilePath,
            tsconfigPath,
            function (innerLibDtsPath) {
                var result = false;

                combineDTsList
                    .map(function(data){
                        return data.keyword;
                    })
                    .forEach(function (data) {
                    if (innerLibDtsPath.indexOf(data) > -1) {
                        result = true;
                    }
                });

                return result;
            }
        );

        gulp.src(wdFilePath)
            .pipe(gulp.dest(distPath));
    }
    catch (e) {
        console.log(e);
    }
    finally {
        combineContentFunc();
    }
}

function _combineContent(tsconfigPath, combineContentList, wdFilePath, wdInnerLibFilePath, done) {
    try{
        requireInnerLibToContent(
            wdFilePath,
            combineContentList
        );

        addModuleExports(
            wdFilePath,
            "{\n" +"wd:wd,\n" + "wdCb:wdCb,\n" + "wdFrp:wdFrp\n}"
        );


        _createInnerLibJs(wdInnerLibFilePath, tsconfigPath, combineContentList);

        gulp.src(wdFilePath)
            .pipe(gulp.dest(distPath));
    }
    catch(e){
        console.log(e);
    }
    finally {
        done();
    }
}


module.exports = {
    combineInnerLib: combineInnerLib
};
