var gulp = require("gulp");
var wdFrp = require("wdfrp");
var fs = require("fs-extra");
var path = require("path");

gulp.task("convert", function (done) {
    var convertFiles = require("./convertFiles");

    var convertMultiIndicesToSingleIndice = require("../convertIndices/convertMultiIndicesToSingleIndice");

    var filterPrimitiveDataByIndices = require("../filterPrimitiveData/filterPrimitiveDataByIndices");

    var compressToBinary = require("../compressToBinary/compressToBinary");

    var removeAttributeData = require("../removeAttributeData/removeAttributeData");

    var commandUtils = require("../../../../build/gulp_task/common/commandUtils");

    var Converter = require("../../dist/converter/Converter");


    var Log = require("../../../ts/Log");


    var sourceDir = commandUtils.parseOption("--sourceDir") || "./source/",
        destDir = commandUtils.parseOption("--destDir") || "./dest/",
        isRemoveNullData = commandUtils.isDefinOption("--removeNullData") || true,
        isRemoveNormalData = commandUtils.isDefinOption("--removeNormalData") || false,
        isRemoveColorData = commandUtils.isDefinOption("--removeColorData") || false,
        isEmbedded = commandUtils.isDefinOption("--isEmbedded") || false;
    var converter = Converter.create();

    return convertFiles(isEmbedded, sourceDir, destDir)
        .flatMap(function(relativeDestWDFilePath){
            return wdFrp.fromNodeCallback(fs.readFile)(relativeDestWDFilePath)
                .map(function(fileBuffer){
                    return [fileBuffer, relativeDestWDFilePath];
                })
        })
        .filter(function(data){
            if(_isConvertedFromGLTF(data[0])){
                if(isEmbedded){
                    Log.warn("GLTF should use the embedded version");
                }

                return false;
            }

            return true;
        })
        .map(function(data){
            console.log("remove attribute data");
            return [removeAttributeData(isRemoveNormalData, isRemoveColorData, data[0]), data[1]];
        })
        .map(function(data){
            console.log("begin convertMultiIndicesToSingleIndice...");
            return [convertMultiIndicesToSingleIndice(isRemoveNullData, data[0]), data[1]];
        })
        .map(function(data){
            console.log("begin filterPrimitiveDataByIndices...");
            return [filterPrimitiveDataByIndices(isRemoveNullData, data[0]), data[1]];
        })
        .map(function(data){
            console.log("begin compressToBinary...");
            return [compressToBinary(isEmbedded, _getAbsoluteDir(sourceDir), data[0], data[1]), data[1]];
        })
        .map(function(data){
            console.log("write data to file");
            fs.writeFileSync(data[1], JSON.stringify(data[0]));
        })
        .subscribe(function (dataArr) {
        }, function (e) {
            console.log("error:", e.stack);
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

function _getAbsoluteDir(dirPath) {
    return path.join(__dirname, "../../", dirPath);
}

