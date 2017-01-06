var fs = require("fs");
var path = require("path");
var glob = require("glob");
var gulp = require("gulp");

var tsconfigFilePathData = require("./pathData.js");

/**
 * Given a recipe is found at `recipePath`, create a `tsconfig.json` sibling file with the glob resolved.
 */
function handleRecipeFile(recipePath) {
    var contents = null;
    try {
        contents = fs.readFileSync(recipePath);
    } catch (err) {
        // Not finding a recipe is OK
        return;
    }

    var config = null;
    try {
        config = JSON.parse(contents.toString().replace(/\/\/.+/g, ""));
    } catch (err) {
        // Finding a recipe that cannot be parsed is a disaster
        console.log("Error in parsing JSON for " + recipePath);
        process.exit(-1);
    }

    // Determine the glob patterns
    var filesGlob = ["**/*.ts"];
    if (typeof config.filesGlob === "string") {
        filesGlob = [config.filesGlob];
    } else if (Array.isArray(config.filesGlob)) {
        filesGlob = config.filesGlob;
    }

    var resultConfig = {};
    for (var prop in config) {
        resultConfig[prop] = config[prop];
    }
    resultConfig.files = findFiles(recipePath, filesGlob);

    var resultTxt = JSON.stringify(resultConfig, null, "  ");
    // var resultPath = path.join(path.dirname(recipePath), "tsconfig.json");
    var resultPath = recipePath;

    fs.writeFileSync(resultPath, resultTxt);
    //console.log("Updated " + resultPath);
}

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

gulp.task("parseTsconfigFilesGlob", function(done) {
    for(var key in tsconfigFilePathData){
        if(tsconfigFilePathData.hasOwnProperty(key)){
            handleRecipeFile(tsconfigFilePathData[key]);
        }
    }

    done();
});

