"use strict";
var GLTFLightUtils = (function () {
    function GLTFLightUtils() {
    }
    GLTFLightUtils.convertLights = function (resultJson) {
        if (this._isExtensionExist(resultJson, "lights")) {
            resultJson.lights = this._getExtensionData(resultJson, "lights");
            this._convertLightRange(resultJson.lights);
            if (resultJson.nodes) {
                for (var name_1 in resultJson.nodes) {
                    if (resultJson.nodes.hasOwnProperty(name_1)) {
                        var node = resultJson.nodes[name_1];
                        if (this._isExtensionExist(node, "light")) {
                            node.light = this._getExtensionData(node, "light");
                        }
                    }
                }
            }
        }
    };
    GLTFLightUtils._convertLightRange = function (lights) {
        for (var name_2 in lights) {
            if (lights.hasOwnProperty(name_2)) {
                var light = lights[name_2];
                if (light.type === "point") {
                    var pointLightData = light.point;
                    if (pointLightData.distance !== void 0) {
                        if (pointLightData.distance !== 0) {
                            pointLightData.range = pointLightData.distance;
                        }
                        delete pointLightData.distance;
                    }
                }
            }
        }
    };
    GLTFLightUtils._isExtensionExist = function (json, target) {
        return json.extensions
            && json.extensions.KHR_materials_common
            && json.extensions.KHR_materials_common[target];
    };
    GLTFLightUtils._getExtensionData = function (json, target) {
        return json.extensions.KHR_materials_common[target];
    };
    return GLTFLightUtils;
}());
exports.GLTFLightUtils = GLTFLightUtils;
