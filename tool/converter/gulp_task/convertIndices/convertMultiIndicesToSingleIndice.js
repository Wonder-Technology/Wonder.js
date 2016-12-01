var gulp = require("gulp");
var Converter = require("../../dist/converter/gulp_task/convertIndices/Converter").Converter;


function convertMultiIndicesToSingleIndice(isRemoveNullData, file){
    var converter = Converter.create();

    return converter.convert(JSON.parse(file.toString()), isRemoveNullData);
}

module.exports = convertMultiIndicesToSingleIndice;
