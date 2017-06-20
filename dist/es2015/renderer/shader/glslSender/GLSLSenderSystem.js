import { addSendAttributeConfig as addSendAttributeConfigUtils, addSendUniformConfig as addSendUniformConfigUtils, getUniformData as getUniformDataUtils, initData as initDataUtils, sendBuffer as sendBufferUtils, sendFloat1 as sendFloat1Utils, sendMatrix4 as sendMatrix4Utils, sendVector3 as sendVector3Utils } from "../../utils/shader/glslSender/glslSenderUtils";
import { getColorArr3, getOpacity } from "../../../component/material/MaterialSystem";
import { getUniformLocation, isUniformLocationNotExist } from "../location/LocationSystem";
export var getUniformData = function (field, from, renderCommandUniformData, MaterialData) {
    return getUniformDataUtils(field, from, getColorArr3, getOpacity, renderCommandUniformData, MaterialData);
};
export var sendBuffer = sendBufferUtils;
export var sendMatrix4 = function (gl, name, data, uniformLocationMap) {
    sendMatrix4Utils(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendVector3 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    sendVector3Utils(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var sendFloat1 = function (gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap) {
    sendFloat1Utils(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};
export var addSendAttributeConfig = addSendAttributeConfigUtils;
export var addSendUniformConfig = addSendUniformConfigUtils;
export var initData = initDataUtils;
//# sourceMappingURL=GLSLSenderSystem.js.map