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



import { RenderCommandBufferForDrawData } from "../../type/dataType";
import { DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { bindGBuffer, bindGBufferTextures, sendGBufferTextureData, unbindGBuffer } from "../gbuffer/GBufferSystem";
import { getNoMaterialShaderIndex } from "../../shader/ShaderSystem";
import { drawFullScreenQuad, sendAttributeData } from "../light/DeferLightPassSystem";
import { computeRadius } from "../../../component/light/PointLightSystem";

export var draw = (gl:any, DataBufferConfig: any, drawDataMap: DrawDataMap, initShaderDataMap:InitShaderDataMap, bufferData: RenderCommandBufferForDrawData) => {
    //todo refactor DeviceManagerSystem->clear
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    _drawGBufferPass();
    _drawLightPass();
};

var _drawGBufferPass = (gl:any, GBufferData, bufferData: RenderCommandBufferForDrawData) => {
    // bind gbuffer textures
    // bindGBufferTextures(gl, GBufferData);

    // use program(use gbuffer shader -> program)




    set state
    // gl.bindVertexArray(cubeVertexArray);
    gl.depthMask(true);
    gl.enable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);


    clear
    // clear(null, render_config, DeviceManagerData),
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);



    bind gbuffer
    bindGBuffer(gl, GBufferData);




    // draw each gameObjects:
    //     material use shader






    draw each gameObjects:


        // bind and update texture(no gbuffer texture)
    // (only update the same texture once)

        // send texture data(no gbuffer texture)

        material use shader
    // buildInitShaderDataMap(DeviceManagerData, ProgramData, LocationData, GLSLSenderData, ShaderData, MapManagerData, MaterialData, BasicMaterialData, LightMaterialData, DirectionLightData, PointLightData)



        use program(use gbuffer shader -> program)

    // bind and update all possible textures(no gbuffer texture)
    bind and update textures(no gbuffer texture)
    (only update the same texture once)


    send texture data(no gbuffer texture)
    // (send all possible textures' unit)
    (send textures' unit)



    send attribute
    send uniform
    draw element/array

    drawUtils(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData)
}

var _drawLightPass = (gl:any, DeferLightPassData) => {
    not bind gbuffer
    unbindGBuffer(gl);

    use program(use light pass shader -> program )
    let shaderIndex = getNoMaterialShaderIndex("DeferLight", ShaderData);

    let program = use(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);






    bind texture(gbuffer texture )
    send texture data(gbuffer texture )

    bindGBufferTextures(gl, GBufferData);
    sendGBufferTextureData(gl, program);





    set state
    gl.depthMask(false);
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.ONE, gl.ONE);
    // gl.enable(gl.CULL_FACE);
    // gl.cullFace(gl.FRONT);


    clear
    // clear(null, render_config, DeviceManagerData),
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);




    gl.enable(gl.SCISSOR_TEST);


    // bind and update texture

    // send uniform data

    // send texture data


    //todo support ambient, direction light

    draw point light:
        send attribute(sphere)
    send uniform(light)

    send light -> position, color

    draw element / array



    sendAttributeData(gl, DeferLightPassData);


    for (let i = 0, count = PointLightDataFromSystem.count; i < count; i++) {
        //todo move to ubo

        //todo add scissor optimize

        let uniformLocationMap = drawDataMap.LocationDataFromSystem.uniformLocationMap[shaderIndex],
            uniformCacheMap = drawDataMap.GLSLSenderDataFromSystem.uniformCacheMap,
            colorArr3 = getColorArr3(i, PointLightDataFromSystem),
            constant = getConstant(i, PointLightDataFromSystem),
            linear = getLinear(i, PointLightDataFromSystem),
            quadratic = getQuadratic(i, PointLightDataFromSystem),
            //todo replace range with radius
            radius = computeRadius(colorArr3, constant, linear, quadratic);

        sendFloat3(gl, shaderIndex, program, "u_lightPosition", getPosition(i), uniformCacheMap, uniformLocationMap);
        sendFloat3(gl, shaderIndex, program, "u_lightColor", getColorArr3(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightIntensity", getIntensity(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightConstant", constant, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightLinear", linear, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightQuadratic", quadratic, uniformCacheMap, uniformLocationMap);
        sendFloat1(gl, shaderIndex, program, "u_lightRange", getRange(i, PointLightDataFromSystem), uniformCacheMap, uniformLocationMap);


        sendFloat1(gl, shaderIndex, program, "u_lightRadius", radius, uniformCacheMap, uniformLocationMap);



        drawFullScreenQuad(gl, DeferLightPassData);
    }



    restore state:
    // gl.cullFace(gl.BACK);
    gl.disable(gl.SCISSOR_TEST);
}
