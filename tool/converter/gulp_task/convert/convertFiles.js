var gulp = require("gulp");
var gs = require("glob-stream");
var fs = require("fs-extra");
var wdFrp = require("wdfrp");
var path = require("path");

var Converter = require("../../dist/converter/Converter");


function convertFiles(sourceDir, destDir) {
    var converter = Converter.create();

    return wdFrp.fromNodeCallback(fs.remove)(destDir)
        .ignoreElements()
        .concat(
            wdFrp.fromStream(gs.create([path.join(sourceDir, "**")], {nodir: true}))
                .concatMap(function (data) {
                    return wdFrp.fromNodeCallback(fs.readFile)(data.path)
                        .concatMap(function (fileBuffer) {
                            var filePath = data.path;

                            return converter.write(converter.convert(fileBuffer, filePath, sourceDir, destDir), sourceDir, destDir, filePath)
                        })
                })
        );
}

module.exports = convertFiles;
