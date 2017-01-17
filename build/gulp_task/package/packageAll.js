var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var fs = require("fs-extra");


require("../compile/parseTsconfigFilesGlob");
require("../compile/removeTsconfigFiles");


var tsconfigFilePathData = require("../compile/pathData");

var core_tsconfigFilePath = tsconfigFilePathData.core;

var compileMethods = require("../compile/compileTs");

var combineInnerLib = require("../compile/combineInnerLib").combineInnerLib;

var compress = require("../compress/compress").compress;

var createShaderChunk = require("../createInnerFile/ShaderChunk/create").createShaderChunk;

var addBanner =  require("../compile/addBanner").addBanner;


var browserify = require("../../../lib/inner/Wonder-Package/build/gulp_task/package/browserify").browserify;



var manageExcludeLibData = require("./manageExcludeLibData");
var getExcludeLibData = manageExcludeLibData.getExcludeLibData;
var ExcludeLib = manageExcludeLibData.ExcludeLib;




var distPath = path.join(process.cwd(), "dist");
var wdDefinitionFilePath = path.join(distPath, "wd.all.d.ts"),
    wdFilePath = path.join(distPath, "wd.all.js"),
    wdInnerLibFilePath = path.join(distPath, "wd.all.innerLib.js");




gulp.task("combineExtensionTscConfig", function(done) {
    var tsconfigFilePath_extension = tsconfigFilePathData.extension,
        allTscConfigJson = JSON.parse(fs.readFileSync(core_tsconfigFilePath).toString()),
        extensionTscConfigJson = JSON.parse(fs.readFileSync(tsconfigFilePath_extension).toString());

    allTscConfigJson.filesGlob = allTscConfigJson.filesGlob.concat(extensionTscConfigJson.filesGlob);

    fs.writeFileSync(core_tsconfigFilePath, JSON.stringify(allTscConfigJson));

    done();
});


gulp.task("removeExtensionTscConfig", function(done) {
    var allTscConfigJson = JSON.parse(fs.readFileSync(core_tsconfigFilePath).toString());

    allTscConfigJson.filesGlob = allTscConfigJson.filesGlob.filter(function(filePath){
        return filePath.indexOf("../extension") === -1;
    });

    fs.writeJSONSync(core_tsconfigFilePath, allTscConfigJson);

    done();
});

gulp.task("all_createShaderChunk", function() {
    var glslPathArr = ["src/renderer/shader/chunk/glsl/**/*.glsl", "extension/**/*.glsl"];

    return createShaderChunk(glslPathArr);
});

gulp.task("all_compileDTS", function() {
    return compileMethods.compileDTS(core_tsconfigFilePath, "wd.all.d.ts");
});


gulp.task("all_compileTs", function() {
    return compileMethods.compileTs(core_tsconfigFilePath, "wd.all.js");
});


gulp.task("all_compileTsDebug", function() {
    return compileMethods.compileTsDebug(core_tsconfigFilePath, "wd.all.debug.js");
});

gulp.task("all_compress", function(done) {
    return compress("wd.all.js", done);
});

gulp.task("all_addBanner", function() {
    return addBanner(wdDefinitionFilePath, wdFilePath);
});




gulp.task("all_combineInnerLib", function(done) {
    var data = getExcludeLibData([
            ExcludeLib.CANNON
        ]),
        tsconfigPath = core_tsconfigFilePath;

    return combineInnerLib(data.combineDTsList, data.combineContentList, tsconfigPath, wdDefinitionFilePath, wdFilePath, wdInnerLibFilePath, distPath, done);
});


gulp.task("all_browserify", function() {
    return browserify(wdFilePath, distPath, "wd");
});


gulp.task("packageAll", gulpSync.sync([
    "all_createShaderChunk",
    "combineExtensionTscConfig",
    "parseTsconfigFilesGlob",
    "all_compileDTS",
    "all_compileTs",
    "all_compileTsDebug",
    "changeDistFilePath",
    "all_combineInnerLib",
    "all_browserify",
    "all_compress",
    "all_addBanner",
    "removeTsconfigFiles",
    "removeExtensionTscConfig"
]));


var tsFilePaths = ["src/**/*.ts", "extension/**/*.ts"];
var glslFilePaths = ["src/renderer/shader/chunk/glsl/**/*.glsl", "extension/**/*.glsl"];

gulp.task("watchPackageAll", function(){
    var totalPaths = tsFilePaths.concat(glslFilePaths);

    gulp.watch(totalPaths, gulpSync.sync([
        "all_createShaderChunk",
        "combineExtensionTscConfig",
        "parseTsconfigFilesGlob",
        "all_compileTsDebug",
        "changeDistFilePath",
        "removeTsconfigFiles",
        "removeExtensionTscConfig"
    ]));
});

