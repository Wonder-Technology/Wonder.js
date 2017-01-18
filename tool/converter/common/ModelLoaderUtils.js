"use strict";
var wdCb = require("wonder-commonlib");
var path = require("path");
module.exports = (function () {
    function ModelLoaderUtils() {
    }
    ModelLoaderUtils.getPath = function (filePath, mapUrl) {
        return path.join(path.dirname(filePath), mapUrl);
    };
    ModelLoaderUtils.getNameByPath = function (filePath) {
        return wdCb.PathUtils.basename(filePath, wdCb.PathUtils.extname(filePath));
    };
    return ModelLoaderUtils;
}());
