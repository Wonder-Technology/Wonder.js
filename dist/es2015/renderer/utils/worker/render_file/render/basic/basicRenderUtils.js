import { directlySendUniformData } from "../renderUtils";
import { Log } from "../../../../../../utils/Log";
export var sendUniformData = function (gl, materialIndex, shaderIndex, program, drawDataMap, renderCommandUniformData, sendDataMap, uniformLocationMap, uniformCacheMap, materialData, basicMaterialData) {
    _sendUniformData(gl, materialIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, basicMaterialData);
    _sendUniformFuncData(gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap);
};
var _sendUniformData = function (gl, materialIndex, shaderIndex, program, glslSenderData, uniformLocationMap, uniformCacheMap, renderCommandUniformData, materialData, basicMaterialData) {
    var sendUniformDataArr = glslSenderData.GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformDataArr.length; i < len; i++) {
        var sendData = sendUniformDataArr[i], name_1 = sendData.name, field = sendData.field, type = sendData.type, from = sendData.from || "cmd", data = _getUniformData(materialIndex, field, from, renderCommandUniformData, materialData, basicMaterialData);
        directlySendUniformData(gl, name_1, shaderIndex, program, type, data, glslSenderData, uniformLocationMap, uniformCacheMap);
    }
};
var _sendUniformFuncData = function (gl, shaderIndex, program, sendDataMap, drawDataMap, uniformLocationMap, uniformCacheMap) {
    var sendUniformFuncDataArr = drawDataMap.GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex];
    for (var i = 0, len = sendUniformFuncDataArr.length; i < len; i++) {
        var sendFunc = sendUniformFuncDataArr[i];
        sendFunc(gl, shaderIndex, program, sendDataMap, uniformLocationMap, uniformCacheMap);
    }
};
var _getUniformData = function (materialIndex, field, from, renderCommandUniformData, materialData, basicMaterialData) {
    var data = null;
    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "basicMaterial":
            data = _getUnifromDataFromBasicMaterial(field, materialIndex, materialData, basicMaterialData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW("from:" + from));
            break;
    }
    return data;
};
var _getUnifromDataFromBasicMaterial = function (field, index, _a, _b) {
    var getColorArr3 = _a.getColorArr3, getOpacity = _a.getOpacity, MaterialDataFromSystem = _a.MaterialDataFromSystem;
    var BasicMaterialDataFromSystem = _b.BasicMaterialDataFromSystem;
    var data = null;
    switch (field) {
        case "color":
            data = getColorArr3(index, MaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, MaterialDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW("field:" + field));
            break;
    }
    return data;
};
export var buildSendUniformDataDataMap = function (sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3, drawDataMap) {
    return {
        glslSenderData: {
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,
            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        }
    };
};
export var buildMaterialDataForGetUniformData = function (getColorArr3, getOpacity, MaterialDataFromSystem) {
    return {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        MaterialDataFromSystem: MaterialDataFromSystem
    };
};
export var buildBasicMaterialDataForGetUniformData = function (BasicMaterialDataFromSystem) {
    return {
        BasicMaterialDataFromSystem: BasicMaterialDataFromSystem
    };
};
//# sourceMappingURL=basicRenderUtils.js.map