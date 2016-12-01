var gulp = require("gulp");
var wdFrp = require("wdfrp");
var fs = require("fs-extra");

var convertFiles = require("./gulp_task/convert/convertFiles");

var convertMultiIndicesToSingleIndice = require("./gulp_task/convertIndices/convertMultiIndicesToSingleIndice");

var filterPrimitiveDataByIndices = require("./gulp_task/filterPrimitiveData/filterPrimitiveDataByIndices");

var compressToBinary = require("./gulp_task/compressToBinary/compressToBinary");



var commandUtils = require("./gulp_task/common/commandUtils");

require("../gulp_task/common");


gulp.task("convert", function (done) {
    //todo support combine multi wd files to one file(according to command line param)
    var sourceDir = commandUtils.parseOption("--sourceDir") || "./source/",
        destDir = commandUtils.parseOption("--destDir") || "./dest/",
        isRemoveNullData = commandUtils.isDefinOption("--removeNullData") || false;


    return convertFiles(sourceDir, destDir)
        .flatMap(function(relativeDestWDFilePath){
            return wdFrp.fromNodeCallback(fs.readFile)(relativeDestWDFilePath)
                .map(function(fileBuffer){
                    return [fileBuffer, relativeDestWDFilePath];
                })
        })
        .filter(function(data){
            return !_isConvertedFromGLTF(data[0]);
        })
        .map(function(data){
            return [convertMultiIndicesToSingleIndice(isRemoveNullData, data[0]), data[1]];
        })
        .map(function(data){
            return [filterPrimitiveDataByIndices(isRemoveNullData, data[0]), data[1]];
        })
        .map(function(data){
            return [compressToBinary(data[0], data[1]), data[1]];
        })
        .map(function(data){
            fs.writeFileSync(data[1], JSON.stringify(data[0]));
        })
        .subscribe(function (dataArr) {
        }, function (e) {
            console.log("error:", e);
            done();
        }, function () {
            console.log("completed");
            done();
        });
});

function _isConvertedFromGLTF(fileBuffer){
    var json = JSON.parse(fileBuffer.toString());

    if(json.asset
        && json.asset.generator){
        return json.asset.generator.indexOf("GLTF") > -1;
    }

    return false;
}
