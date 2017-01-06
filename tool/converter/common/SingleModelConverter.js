"use strict";
var SingleModelConverter = (function () {
    function SingleModelConverter(version) {
        this.version = null;
        this.version = version;
    }
    SingleModelConverter.prototype.convertSceneData = function (resultJson, nodeName) {
        resultJson.scene = "Scene";
        resultJson.scenes = {
            Scene: {
                nodes: [nodeName]
            }
        };
    };
    SingleModelConverter.prototype.convertAssetData = function () {
        var result = {};
        result.version = this.version;
        result.generator = this.name;
        return result;
    };
    return SingleModelConverter;
}());
exports.SingleModelConverter = SingleModelConverter;
