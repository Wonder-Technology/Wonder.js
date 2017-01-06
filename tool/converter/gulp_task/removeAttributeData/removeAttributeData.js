var gulp = require("gulp");
var Remover = require("../../dist/converter/gulp_task/removeAttributeData/Remover").Remover;


function removeAttributeData(isRemoveNormalData, isRemoveColorData, file){
    var remover = Remover.create();

    return remover.remove(JSON.parse(file.toString()), isRemoveNormalData, isRemoveColorData);
}

module.exports = removeAttributeData;

