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



export var draw = curry((state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => {
    _drawGBufferPass();
    _drawLightPass();
});

var _drawGBufferPass = () => {
    bind gbuffer textures

    // use program(use gbuffer shader -> program)




    set state

    // clear(null, render_config, DeviceManagerData),
    clear

    use program(use gbuffer shader -> program)
    bind gbuffer


    bind and update all possible textures(no gbuffer texture)
    (only update the same texture once)

    send texture data(no gbuffer texture)
    (send all possible textures' unit)


    draw each gameObjects:
        // bind and update texture(no gbuffer texture)
    // (only update the same texture once)

        // send texture data(no gbuffer texture)

    send attribute
    send uniform
    draw element/array
    // drawUtils(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, DataBufferConfig, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount), drawDataMap, bufferData)
}

var _drawLightPass = () => {
    not bind gbuffer
    use program(use light pass shader -> program )

    bind texture(gbuffer texture )
    send texture data(gbuffer texture )
    // gl.uniform1i(positionBufferLocation, 0);
    // gl.uniform1i(normalBufferLocation, 1);
    // gl.uniform1i(uVBufferLocation, 2);

    set state

    // clear(null, render_config, DeviceManagerData),
    clear

    gl.enable(gl.SCISSOR_TEST);


    // bind and update texture

    // send uniform data

    // send texture data


    //todo support ambient, direction light

    draw point light:
        send attribute(sphere)
    send uniform(light)
    draw element / array


    restore state:
    gl.cullFace(gl.BACK);
    gl.disable(gl.SCISSOR_TEST);
}
