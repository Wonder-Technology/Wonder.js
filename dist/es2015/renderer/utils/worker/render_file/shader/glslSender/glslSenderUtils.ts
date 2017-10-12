import { it, requireCheckFunc } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { createMap, isNotValidMapValue } from "../../../../../../utils/objectUtils";
import { UniformCacheMap, UniformShaderLocationMap, VaoConfigMap } from "../../../../../type/dataType";
import { Log } from "../../../../../../utils/Log";
import { Vector3 } from "../../../../../../math/Vector3";
import { EBufferType } from "../../../../../enum/EBufferType";
import { VaoConfigData } from "../../../../../type/dataType";
import { IWebGL2ShaderLibContentGenerator } from "../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import { forEach } from "../../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../renderConfigUtils";

export const sendBuffer = (gl: WebGLRenderingContext, type: string, pos: number, buffer: WebGLBuffer, geometryIndex: number, GLSLSenderDataFromSystem: any, ArrayBufferData: any) => {
    var vertexAttribHistory = GLSLSenderDataFromSystem.vertexAttribHistory;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(pos, _getBufferSizeByType(type), gl[EBufferType.FLOAT], false, 0, 0);

    if (vertexAttribHistory[pos] !== true) {
        gl.enableVertexAttribArray(pos);

        vertexAttribHistory[pos] = true;
    }
}

const _getBufferSizeByType =(type: string) => {
    var size: number = null;

    switch (type) {
        case "vec2":
            size = 2;
            break;
        case "vec3":
            size = 3;
            break;
        default:
            Log.error(true, Log.info.FUNC_INVALID(`type:${type}`));
            break;
    }

    return size;
}

export const sendMatrix3 = (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    _sendUniformData<Float32Array>(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniformMatrix3fv(pos, false, data);
    })
}

export const sendMatrix4 = (gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: Float32Array, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    _sendUniformData<Float32Array>(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniformMatrix4fv(pos, false, data);
    })
}

export const sendVector3 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Vector3, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap),
        x = data.x,
        y = data.y,
        z = data.z;

    if (recordedData && recordedData.x == x && recordedData.y == y && recordedData.z == z) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<Vector3>(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniform3f(pos, x, y, z);
    })
}

export const sendInt = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function, glFunc: Function) => {
    it("data should be number", () => {
        expect(data).be.a("number");
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function, glFunc: Function) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData === data) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<number>(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniform1i(pos, data);
    })
})

export const sendFloat1 = requireCheckFunc((gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function, glFunc: Function) => {
    it("data should be number", () => {
        expect(data).be.a("number");
    });
}, (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: number, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function, glFunc: Function) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap);

    if (recordedData === data) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<number>(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniform1f(pos, data);
    })
})

export const sendFloat3 = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, name: string, data: Array<number> | Float32Array, uniformCacheMap: UniformCacheMap, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function) => {
    var recordedData: any = _getUniformCache(shaderIndex, name, uniformCacheMap),
        x = data[0],
        y = data[1],
        z = data[2];

    if (recordedData && recordedData[0] == x && recordedData[1] == y && recordedData[2] == z) {
        return;
    }

    _setUniformCache(shaderIndex, name, data, uniformCacheMap);

    _sendUniformData<Array<number> | Float32Array>(gl, program, name, data, uniformLocationMap, getUniformLocation, isUniformLocationNotExist, (pos, data) => {
        gl.uniform3f(pos, x, y, z);
    })
}

const _getUniformCache =(shaderIndex: number, name: string, uniformCacheMap: UniformCacheMap) => {
    var cache = uniformCacheMap[shaderIndex];

    if (_isCacheNotExist(cache)) {
        cache = {};
        uniformCacheMap[shaderIndex] = cache;

        return null;
    }

    return cache[name];
}

const _isCacheNotExist =(cache: any) => isNotValidMapValue(cache);

const _setUniformCache =(shaderIndex: number, name: string, data: any, uniformCacheMap: UniformCacheMap) => {
    uniformCacheMap[shaderIndex][name] = data;
}

const _sendUniformData =<T>(gl: WebGLRenderingContext, program: WebGLProgram, name: string, data: T, uniformLocationMap: UniformShaderLocationMap, getUniformLocation: Function, isUniformLocationNotExist: Function, send: (pos: WebGLUniformLocation, data: T) => void) => {
    var pos = getUniformLocation(gl, program, name, uniformLocationMap);

    if (isUniformLocationNotExist(pos)) {
        return;
    }

    send(pos, data);
}

export const initData = (GLSLSenderDataFromSystem: any) => {
    GLSLSenderDataFromSystem.vaoConfigMap = createMap();

    GLSLSenderDataFromSystem.sendUniformConfigMap = createMap();
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap = createMap();
    GLSLSenderDataFromSystem.vertexAttribHistory = [];
    GLSLSenderDataFromSystem.uniformCacheMap = createMap();
}

export const setVaoConfigData = requireCheckFunc((data: VaoConfigData, name: string, value: any) => {
    it("shouldn't exist duplicate data", () => {
        expect(data[name]).not.exist;
    });
}, (data: VaoConfigData, name: string, value: any) => {
    data[name] = value;
})
