/// <reference path="../../node_modules/dycb/dist/dyCb.node.d.ts"/>
var dyCb = require("dycb");
var path = require("path");
module.exports = (function () {
    function ModelLoaderUtils() {
    }
    ModelLoaderUtils.getPath = function (filePath, mapUrl) {
        return path.join(path.dirname(filePath), mapUrl);
    };
    ModelLoaderUtils.getNameByPath = function (filePath) {
        return dyCb.PathUtils.basename(filePath, dyCb.PathUtils.extname(filePath));
    };
    return ModelLoaderUtils;
})();
