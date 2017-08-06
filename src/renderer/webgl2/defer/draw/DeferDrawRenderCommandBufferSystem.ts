// import {
//     buildDrawFuncDataMap, clear as clearUtils, draw as drawUtils,
//     initData as initDataUtils
// } from "../utils/draw/drawRenderCommandBufferUtils";
// import { clear as clearGL, getGL } from "../device/DeviceManagerSystem";
// import curry from "wonder-lodash/curry";
// import { Map } from "immutable";
// import { DrawDataMap } from "../type/utilsType";
// import { bindIndexBuffer, sendAttributeData, sendUniformData, use } from "../shader/ShaderSystem";
// import {
//     getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
//     hasIndices
// } from "../../component/geometry/GeometrySystem";
// import { IRenderConfig } from "../data/render_config";
// import { RenderCommandBufferForDrawData } from "../type/dataType";
// import { bindAndUpdate, getMapCount } from "../texture/MapManagerSystem";
// import { directlySendUniformData } from "../utils/shader/program/programUtils";
//
// export var clear = curry((state: Map<any, any>, render_config: IRenderConfig, DeviceManagerData: any, data: RenderCommandBufferForDrawData) => {
//     return clearUtils(getGL(DeviceManagerData, state), clearGL, render_config, DeviceManagerData, data);
// });
//
// export var draw = curry((state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => {
//     return drawUtils(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData)
// });
//
// export var initData = initDataUtils;



import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap, SendUniformDataDataMap } from "../../../type/utilsType";
import {
    bindGBuffer, bindGBufferTextures, getNewTextureUnitIndex, sendGBufferTextureData,
    unbindGBuffer
} from "../gbuffer/GBufferSystem";
import {
    bindIndexBuffer, getNoMaterialShaderIndex, sendAttributeData, sendUniformData, use
} from "../../../shader/ShaderSystem";
import { drawFullScreenQuad, sendAttributeData as sendDeferLightPassAttributeData } from "../light/DeferLightPassSystem";
import { directlySendUniformData } from "../../../utils/shader/program/programUtils";
import { getIndexType, getIndicesCount, hasIndices, getIndexTypeSize, getVerticesCount } from "../../../../component/geometry/GeometrySystem";
import { bindAndUpdate, getMapCount } from "../../../texture/MapManagerSystem";
import {
    getUniformData, sendFloat1, sendFloat3, sendInt, sendMatrix3, sendMatrix4,
    sendVector3
} from "../../../shader/glslSender/GLSLSenderSystem";
import { ThreeDTransformData } from "../../../../component/transform/ThreeDTransformData";
import { GameObjectData } from "../../../../core/entityObject/gameObject/GameObjectData";
import { unbindVAO } from "../../../vao/VAOSystem";
import { EDrawMode } from "../../../enum/EDrawMode";
import { useShader } from "../../../../component/material/MaterialSystem";
import { getMatrix3DataSize, getMatrix4DataSize, getVector3DataSize } from "../../../../utils/typeArrayUtils";
import { BufferUtilsForUnitTest } from "../../../../utils/BufferUtilsForUnitTest";
import { createTypeArrays } from "../../../utils/draw/renderComandBufferUtils";
import { ELightModel } from "../../../../component/material/ELightModel";
import { sendData } from "../../../utils/texture/mapManagerUtils";
// import { getColorArr3 as getAmbientLightColorArr3 } from "../../../component/light/AmbientLightSystem";
// import {
//     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
//     getPosition as getDirectionLightPosition,
// } from "../../../component/light/DirectionLightSystem";
import {
    computeRadius, getConstant, getLinear,
    getQuadratic, getRange,
    getPosition as getPointLightPosition,
    getColorArr3 as getPointLightColorArr3,
    getIntensity as getPointLightIntensity
} from "../../../../component/light/PointLightSystem";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator";
import { Map } from "immutable";
import { IMaterialConfig } from "../../../data/material_config";

export var buildDrawDataMap = (GBufferDataFromSystem:any, DeferLightPassDataFromSystem:any) => {
    return {
        GBufferDataFromSystem: GBufferDataFromSystem,
        DeferLightPassDataFromSystem: DeferLightPassDataFromSystem
    }
}

export var draw = (gl:any, state:Map<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    //todo refactor DeviceManagerSystem->clear
    gl.clearColor(0.0, 0.0, 0.0, 1.0);



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



    let sendDataMap = _buildSendUniformDataDataMap(drawDataMap);







    _drawGBufferPass(gl, state, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, bufferData, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, drawRenderCommandBufferDataFromSystem);
    _drawLightPass(gl, drawDataMap, deferDrawDataMap, initShaderDataMap, sendDataMap, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend);
};

var _drawGBufferPass = (gl:any, state:Map<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, {
    GBufferDataFromSystem
}, initShaderDataMap:InitShaderDataMap, sendDataMap:SendUniformDataDataMap, bufferData: RenderCommandBufferForDrawData, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, {
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
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);





    // bind gbuffer
    bindGBuffer(gl, GBufferDataFromSystem);

    // clear
    // clear(null, render_config, DeviceManagerData),
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);






    // draw each gameObjects:
    //     material use shader






    // draw each gameObjects:
    //
    //
    //     // bind and update texture(no gbuffer texture)
    // // (only update the same texture once)
    //
    //     // send texture data(no gbuffer texture)
    //
    //     material use shader
    // // buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData)
    //
    //
    //
    //     use program(use gbuffer shader -> program)
    //
    // // bind and update all possible textures(no gbuffer texture)
    // bind and update textures(no gbuffer texture)
    // (only update the same texture once)
    //
    //
    // send texture data(no gbuffer texture)
    // // (send all possible textures' unit)
    // (send textures' unit)
    //
    //
    //
    // send attribute
    // send uniform
    // draw element/array







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

        ////todo move system method to utils: getNewTextureUnitIndex
        // sendUniformData(gl, shaderIndex, program, mapCount, getNewTextureUnitIndex(), drawDataMap, _buildRenderCommandUniformData(mMatrixFloatArrayForSend, vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend, materialIndex));
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



    // drawUtils(gl, null, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, initShaderDataMap, bufferData);
}



var _buildSendUniformDataDataMap = (drawDataMap: DrawDataMap) => {
    return {
        glslSenderData: {
            getUniformData: getUniformData,
            sendMatrix3: sendMatrix3,
            sendMatrix4: sendMatrix4,
            sendVector3: sendVector3,
            sendInt: sendInt,
            sendFloat1: sendFloat1,
            sendFloat3: sendFloat3,

            GLSLSenderDataFromSystem: drawDataMap.GLSLSenderDataFromSystem
        }
        //todo move to front render
        // ambientLightData: {
        //     getColorArr3: getAmbientLightColorArr3,
        //
        //     AmbientLightDataFromSystem: drawDataMap.AmbientLightDataFromSystem
        // },
        // directionLightData: {
        //     getPosition: (index: number) => {
        //         return getDirectionLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.DirectionLightDataFromSystem).values;
        //     },
        //     getColorArr3: getDirectionLightColorArr3,
        //     getIntensity: getDirectionLightIntensity,
        //
        //     DirectionLightDataFromSystem: drawDataMap.DirectionLightDataFromSystem
        // },
        // pointLightData: {
        //     getPosition: (index: number) => {
        //         return getPointLightPosition(index, ThreeDTransformData, GameObjectData, drawDataMap.PointLightDataFromSystem).values;
        //     },
        //     getColorArr3: getPointLightColorArr3,
        //     getIntensity: getPointLightIntensity,
        //     getConstant: getConstant,
        //     getLinear: getLinear,
        //     getQuadratic: getQuadratic,
        //     getRange: getRange,
        //
        //     PointLightDataFromSystem: drawDataMap.PointLightDataFromSystem
        // }
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











var _drawLightPass = (gl:any, drawDataMap:DrawDataMap, {
                          GBufferDataFromSystem,
                          DeferLightPassDataFromSystem
                      }, initShaderDataMap:InitShaderDataMap, sendDataMap:SendUniformDataDataMap,
                      vMatrixFloatArrayForSend, pMatrixFloatArrayForSend, cameraPositionForSend, normalMatrixFloatArrayForSend
) => {
    var {
        ShaderDataFromSystem
    } = initShaderDataMap;
    var {
    PointLightDataFromSystem,
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
} = drawDataMap;

    // not bind gbuffer
    unbindGBuffer(gl);

    // use program(use light pass shader -> program )
    let shaderIndex = getNoMaterialShaderIndex("DeferLightPass", ShaderDataFromSystem);

    let program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);






    // bind texture(gbuffer texture )
    // send texture data(gbuffer texture )

    // bindGBufferTextures(gl, GBufferDataFromSystem);
    // sendGBufferTextureData(gl, program);





    // set state
    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);
    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.FRONT);


    // clear
    // clear(null, render_config, DeviceManagerData),
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


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


    //todo refactor: move lightModel to config
    sendInt(gl, shaderIndex, program, "u_lightModel", ELightModel.PHONG, uniformCacheMap, uniformLocationMap);

    sendFloat3(gl, shaderIndex, program, "u_cameraPos", cameraPositionForSend, uniformCacheMap, uniformLocationMap);

    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        //todo move to ubo

        //todo add scissor optimize

        let colorArr3 = getPointLightColorArr3(i, PointLightDataFromSystem),
            constant = getConstant(i, PointLightDataFromSystem),
            linear = getLinear(i, PointLightDataFromSystem),
            quadratic = getQuadratic(i, PointLightDataFromSystem),
            //todo replace range with radius
            radius = computeRadius(colorArr3, constant, linear, quadratic);

        sendFloat3(gl, shaderIndex, program, "u_lightPosition", _getPosition(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        sendFloat3(gl, shaderIndex, program, "u_lightColor", colorArr3, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightIntensity", getPointLightIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
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

//todo refactor with ShaderSystem->126
var _getPosition = (index: number, PointLightDataFromSystem:any) => {
    //todo refactor: drawDataMap add ThreeDTransformData, GameObjectData?

    return getPointLightPosition(index, ThreeDTransformData, GameObjectData, PointLightDataFromSystem).values;
}
