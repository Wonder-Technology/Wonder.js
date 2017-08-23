"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderUtils_1 = require("../renderUtils");
var Log_1 = require("../../../../../../utils/Log");
exports.sendUniformData = function (gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, materialData, lightMaterialData) {
    _sendUniformData(gl, materialIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, lightMaterialData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
};
var _sendUniformData = function (gl, materialIndex, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, lightMaterialData) {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformDataArr.length; i < len; i++) {
        var sendData = sendUniformDataArr[i], name_1 = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = _getUniformData(materialIndex, field, from, renderCommandUniformData, materialData, lightMaterialData);
        renderUtils_1.directlySendUniformData(gl, name_1, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
};
var _sendUniformFuncData = function (gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap) {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        var sendFunc = sendUniformFuncDataArr[i];
        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
};
var _getUniformData = function (materialIndex, field, from, renderCommandUniformData, materialData, lightMaterialData) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "lightMaterial":
            data = _getUnifromDataFromLightMaterial(field, materialIndex, materialData, lightMaterialData);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_UNKNOW("from:" + from));
            break;
    }
    return data;
};
var _getUnifromDataFromLightMaterial = function (field, index, _a, _b) {
    var getColorArr3 = _a.getColorArr3, getOpacity = _a.getOpacity, MaterialDataFromSystem = _a.MaterialDataFromSystem;
    var getEmissionColorArr3 = _b.getEmissionColorArr3, getSpecularColorArr3 = _b.getSpecularColorArr3, getShininess = _b.getShininess, getLightModel = _b.getLightModel, LightMaterialDataFromSystem = _b.LightMaterialDataFromSystem;
    var data = null;
    switch (field) {
        case "color":
            data = getColorArr3(index, MaterialDataFromSystem);
            break;
        case "emissionColor":
            data = getEmissionColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, MaterialDataFromSystem);
            break;
        case "specularColor":
            data = getSpecularColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "shininess":
            data = getShininess(index, LightMaterialDataFromSystem);
            break;
        case "lightModel":
            data = getLightModel(index, LightMaterialDataFromSystem);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_UNKNOW("field:" + field));
            break;
    }
    return data;
};
exports.buildMaterialDataForGetUniformData = function (getColorArr3, getOpacity, MaterialDataFromSystem) {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    };
};
exports.buildLightMaterialDataForGetUniformData = function (getEmissionColorArr3, getSpecularColorArr3, getLightModel, getShininess, LightMaterialDataFromSystem) {
    return {
        getEmissionColorArr3: getEmissionColorArr3,
        getSpecularColorArr3: getSpecularColorArr3,
        getLightModel: getLightModel,
        getShininess: getShininess,
        LightMaterialDataFromSystem: LightMaterialDataFromSystem
    };
};
//# sourceMappingURL=lightRenderUtils.js.map