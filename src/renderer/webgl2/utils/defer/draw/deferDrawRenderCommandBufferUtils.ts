import { Map } from "immutable";
import { WebGL2DrawFuncDataMap, WebGL2SendUniformDataDataMap } from "../../../type/utilsType";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../../utils/typeArrayUtils";
import { IMaterialConfig } from "../../../../data/material_config";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator";
import { IRenderConfig } from "../../../../worker/both_file/data/render_config";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../../type/dataType";
import { EDrawMode } from "../../../../enum/EDrawMode";
import { sendData } from "../../../../utils/texture/mapManagerUtils";
import { BufferUtilsForUnitTest } from "../../../../../utils/BufferUtilsForUnitTest";
import { createTypeArrays } from "../../../../utils/draw/renderComandBufferUtils";
import { drawFullScreenQuad, sendAttributeData as sendDeferLightPassAttributeData } from "../light/deferLightPassUtils";
import { getNoMaterialShaderIndex } from "../../shaderUtils";
import { unbindVAO } from "../../vao/vaoUtils";

export var buildDrawDataMap = (GBufferDataFromSystem:any, DeferLightPassDataFromSystem:any) => {
    return {
        GBufferDataFromSystem: GBufferDataFromSystem,
        DeferLightPassDataFromSystem: DeferLightPassDataFromSystem
    }
}

export var draw = (gl:any, state:Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawFuncDataMap:WebGL2DrawFuncDataMap, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, sendDataMap:WebGL2SendUniformDataDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    var {
            // TextureDataFromSystem,
            // TextureCacheDataFromSystem,
            // MapManagerDataFromSystem,
            // ProgramDataFromSystem,
            // LocationDataFromSystem,
            // GLSLSenderDataFromSystem,
            // GeometryDataFromSystem,
            // ArrayBufferDataFromSystem,
            // IndexBufferDataFromSystem,
            DrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        mat3Length = getMatrix3DataSize(),
        mat4Length = getMatrix4DataSize(),
        cameraPositionLength = getVector3DataSize(),
        // count = bufferData.count,
        buffer: any = bufferData.buffer,
        // mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend,
        vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
        cameraPositionForSend = DrawRenderCommandBufferDataFromSystem.cameraPositionForSend,
        normalMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend,
        drawRenderCommandBufferDataFromSystem = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem);
        // program: WebGLProgram = null;





    var {
            // mMatrices,
            vMatrices,
            pMatrices,
            cameraPositions,
            normalMatrices,
            // materialIndices,
            // shaderIndices,
            // geometryIndices
        } = drawRenderCommandBufferDataFromSystem;


    _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    _updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);



    // let sendDataMap = _buildSendUniformDataDataMap(drawDataMap);







    _drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, bufferData, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, drawRenderCommandBufferDataFromSystem);
    _drawLightPass(gl, render_config, drawFuncDataMap, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend);
};

var _drawGBufferPass = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, {
    bindIndexBuffer,
    sendAttributeData,
    sendUniformData,
    directlySendUniformData,
    use,
    hasIndices,
    getIndicesCount,
    getIndexType,
    getIndexTypeSize,
    getVerticesCount,
    getMapCount,
    bindAndUpdate,
    useShader,
    bindGBuffer,
    getNewTextureUnitIndex
}, drawDataMap: DrawDataMap, {
                            GBufferDataFromSystem
                        }, initShaderDataMap: InitShaderDataMap, sendDataMap:WebGL2SendUniformDataDataMap, bufferData: RenderCommandBufferForDrawData, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, {
            mMatrices,
            // vMatrices,
            // pMatrices,
            // cameraPositions,
            // normalMatrices,
            materialIndices,
            shaderIndices,
            geometryIndices
        }) => {
    // set state
    gl.depthMask(true);

    // clear
    // clear(null, render_config, DeviceManagerData),
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);





    // bind gbuffer
    bindGBuffer(gl, GBufferDataFromSystem);





    var {
            TextureDataFromSystem,
            TextureCacheDataFromSystem,
            MapManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            GeometryDataFromSystem,
            ArrayBufferDataFromSystem,
            IndexBufferDataFromSystem,
            DrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        // mat3Length = getMatrix3DataSize(),
        // mat4Length = getMatrix4DataSize(),
        // cameraPositionLength = getVector3DataSize(),
        count = bufferData.count,
        buffer: any = bufferData.buffer,
        mMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.mMatrixFloatArrayForSend,
        // vMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.vMatrixFloatArrayForSend,
        // pMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.pMatrixFloatArrayForSend,
        // cameraPositionForSend = DrawRenderCommandBufferDataFromSystem.cameraPositionForSend,
        // normalMatrixFloatArrayForSend = DrawRenderCommandBufferDataFromSystem.normalMatrixFloatArrayForSend,
        // {
        //     mMatrices,
        //     vMatrices,
        //     pMatrices,
        //     cameraPositions,
        //     normalMatrices,
        //     materialIndices,
        //     shaderIndices,
        //     geometryIndices
        // } = _createTypeArraysOnlyOnce(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem),
        program: WebGLProgram = null;

    // _updateSendMatrixFloat32ArrayData(vMatrices, 0, mat4Length, vMatrixFloatArrayForSend);
    // _updateSendMatrixFloat32ArrayData(pMatrices, 0, mat4Length, pMatrixFloatArrayForSend);
    // _updateSendMatrixFloat32ArrayData(normalMatrices, 0, mat3Length, normalMatrixFloatArrayForSend);
    // _updateSendMatrixFloat32ArrayData(cameraPositions, 0, cameraPositionLength, cameraPositionForSend);


    for (let i = 0; i < count; i++) {
        let matStartIndex = 16 * i,
            matEndIndex = matStartIndex + 16,
            // shaderIndex = shaderIndices[i],
            geometryIndex = geometryIndices[i],
            materialIndex = materialIndices[i],
            mapCount = getMapCount(materialIndex, MapManagerDataFromSystem),
            drawMode = EDrawMode.TRIANGLES;

        let shaderIndex = useShader(materialIndex, "GBuffer", state, material_config, shaderLib_generator, initMaterialShader, initShaderDataMap);

        program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);

        sendAttributeData(gl, shaderIndex, program, geometryIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem);

        _updateSendMatrixFloat32ArrayData(mMatrices, matStartIndex, matEndIndex, mMatrixFloatArrayForSend);

        let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
            uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;


        sendUniformData(gl, shaderIndex, program, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex), sendDataMap, uniformLocationMap, uniformCacheMap);

        let textureStartUnitIndex = getNewTextureUnitIndex();

        bindAndUpdate(gl, mapCount, textureStartUnitIndex, TextureCacheDataFromSystem, TextureDataFromSystem, MapManagerDataFromSystem);

        sendData(gl, mapCount, textureStartUnitIndex, shaderIndex, program, sendDataMap.glslSenderData, uniformLocationMap, uniformCacheMap, directlySendUniformData, TextureDataFromSystem, MapManagerDataFromSystem);

        if (hasIndices(geometryIndex, GeometryDataFromSystem)) {
            bindIndexBuffer(gl, geometryIndex, ProgramDataFromSystem, GeometryDataFromSystem, IndexBufferDataFromSystem);

            _drawElements(gl, geometryIndex, drawMode, getIndicesCount, getIndexType, getIndexTypeSize, GeometryDataFromSystem);
        }
        else {
            _drawArray(gl, geometryIndex, drawMode, getVerticesCount, GeometryDataFromSystem);
        }
    }
}



var _createTypeArraysOnlyOnce = (buffer: any, DataBufferConfig: any, DrawRenderCommandBufferDataFromSystem: any) => {
    if (BufferUtilsForUnitTest.isDrawRenderCommandBufferDataTypeArrayNotExist(DrawRenderCommandBufferDataFromSystem)) {
        createTypeArrays(buffer, DataBufferConfig, DrawRenderCommandBufferDataFromSystem);
    }

    return DrawRenderCommandBufferDataFromSystem;
}



var _updateSendMatrixFloat32ArrayData = (sourceMatrices: Float32Array, matStartIndex: number, matEndIndex: number, targetMatrices: Float32Array) => {
    for (let i = matStartIndex; i < matEndIndex; i++) {
        targetMatrices[i - matStartIndex] = sourceMatrices[i];
    }

    return targetMatrices;
}


var _buildRenderCommandUniformData = (mMatrices: Float32Array, vMatrices: Float32Array, pMatrices: Float32Array, cameraPosition: Float32Array, normalMatrices: Float32Array, materialIndex: number) => {
    return {
        mMatrix: mMatrices,
        vMatrix: vMatrices,
        pMatrix: pMatrices,
        cameraPosition: cameraPosition,
        normalMatrix: normalMatrices,
        materialIndex: materialIndex
    }
}


var _drawElements = (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, GeometryDataFromSystem: any) => {
    var startOffset: number = 0,
        count = getIndicesCount(geometryIndex, GeometryDataFromSystem),
        type = getIndexType(GeometryDataFromSystem),
        typeSize = getIndexTypeSize(GeometryDataFromSystem);

    gl.drawElements(gl[drawMode], count, gl[type], typeSize * startOffset);
}

var _drawArray = (gl: WebGLRenderingContext, geometryIndex: number, drawMode: EDrawMode, getVerticesCount: Function, GeometryDataFromSystem: any) => {
    var startOffset: number = 0,
        count = getVerticesCount(geometryIndex, GeometryDataFromSystem);

    gl.drawArrays(gl[drawMode], startOffset, count);
}











var _drawLightPass = (gl:any, render_config:IRenderConfig, {
    use,
    unbindGBuffer
}, drawDataMap:DrawDataMap, {
                          GBufferDataFromSystem,
                          DeferLightPassDataFromSystem
                      }, initShaderDataMap:InitShaderDataMap, sendDataMap:WebGL2SendUniformDataDataMap,
                      vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend) => {
    var {
        ShaderDataFromSystem
        } = initShaderDataMap,
        {
            // PointLightDataFromSystem,
            TextureDataFromSystem,
            TextureCacheDataFromSystem,
            MapManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            GeometryDataFromSystem,
            ArrayBufferDataFromSystem,
            IndexBufferDataFromSystem,
            DrawRenderCommandBufferDataFromSystem
        } = drawDataMap,
        {
            sendInt,
            sendFloat3,
            sendFloat1
        } = sendDataMap.glslSenderData,
        {
            getColorArr3,
            getIntensity,
            getConstant,
            getLinear,
            getQuadratic,
            getRange,
            getPosition,
            computeRadius,

            PointLightDataFromSystem
        } = sendDataMap.pointLightData;


        // not bind gbuffer
    unbindGBuffer(gl);



    // clear
    // clear(null, render_config, DeviceManagerData),
    gl.clear(gl.COLOR_BUFFER_BIT);





    // set state
    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);
    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.FRONT);


    // use program(use light pass shader -> program )
    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem);

    let program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);




    sendDeferLightPassAttributeData(gl, DeferLightPassDataFromSystem);


    // gl.enable(gl.SCISSOR_TEST);


    // bind and update texture

    // send uniform data

    // send texture data


    //todo support ambient, direction light

    // draw point light:
    //     send attribute(sphere)
    // send uniform(light)
    //
    // send light -> position, color
    //
    // draw element / array


    let uniformLocationMap = LocationDataFromSystem.uniformLocationMap[shaderIndex],
        uniformCacheMap = GLSLSenderDataFromSystem.uniformCacheMap;


    ////todo refactor: move lightModel to config
    sendInt(gl, shaderIndex, program, "u_lightModel", render_config.defer.lightModel, uniformCacheMap, uniformLocationMap);

    sendFloat3(gl, shaderIndex, program, "u_cameraPos", cameraPositionForSend, uniformCacheMap, uniformLocationMap);

    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        //todo move to ubo

        //todo add scissor optimize

        let colorArr3 = getColorArr3(i, PointLightDataFromSystem),
            constant = getConstant(i, PointLightDataFromSystem),
            linear = getLinear(i, PointLightDataFromSystem),
            quadratic = getQuadratic(i, PointLightDataFromSystem),
            //todo replace range with radius
            radius = computeRadius(colorArr3, constant, linear, quadratic);

        sendFloat3(gl, shaderIndex, program, "u_lightPosition", getPosition(i), uniformCacheMap, uniformLocationMap);
        sendFloat3(gl, shaderIndex, program, "u_lightColor", colorArr3, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightIntensity", getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightConstant", constant, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightLinear", linear, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightQuadratic", quadratic, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightRange", getRange(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);


        sendFloat1(gl, shaderIndex, program, "u_lightRadius", radius, uniformCacheMap, uniformLocationMap);


        // var materialIndex = null;
        // var mMatrixFloatArrayForSend = null;

        // sendUniformData(gl, shaderIndex, program, 0, drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex));



        drawFullScreenQuad(gl, DeferLightPassDataFromSystem);
    }

    unbindVAO(gl);


    // restore state:
    //// gl.cullFace(gl.BACK);
    // gl.disable(gl.SCISSOR_TEST);
}
//
// //todo refactor with ShaderSystem->126
// var _getPosition = (index: number, PointLightDataFromSystem:any) => {
//     //todo refactor: drawDataMap add ThreeDTransformData, GameObjectData?
//
//     return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
// }
