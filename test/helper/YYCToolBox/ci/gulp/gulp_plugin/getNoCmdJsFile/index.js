var through = require("through-gulp"),
    gutil = require("gulp-util"),
    path = require("path"),
    fs = require("fs"),
    mapOperator = require("../lib/resourceMapOperator"),
    fileOperator = require("../lib/fileOperator");

var PLUGIN_NAME = "getNoCmdJsFile";

function getFileContent() {
    var operator = new mapOperator.NoCmdJsOperator();

    return fileOperator.getFile(operator, PLUGIN_NAME);
}


module.exports = getFileContent;

