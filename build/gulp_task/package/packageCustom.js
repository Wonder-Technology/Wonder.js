var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var fs = require("fs-extra");


require("../compile/parseTsconfigFilesGlob");
require("../compile/removeTsconfigFiles");


var tsconfigFilePathData = require("../compile/pathData");

var custom_tsconfigFilePath = tsconfigFilePathData.custom;


var compileMethods = require("../compile/compileTs");

var combineInnerLib = require("../compile/combineInnerLib").combineInnerLib;

var compress = require("../compress/compress").compress;


var createShaderChunk = require("../createInnerFile/ShaderChunk/create").createShaderChunk;


var addBanner =  require("../compile/addBanner").addBanner;





var getAllFilesGlobs = require("./getAllFilesGlobs").getAllFilesGlobs;


var filterGLSLPaths = require("./manageAllGLSLPaths").filterGLSLPaths;



var commandUtils = require("../common/commandUtils");
var arrayUtils = require("../common/arrayUtils");




var allFilesGlobs = getAllFilesGlobs();



var manageExcludeModuleData = require("./manageExcludeModuleData");
var getExcludeModuleData = manageExcludeModuleData.getExcludeModuleData;
var filterFilesGlob = manageExcludeModuleData.filterFilesGlob;




var manageExcludeLibData = require("./manageExcludeLibData");
var getExcludeLibData = manageExcludeLibData.getExcludeLibData;







var distPath = path.join(process.cwd(), "dist");
var wdDefinitionFilePath = path.join(distPath, "wd.custom.d.ts"),
    wdFilePath = path.join(distPath, "wd.custom.js"),
    wdInnerLibFilePath = path.join(distPath, "wd.custom.innerLib.js"),
    wdebugFilePath = path.join(distPath, "wd.custom.debug.js");




gulp.task("custom_filterFilesGlob", function(done) {
    var customTscConfigJson = JSON.parse(fs.readFileSync(custom_tsconfigFilePath).toString());

    customTscConfigJson.filesGlob = filterFilesGlob(allFilesGlobs, getExcludeModuleData(commandUtils.parseOption("--excludeModules") || ""));

    fs.writeJSONSync(custom_tsconfigFilePath, customTscConfigJson);

    done();
});



gulp.task("custom_createShaderChunk", function() {
    return createShaderChunk(filterGLSLPaths(getExcludeModuleData(commandUtils.parseOption("--excludeModules") || "")));
});


gulp.task("custom_compileDTS", function() {
    return compileMethods.compileDTS(custom_tsconfigFilePath, "wd.custom.d.ts");
});


gulp.task("custom_compileTs", function() {
    return compileMethods.compileTs(custom_tsconfigFilePath, "wd.custom.js");
});


gulp.task("custom_compileTsDebug", function() {
    return compileMethods.compileTsDebug(custom_tsconfigFilePath, "wd.custom.debug.js");
});



gulp.task("custom_compress", function(done) {
    return compress("wd.custom.js", done);
});


gulp.task("custom_addBanner", function() {
    return addBanner(wdDefinitionFilePath, wdFilePath);
});


gulp.task("custom_combineInnerLib", function(done) {
    var excludeLibsStr = commandUtils.parseOption("--excludeLibs") || "",
        data = getExcludeLibData(excludeLibsStr, getExcludeModuleData(commandUtils.parseOption("--excludeModules") || "").removeLibArr),
        tsconfigPath = custom_tsconfigFilePath;

    return combineInnerLib(data.combineDTsList, data.combineContentList, tsconfigPath, wdDefinitionFilePath, wdFilePath, wdInnerLibFilePath, distPath, done);
});

gulp.task("custom_closeContrackTest", function(done){
    [wdFilePath, wdebugFilePath].forEach(function(filePath){
        _closeContrackTest(filePath);
    });

    done();
});







function _closeContrackTest(filePath) {
    if(!fs.existsSync(filePath)){
        return;
    }

    var fileContent = fs.readFileSync(filePath).toString();

    fileContent = fileContent.replace(/isCompileTest\:\s*true/, "isCompileTest: false");
    fileContent = fileContent.replace(/closeContractTest\:\s*false/, "closeContractTest: true");

    fs.writeFileSync(filePath, fileContent);
}



gulp.task("packageCustom", gulpSync.sync([
    "custom_createShaderChunk",
    "custom_filterFilesGlob",
    "parseTsconfigFilesGlob",
    "custom_compileDTS",
    "custom_compileTs",
    "custom_compileTsDebug",
    "changeDistFilePath",
    "custom_combineInnerLib",
    "custom_compress",
    "custom_addBanner",
    "removeTsconfigFiles"
]));


