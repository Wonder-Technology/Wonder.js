import { forEach, hasDuplicateItems } from "../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../renderConfigUtils";
import {
    ISendAttributeConfig, ISendUniformConfig,
    IShaderLibContentGenerator
} from "../../../data/shaderLib_generator";
import { MaterialShaderLibConfig } from "../../../data/material_config";
import { ensureFunc, it, requireCheckFunc } from "../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, isNotValidMapValue } from "../../../../utils/objectUtils";
import { RenderCommandUniformData, UniformShaderLocationMap, SendAttributeConfigMap, SendUniformConfigMap, UniformCacheMap } from "../../../type/dataType";
import { Log } from "../../../../utils/Log";
import { BasicMaterialForGetUniformDataDataMap, LightMaterialForGetUniformDataDataMap } from "../../../type/utilsType";

//todo test send normalMatrix,cameraPos,light data, a_normal...
export var getUniformData = (field: string, from: string, renderCommandUniformData: RenderCommandUniformData, basicMaterialData:BasicMaterialForGetUniformDataDataMap, lightMaterialData:LightMaterialForGetUniformDataDataMap) => {
    var data: any = null;

    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "basicMaterial":
            data = _getUnifromDataFromBasicMaterial(field, renderCommandUniformData.materialIndex, basicMaterialData);
            break;
        case "lightMaterial":
            data = _getUnifromDataFromLightMaterial(field, renderCommandUniformData.materialIndex, lightMaterialData);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`from:${from}`));
            break;
    }

    return data;
}

var _getUnifromDataFromBasicMaterial = (field: string, index: number, {
    getColorArr3,
    getOpacity,
    BasicMaterialDataFromSystem
}) => {
    var data: any = null;

    switch (field) {
        case "color":
            data = getColorArr3(index, BasicMaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, BasicMaterialDataFromSystem);
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`field:${field}`));
            break;
    }

    return data;
}

var _getUnifromDataFromLightMaterial = (field: string, index: number, {
    getColorArr3,
    getEmissionColorArr3,
    getOpacity,
    getSpecularColorArr3,
    getShininess,
    getLightModel,
    LightMaterialDataFromSystem
}) => {
    var data: any = null;

    switch (field) {
        case "color":
            data = getColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "emissionColor":
            data = getEmissionColorArr3(index, LightMaterialDataFromSystem);
            break;
        case "opacity":
            data = getOpacity(index, LightMaterialDataFromSystem);
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
            Log.error(true, Log.info.FUNC_UNKNOW(`field:${field}`));
            break;
    }

    return data;
}

export var sendBuffer = (gl: WebGLRenderingContext, pos: number, buffer: WebGLBuffer, geometryIndex: number, GLSLSenderDataFromSystem: any, ArrayBufferData: any) => {
    var {
            size,
        type
        } = ArrayBufferData.bufferDataMap[geometryIndex],
        vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);

    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);

        vertexAttribHistory[pos] = true;
    }
}

export var sendMatrix4 = (gl: WebGLRenderingContext, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    _sendUniformData<Float32Array>(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniformMatrix4fv(pos, false, data);
    })
}

export var sendVector3 = (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: Array<number>, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap),
        x = data[0],
        y = data[1],
        z = data[2];

    if (recordedData && recordedData[0] == x && recordedData[1] == y && recordedData[2] == z) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<Array<number>>(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniform3f(pos, x, y, z);
    })
}

export var sendFloat1 = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    it("data should be number", () => {
        expect(data).be.a("number");
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData === data) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<number>(gl, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniform1f(pos, data);
    })
})

var _getUniformCache = (shaderIndex: number, name: string, uniformCacheMap: UniformCacheMap) => {
    var cache = uniformCacheMap[shaderIndex];

    if (_isCacheNotExist(cache)) {
        cache = {};
        uniformCacheMap[shaderIndex] = cache;

        return null;
    }

    return cache[name];
}

var _isCacheNotExist = (cache: any) => isNotValidMapValue(cache);

var _setUniformCache = (shaderIndex: number, name: string, data: any, uniformCacheMap: UniformCacheMap) => {
    uniformCacheMap[shaderIndex][name] = data;
}

var _sendUniformData = <T>(gl: WebGLRenderingContext, name: string, data: T, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function, send: (pos: WebGLUniformLocation, data: T) => void) => {
    var pos = getUniformLocation(name, uniformLocationMap);

    if (isUniformLocationNotExist(pos)) {
        return;
    }

    send(pos, data);
}

export var addSendAttributeConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", () => {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendAttributeConfigMap: SendAttributeConfigMap) => {
    var sendDataArr: Array<ISendAttributeConfig> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    })

    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}))

export var addSendUniformConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    it("sendUniformConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    it("sendUniformConfigMap[shaderIndex] should not be defined", () => {
        expect(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, GLSLSenderDataFromSystem: any) => {
    var sendUniformDataArr: Array<ISendUniformConfig> = [],
        sendUniformFuncDataArr: Array<Function> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData)){
            if(isConfigDataExist(sendData.uniform)){
                sendUniformDataArr = sendUniformDataArr.concat(sendData.uniform);
            }

            if(isConfigDataExist(sendData.uniformFunc)){
                sendUniformFuncDataArr = sendUniformFuncDataArr.concat(sendData.uniformFunc);
            }
        }
    });

    GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex] = sendUniformDataArr;
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex] = sendUniformDataArr;
}))

export var initData = (GLSLSenderDataFromSystem: any) => {
    GLSLSenderDataFromSystem.sendAttributeConfigMap = createMap();
    GLSLSenderDataFromSystem.sendUniformConfigMap = createMap();
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
    GLSLSenderDataFromSystem.uniformCacheMap = createMap();
}
