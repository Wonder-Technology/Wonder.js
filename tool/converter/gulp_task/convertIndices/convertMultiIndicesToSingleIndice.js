var gulp = require("gulp");
var Converter = require("../../dist/converter/gulp_task/convertIndices/Converter").Converter;


function convertMultiIndicesToSingleIndice(isRemoveNullData, fileJson){
    var converter = Converter.create();

    return converter.convert(fileJson, isRemoveNullData);
}

module.exports = convertMultiIndicesToSingleIndice;
