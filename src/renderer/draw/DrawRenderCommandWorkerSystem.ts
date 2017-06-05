import curry from "wonder-lodash/curry";
import { RenderCommand } from "../command/RenderCommand";
import { Map } from "immutable";
import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderSystem";
import { getType, getTypeSize } from "../buffer/IndexBufferSystem";
import { clear as clearGL, getGL } from "../../device/DeviceManagerSystem";
import { getDrawMode, getIndicesCount, getVerticesCount, hasIndices } from "../../component/geometry/GeometrySystem";
import { IRenderConfig } from "../data/render_config";
import { RenderCommandBufferWorkerData } from "../command/RenderCommandBufferData";
import { EDrawMode } from "../enum/EDrawMode";

export var clear = (state: Map<any, any>, render_config:IRenderConfig, DeviceManagerData: any) => {
    clearGL(getGL(DeviceManagerData, state), render_config.clearColor, DeviceManagerData);

    return state;
}

export var draw = (state: Map<any, any>, DeviceManagerData: any, MaterialData: any, ShaderData: any, ProgramData:any, LocationData:any, GLSLSenderData:any, GeometryData: any, ArrayBufferData: any, IndexBufferData: any, bufferData:RenderCommandBufferWorkerData) => {
    //todo get mMatrices... 's count data by postMessage?

    let mat4Length = 16;

    var count = bufferData.count,
        buffer:any = bufferData.buffer;




    let mMatrices = new Float32Array(buffer, 0, count * mat4Length),
        vMatrices = new Float32Array(buffer, count * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length),
        pMatrices = new Float32Array(buffer, (count + 1) * Float32Array.BYTES_PER_ELEMENT * mat4Length, 1 * mat4Length),
        materialIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length, count),
        shaderIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT, count),
        geometryIndices = new Uint32Array(buffer, (count + 2) * Float32Array.BYTES_PER_ELEMENT * mat4Length + count * Uint32Array.BYTES_PER_ELEMENT * 2, count);

    var gl = getGL(DeviceManagerData, state);


    // vMatrices = vMatrices.slice();
    // pMatrices = pMatrices.slice();


    vMatrices = _getMatrixFloat32ArrayData(vMatrices, 0, mat4Length)
    pMatrices = _getMatrixFloat32ArrayData(pMatrices, 0, mat4Length)


    // for (let gameObject of renderGameObjectArray) {
    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16;




        let shaderIndex = shaderIndices[i],
            geometryIndex = geometryIndices[i];
        // drawMode = drawModes[i];

        let drawMode = EDrawMode.TRIANGLES;



        use(gl, shaderIndex, ProgramData, LocationData, GLSLSenderData);

        //todo set state

        sendAttributeData(gl, shaderIndex, geometryIndex, ProgramData, LocationData, GLSLSenderData, GeometryData, ArrayBufferData);
        // sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, _buildRenderCommandUniformData(mMatrices.subarray(matStartIndex, matEndIndex), vMatrices.subarray(matStartIndex, matEndIndex), pMatrices.subarray(matStartIndex, matEndIndex), materialIndices[i]));
        ////todo optimize: try to use subarray, but uniformMatrix4fv error: Failed to execute 'uniformMatrix4fv' on 'WebGLRenderingContext': The provided ArrayBufferView value must not be shared.
        // sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, _buildRenderCommandUniformData(mMatrices.slice(matStartIndex, matEndIndex), vMatrices, pMatrices, materialIndices[i]));
        sendUniformData(gl, shaderIndex, MaterialData, ProgramData, LocationData, GLSLSenderData, _buildRenderCommandUniformData(_getMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex), vMatrices, pMatrices, materialIndices[i]));


        if (hasIndices(geometryIndex, GeometryData)) {
            bindIndexBuffer(gl, geometryIndex, ShaderData, GeometryData, IndexBufferData);

            _drawElements(gl, geometryIndex, drawMode, GeometryData);
        }
        else {
            _drawArray(gl, geometryIndex, drawMode, GeometryData);
        }
    }

    gl.commit();

    return state;
}

var _drawElements = (gl: WebGLRenderingContext, geometryIndex: number, drawMode:EDrawMode, GeometryData: any) => {
    var startOffset: number = 0,
        count = getIndicesCount(geometryIndex, GeometryData),
        type = getType(GeometryData),
        typeSize = getTypeSize(GeometryData);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);

    // gl.commit(); // new for webgl in workers
}

var _drawArray = (gl: WebGLRenderingContext, geometryIndex: number, drawMode:EDrawMode, GeometryData: any) => {
    var startOffset: number = 0,
        count = getVerticesCount(geometryIndex, GeometryData);

    gl.drawArrays(gl[drawMode], startOffset, count);
}

var _getMatrixFloat32ArrayData = (matrices:Float32Array, matStartIndex:number, matEndIndex:number) => {
    var arr = new Float32Array(16);

    for(let i = matStartIndex; i < matEndIndex; i++){
        arr[i - matStartIndex] = matrices[i];
    }

    return arr;
}

var _buildRenderCommandUniformData = (mMatrices:Float32Array, vMatrices:Float32Array, pMatrices:Float32Array, materialIndex:number) => {
    return {
        mMatrix: mMatrices,
        vMatrix:vMatrices,
        pMatrix:pMatrices,
        materialIndex:materialIndex
    }
}

