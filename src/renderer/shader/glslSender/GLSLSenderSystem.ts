import {
    SendAttributeConfigMap, SendUniformConfigMap, UniformCacheMap
} from "./GLSLSenderData";
import { forEach, hasDuplicateItems } from "../../../utils/arrayUtils";
import { getColor, getOpacity } from "../../../component/material/MaterialSystem";
import { Vector3 } from "../../../math/Vector3";
import { isConfigDataExist } from "../../utils/renderConfigUtils";
import { error } from "../../../utils/Log";
import { Matrix4 } from "../../../math/Matrix4";
import {
    getUniformLocation, isUniformLocationNotExist
} from "../location/LocationSystem";
import {
    ISendAttributeConfig, ISendUniformConfig,
    IShaderLibContentGenerator
} from "../../data/shaderLib_generator";
import { MaterialShaderLibConfig } from "../../data/material_config";
import { RenderCommand } from "../../command/RenderCommand";
import { ensureFunc, it, requireCheckFunc } from "../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, isNotValidMapValue } from "../../../utils/objectUtils";
import { UniformShaderLocationMap } from "../location/LocationData";
import { RenderCommandUniformData } from "../../command/RenderCommandBufferData";

export var getUniformData = (field: string, from: string, renderCommandUniformData: RenderCommandUniformData, MaterialData: any) => {
    var data: any = null;

    switch (from) {
        case "cmd":
            data = renderCommandUniformData[field];
            break;
        case "material":
            data = _getUnifromDataFromMaterial(field, renderCommandUniformData.materialIndex, MaterialData);
            break;
        default:
            error(true, `unknow from:${from}`);
            break;
    }

    return data;
}

var _getUnifromDataFromMaterial = (field: string, materialIndex: number, MaterialData: any) => {
    var data: any = null;

    switch (field) {
        case "color":
            data = getColor(materialIndex, MaterialData).toVector3();
            break;
        case "opacity":
            data = getOpacity(materialIndex, MaterialData);
            break;
        default:
            error(true, `unknow field:${field}`);
            break;
    }

    return data;
}

export var sendBuffer = (gl: WebGLRenderingContext, pos: number, buffer: WebGLBuffer, geometryIndex: number, GLSLSenderData: any, ArrayBufferData: any) => {
    var {
            size,
        type
        } = ArrayBufferData.bufferDataMap[geometryIndex],
        vertexAttribHistory = GLSLSenderData.vertexAttribHistory;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, size, gl[type], false, 0, 0);

    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);

        vertexAttribHistory[pos] = true;
    }
}

export var sendMatrix4 = (gl: WebGLRenderingContext, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap) => {
    _sendUniformData<Float32Array>(gl, name, data, uniformLocationMap, (pos, data) => {
        gl.uniformMatrix4fv(pos, false, data);
    })
}

export var sendVector3 = (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: Vector3, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    var recordedData: any = getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData && recordedData.x == data.x && recordedData.y == data.y && recordedData.z == data.z) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<Vector3>(gl, name, data, uniformLocationMap, (pos, data) => {
        gl.uniform3f(pos, data.x, data.y, data.z);
    })
}

export var sendFloat1 = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    it("data should be number", () => {
        expect(data).be.a("number");
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap) => {
    var recordedData: any = getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData === data) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<number>(gl, name, data, uniformLocationMap, (pos, data) => {
        gl.uniform1f(pos, data);
    })
})

var getUniformCache = (shaderIndex: number, name: string, uniformCacheMap: UniformCacheMap) => {
    var cache = uniformCacheMap[shaderIndex];

    if(_isCacheNotExist(cache)){
        cache = {};
        uniformCacheMap[shaderIndex] = cache;

        return null;
    }

    return cache[name];
}

var _isCacheNotExist = (cache:any) => isNotValidMapValue(cache);

var _setUniformCache = (shaderIndex: number, name: string, data: any, uniformCacheMap: UniformCacheMap) => {
    uniformCacheMap[shaderIndex][name] = data;
}

var _sendUniformData = <T>(gl: WebGLRenderingContext, name: string, data: T, uniformLocationMap: UniformShaderLocationMap, sendFunc: (pos: WebGLUniformLocation, data: T) => void) => {
    var pos = getUniformLocation(name, uniformLocationMap);

    if (isUniformLocationNotExist(pos)) {
        return;
    }

    sendFunc(pos, data);
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

export var addSendUniformConfig = ensureFunc((returnVal, shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendUniformConfigMap: SendUniformConfigMap) => {
    it("sendUniformConfigMap should not has duplicate attribute name", () => {
        expect(hasDuplicateItems(sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc((shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendUniformConfigMap: SendUniformConfigMap) => {
    it("sendUniformConfigMap[shaderIndex] should not be defined", () => {
        expect(sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, (shaderIndex: number, materialShaderLibConfig: MaterialShaderLibConfig, shaderLibData: IShaderLibContentGenerator, sendUniformConfigMap: SendUniformConfigMap) => {
    var sendDataArr: Array<ISendUniformConfig> = [];

    forEach(materialShaderLibConfig, (shaderLibName: string) => {
        var sendData = shaderLibData[shaderLibName].send;

        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.uniform)) {
            sendDataArr = sendDataArr.concat(sendData.uniform);
        }
    })

    sendUniformConfigMap[shaderIndex] = sendDataArr;
}))

export var initData = (GLSLSenderData: any) => {
    GLSLSenderData.sendAttributeConfigMap = createMap();
    GLSLSenderData.sendUniformConfigMap = createMap();
    GLSLSenderData.vertexAttribHistory = [];
    GLSLSenderData.uniformCacheMap = createMap();
}
