import { EVariableType } from "../../../../enum/EVariableType";
import { Log } from "../../../../../utils/Log";
export var directlySendUniformData = function (gl, name, shaderIndex, program, type, data, _a, uniformLocationMap, uniformCacheMap) {
    var sendMatrix3 = _a.sendMatrix3, sendMatrix4 = _a.sendMatrix4, sendVector3 = _a.sendVector3, sendInt = _a.sendInt, sendFloat1 = _a.sendFloat1, sendFloat3 = _a.sendFloat3;
    switch (type) {
        case EVariableType.MAT3:
            sendMatrix3(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.MAT4:
            sendMatrix4(gl, program, name, data, uniformLocationMap);
            break;
        case EVariableType.VEC3:
            sendVector3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.INT:
        case EVariableType.SAMPLER_2D:
            sendInt(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT:
            sendFloat1(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        case EVariableType.FLOAT3:
            sendFloat3(gl, shaderIndex, program, name, data, uniformCacheMap, uniformLocationMap);
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID("EVariableType:", type));
            break;
    }
};
//# sourceMappingURL=renderUtils.js.map