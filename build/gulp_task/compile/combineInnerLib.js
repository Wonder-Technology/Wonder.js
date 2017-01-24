var gulp = require("gulp");
var path = require("path");
var fs = require("fs-extra");
var glob = require("glob");

var distPath = null;

var wonderPackage = require("wonder-package");

var addModuleExports = wonderPackage.addModuleExports;
var requireInnerLibToContent = wonderPackage.requireInnerLibToContent;



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


//todo move to wonder-package
function _combineInnerLibContent(mainFilePath, combineContentList){
    var content = fs.readFileSync(mainFilePath, "utf8");

    combineContentList
        .map(function(data){
            return data.path;
        })
        .forEach(function(moduleName){
            content += "\n" + _readFileByModuleName(moduleName);
            // content += "\n" + require(moduleName).toString()
        });

    fs.writeFileSync(
        mainFilePath,
        content
    );
}

function _readFileByModuleName(moduleName) {
    // var moduleDir = path.join(process.cwd(), "node_modules", moduleName);
    //
    // var main = fs.readJSONSync(
    //     path.join(moduleDir, "package.json")
    // ).main;
    //
    // return fs.readFileSync(path.join(moduleDir, main), "utf8");


    var Module = module.constructor;
    var m = new Module();
    m._compile(moduleName);

    console.log(m);
    // return m.exports;
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



//todo remove wdInnerLibFilePath

function combineInnerLib(combineDTsList, combineContentList, tsconfigPath, wdDefinitionFilePath, wdFilePath, wdInnerLibFilePath, dPath, done) {
    distPath = dPath;

    _combineDefinitionFile(combineDTsList, tsconfigPath, wdDefinitionFilePath, function () {
        _combineContent(combineContentList, wdFilePath, done);
    });
}


function _combineDefinitionFile(combineDTsList, tsconfigPath, wdFilePath, combineContentFunc) {
    try {
        _combineInnerLibDTs(
            wdFilePath,
            tsconfigPath,
            function (innerLibDtsPath) {
                var result = false;

                //todo refactor?
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

function _combineContent(combineContentList, wdFilePath, done) {
    try{
        requireInnerLibToContent(
            wdFilePath,
            combineContentList
        );

        addModuleExports(
            wdFilePath,
            "{\n" +"wd:wd,\n" + "wdCb:wdCb,\n" + "wdFrp:wdFrp\n}"
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
}


module.exports = {
    combineInnerLib: combineInnerLib
};
