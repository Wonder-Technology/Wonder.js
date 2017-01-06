"use strict";
var path = require("path");
module.exports = (function () {
    function PathUtils() {
    }
    PathUtils.getAbsoluteResourceUrl = function (filePath, resourceRelativeUrl) {
        return path.resolve(path.dirname(filePath), resourceRelativeUrl);
    };
    return PathUtils;
}());
