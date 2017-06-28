import {
    addSendAttributeConfig as addSendAttributeConfigUtils, addSendUniformConfig as addSendUniformConfigUtils,
    getUniformData as getUniformDataUtils, initData as initDataUtils, sendBuffer as sendBufferUtils, sendFloat1 as sendFloat1Utils, sendMatrix4 as sendMatrix4Utils,
    sendVector3 as sendVector3Utils
} from "../../utils/shader/glslSender/glslSenderUtils";
import { RenderCommandUniformData, UniformCacheMap, UniformShaderLocationMap } from "../../type/dataType";
import { getColorArr3, getOpacity } from "../../../component/material/MaterialSystem";
import { getUniformLocation, isUniformLocationNotExist } from "../location/LocationSystem";

export var getUniformData = (field: string, from: string, renderCommandUniformData: RenderCommandUniformData, BasicMaterialData: any) => {
    // return getUniformDataUtils(field, from, getColorArr3, getOpacity, renderCommandUniformData, BasicMaterialData);
    return getUniformDataUtils(field, from, renderCommandUniformData, {
        getColorArr3: getColorArr3,
        getOpacity: getOpacity,
        BasicMaterialDataFromSystem: BasicMaterialData
    });
};

export var sendBuffer = sendBufferUtils;

export var sendMatrix4 = (gl: WebGLRenderingContext, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => {
    sendMatrix4Utils(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendVector3 = (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: Array<number>, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendVector3Utils(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var sendFloat1 = (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    sendFloat1Utils(gl, shaderIndex, name, data, uniformCacheMap, uniformLocationMap, getUniformLocation, isUniformLocationNotExist);
};

export var addSendAttributeConfig = addSendAttributeConfigUtils;

export var addSendUniformConfig = addSendUniformConfigUtils;

export var initData = initDataUtils;
