var gulp = require("gulp");
var wdFrp = require("wdfrp");
var fs = require("fs-extra");

gulp.task("convert", function (done) {
    var convertFiles = require("./convertFiles");

    var convertMultiIndicesToSingleIndice = require("../convertIndices/convertMultiIndicesToSingleIndice");

    var filterPrimitiveDataByIndices = require("../filterPrimitiveData/filterPrimitiveDataByIndices");

    var compressToBinary = require("../compressToBinary/compressToBinary");



    var commandUtils = require("../common/commandUtils");



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

