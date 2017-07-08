import { EBufferType } from "../../enum/EBufferType";
import { isBufferExist } from "./bufferUtils";
import { createMap } from "../../../utils/objectUtils";

export var getOrCreateBuffer = (gl: WebGLRenderingContext, geometryIndex: number, buffers:Array<WebGLBuffer>, getDatas: Function, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    var buffer = buffers[geometryIndex];

    if (isBufferExist(buffer)) {
        return buffer;
    }

    buffer = gl.createBuffer();

    buffers[geometryIndex] = buffer;

    _initBuffer(gl, getDatas(geometryIndex, GeometryDataFromSystem), buffer);

    ArrayBufferDataFromSystem.bufferDataMap[geometryIndex] = {
        size: 3,
        type: EBufferType.FLOAT
    };

    return buffer;
}

var _initBuffer = (gl: WebGLRenderingContext, data: Float32Array, buffer: WebGLBuffer) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    _resetBindedBuffer(gl);
}

var _resetBindedBuffer = (gl: WebGLRenderingContext) => {
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

export var initData = (ArrayBufferDataFromSystemFromSystem: any) => {
    ArrayBufferDataFromSystemFromSystem.verticeBuffers = [];
    ArrayBufferDataFromSystemFromSystem.normalBuffers = [];
    ArrayBufferDataFromSystemFromSystem.bufferDataMap = createMap();
}
