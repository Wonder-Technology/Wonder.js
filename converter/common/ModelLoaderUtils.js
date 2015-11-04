var path = require("path");
module.exports = (function () {
    function ModelLoaderUtils() {
    }
    ModelLoaderUtils.getPath = function (filePath, mapUrl) {
        return path.dirname(filePath) + "/" + mapUrl;
    };
    return ModelLoaderUtils;
})();
