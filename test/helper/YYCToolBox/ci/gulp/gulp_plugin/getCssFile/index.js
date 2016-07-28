var through = require("through-gulp"),
    path = require("path"),
    fs = require("fs"),
    mapOperator = require("../lib/resourceMapOperator"),
    fileOperator = require("../lib/fileOperator");

var PLUGIN_NAME = "getCssFile";

function getFileContent() {
    var operator = new mapOperator.CssOperator();

    return fileOperator.getFile(operator, PLUGIN_NAME);
}


module.exports = getFileContent;

