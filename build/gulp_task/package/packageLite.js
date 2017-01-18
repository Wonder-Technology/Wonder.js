var gulp = require("gulp");
var gulpSync = require("gulp-sync")(gulp);
var path = require("path");
var fs = require("fs-extra");










require("../compile/parseTsconfigFilesGlob");
require("../compile/removeTsconfigFiles");


var tsconfigFilePathData = require("../compile/pathData");

var lite_tsconfigFilePath = tsconfigFilePathData.lite;

var compileMethods = require("../compile/compileTs");

var combineInnerLib = require("../compile/combineInnerLib").combineInnerLib;

var compress = require("../compress/compress").compress;


var createShaderChunk = require("../createInnerFile/ShaderChunk/create").createShaderChunk;


var addBanner =  require("../compile/addBanner").addBanner;



var wonderPackage = require("wonder-package");

var browserify = wonderPackage.browserify;



var manageExcludeLibData = require("./manageExcludeLibData");
var getExcludeLibData = manageExcludeLibData.getExcludeLibData;
var ExcludeLib = manageExcludeLibData.ExcludeLib;



var manageExcludeModuleData = require("./manageExcludeModuleData");
var getExcludeModuleData = manageExcludeModuleData.getExcludeModuleData;
var filterFilesGlob = manageExcludeModuleData.filterFilesGlob;
var ExcludeModule = manageExcludeModuleData.ExcludeModule;



var filterGLSLPaths = require("./manageAllGLSLPaths").filterGLSLPaths;





var distPath = path.join(process.cwd(), "dist");
var wdDefinitionFilePath = path.join(distPath, "wd.lite.d.ts"),
    wdFilePath = path.join(distPath, "wd.lite.js"),
    wdInnerLibFilePath = path.join(distPath, "wd.lite.innerLib.js"),
    wdebugFilePath = path.join(distPath, "wd.lite.debug.js");



var EXCLUDE_MODULE_ARR = [
    ExcludeModule.ACTION,
    ExcludeModule.BILLBOARD,
    ExcludeModule.LOD,
    ExcludeModule.PHYSICS,
    ExcludeModule.SPACE_PARTITION,
    ExcludeModule.UI,
    ExcludeModule.ANIMATION,
    ExcludeModule.SOUND,
    ExcludeModule.VIDEO,
    ExcludeModule.DEBUG,


    ExcludeModule.EXTENSION_MATERIAL_BITMAPFONT,
    ExcludeModule.EXTENSION_MATERIAL_GRASS,
    ExcludeModule.EXTENSION_MATERIAL_MIRROR,
    ExcludeModule.EXTENSION_MATERIAL_TERRAIN,
    ExcludeModule.EXTENSION_MATERIAL_WATER,

    ExcludeModule.EXTENSION_PROCEDURALTEXTURE,



    ExcludeModule.SHADOW
];





gulp.task("lite_addRelatedFilesGlobFromAllTscConfig", function(done) {
    var core_tsconfigFilePath = tsconfigFilePathData.core,
        coreTscConfigJson = JSON.parse(fs.readFileSync(core_tsconfigFilePath).toString()),
        liteTscConfigJson = JSON.parse(fs.readFileSync(lite_tsconfigFilePath).toString());

    liteTscConfigJson.filesGlob = filterFilesGlob(coreTscConfigJson.filesGlob, getExcludeModuleData(EXCLUDE_MODULE_ARR));

    fs.writeJSONSync(lite_tsconfigFilePath, liteTscConfigJson);

    done();
});


gulp.task("lite_removeRelatedFilesGlobFromAllTscConfig", function(done) {
    var liteTscConfigJson = JSON.parse(fs.readFileSync(lite_tsconfigFilePath).toString());

    delete liteTscConfigJson.filesGlob;

    fs.writeJSONSync(lite_tsconfigFilePath, liteTscConfigJson);

    done();
});


gulp.task("lite_createShaderChunk", function() {
    var glslPathArr = filterGLSLPaths(getExcludeModuleData(EXCLUDE_MODULE_ARR));

    return createShaderChunk(glslPathArr);
});


gulp.task("lite_compileDTS", function() {
    return compileMethods.compileDTS(lite_tsconfigFilePath, "wd.lite.d.ts");
});


gulp.task("lite_compileTs", function() {
    return compileMethods.compileTs(lite_tsconfigFilePath, "wd.lite.js");
});


gulp.task("lite_compileTsDebug", function() {
    return compileMethods.compileTsDebug(lite_tsconfigFilePath, "wd.lite.debug.js");
});



gulp.task("lite_compress", function(done) {
    return compress("wd.lite.js", done);
});

gulp.task("lite_addBanner", function() {
    return addBanner(wdDefinitionFilePath, wdFilePath);
});

gulp.task("lite_combineInnerLib", function(done) {
    var data = getExcludeLibData([
            ExcludeLib.CANNON,
            ExcludeLib.RSVP,
            ExcludeLib.CHAI
        ], getExcludeModuleData(EXCLUDE_MODULE_ARR).removeLibArr),
        tsconfigPath = lite_tsconfigFilePath;

    return combineInnerLib(data.combineDTsList, data.combineContentList, tsconfigPath, wdDefinitionFilePath, wdFilePath, wdInnerLibFilePath, distPath, done);
});

gulp.task("lite_closeContrackTest", function(done){
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


gulp.task("lite_browserify", function() {
    return browserify(wdFilePath, distPath, "wd");
});


gulp.task("packageLite", gulpSync.sync([
    "lite_createShaderChunk",
    "lite_addRelatedFilesGlobFromAllTscConfig",
    "parseTsconfigFilesGlob",
    "lite_compileDTS",
    "lite_compileTs",
    "lite_compileTsDebug",
    "changeDistFilePath",
    "lite_combineInnerLib",
    "lite_browserify",
    "lite_compress",
    "lite_addBanner",
    "removeTsconfigFiles",
    "lite_removeRelatedFilesGlobFromAllTscConfig",
    "lite_closeContrackTest"
]));




var tsFilePaths = ["src/**/*.ts"];
var glslFilePaths = ["src/renderer/shader/chunk/glsl/**/*.glsl"];

gulp.task("watchPackageLite", function(){
    var totalPaths = tsFilePaths.concat(glslFilePaths);

    gulp.watch(totalPaths, gulpSync.sync([
        "lite_createShaderChunk",
        "lite_addRelatedFilesGlobFromAllTscConfig",
        "parseTsconfigFilesGlob",
        "lite_compileTsDebug",
        "changeDistFilePath",
        "removeTsconfigFiles",
        "lite_removeRelatedFilesGlobFromAllTscConfig",
        "lite_closeContrackTest"
    ]));
});
