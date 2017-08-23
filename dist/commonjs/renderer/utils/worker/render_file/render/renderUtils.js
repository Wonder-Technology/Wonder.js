"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EVariableType_1 = require("../../../../enum/EVariableType");
var Log_1 = require("../../../../../utils/Log");
exports.directlySendUniformData = function (gl, name, shaderIndex, program, type, data, _a, uniformLocationMap, uniformCacheMap) {
    var sendMatrix3 = _a.sendMatrix3, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendInt = _a.sendInt, sendFloat1 = _a.sendFloat1, sendFloat3 = _a.sendFloat3;
    switch (type) {
        case EVariableType_1.EVariableType.MAT3:
            sendMatrix3(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.MAT4:
            sendMatrix4(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.VEC3:
            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.INT:
        case EVariableType_1.EVariableType.SAMPLER_2D:
            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.FLOAT:
            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType_1.EVariableType.FLOAT3:
            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        default:
            Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("EVariableType:", type));
            break;
    }
};
//# sourceMappingURL=renderUtils.js.map