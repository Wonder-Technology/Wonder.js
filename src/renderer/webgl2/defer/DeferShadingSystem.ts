// // import { bindGBufferTargets, init as initGBuffer, sendGBufferTargetData } from "./gbuffer/GBufferSystem";
// // import { draw as deferDraw } from "./draw/DeferDrawRenderCommandBufferSystem";
// import { DeferDrawDataMap, DrawDataMap, InitShaderDataMap } from "../../type/utilsType";
// import curry from "wonder-lodash/curry";
// import { RenderCommandBufferForDrawData } from "../../type/dataType";
// // import { getGL } from "../../device/DeviceManagerSystem";
// // import { init as initDeferLightPass } from "./light/DeferLightPassSystem";
// import { Map } from "immutable";
// // import { getNoMaterialShaderIndex, use } from "../../shader/ShaderSystem";
// import { IShaderLibGenerator } from "../../data/shaderLib_generator";
// import { IMaterialConfig } from "../../data/material_config";
// import { IRenderConfig } from "../../worker/both_file/data/render_config";
// import { draw as deferDraw, init as initUtils } from "../utils/defer/deferShadingUtils";
// import { getGL } from "../../worker/both_file/device/DeviceManagerWorkerSystem";
// import { bindIndexBuffer, sendAttributeData, use } from "../../shader/ShaderSystem";
// import {
//     getIndexType, getIndexTypeSize, getIndicesCount, getVerticesCount,
//     hasIndices
// } from "../../../component/geometry/GeometrySystem";
// import { bindAndUpdate, getMapCount } from "../../texture/MapManagerSystem";
// import { buildSendUniformDataDataMap, sendUniformData } from "../shader/ShaderSystem";
// // import { getColorArr3 as getAmbientLightColorArr3 } from "../../../component/light/AmbientLightSystem";
// // import {
// //     getColorArr3 as getDirectionLightColorArr3, getIntensity as getDirectionLightIntensity,
// //     getPosition as getDirectionLightPosition,
// // } from "../../../component/light/DirectionLightSystem";
// import {
//     getPosition as getPointLightPosition,
//     getColorArr3 as getPointLightColorArr3, getConstant,
//     getIntensity as getPointLightIntensity, getLinear, getQuadratic, getRange
// } from "../../../component/light/PointLightSystem";
// import { sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3 } from "../../shader/glslSender/GLSLSenderSystem";
// import { useShader } from "../../../component/material/MaterialSystem";
// import { buildDrawFuncDataMap } from "../utils/draw/drawRenderCommandBufferUtils";
// import { bindGBuffer, getNewTextureUnitIndex, unbindGBuffer } from "../utils/defer/gbuffer/gBufferUtils";
// import { computeRadius } from "../light/PointLightSystem";
//
// export var init = initUtils;
//
// export var draw = curry((state: Map<any, any>, render_config:IRenderConfig, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, DataBufferConfig: any, initMaterialShader:Function, drawDataMap: DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap:InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, bufferData: RenderCommandBufferForDrawData) => {
//     deferDraw(getGL(drawDataMap.DeviceManagerDataFromSystem, state), state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, buildDrawFuncDataMap(bindIndexBuffer, sendAttributeData, sendUniformData, directlySendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount, bindAndUpdate, getMapCount, useShader, bindGBuffer, unbindGBuffer, getNewTextureUnitIndex), drawDataMap, deferDrawDataMap, buildSendUniformDataDataMap(
//         getUniformData, sendFloat1, sendFloat3, sendMatrix4, sendVector3, sendInt, sendMatrix3,
//         // getAmbientLightColorArr3,
//         // getDirectionLightColorArr3, getDirectionLightIntensity, getDirectionLightPosition,
//         getPointLightPosition, getPointLightColorArr3, getConstant, getPointLightIntensity, getLinear, getQuadratic, getRange, computeRadius,
//         drawDataMap,  ThreeDTransformData, GameObjectData
//     ), initShaderDataMap, bufferData);
// })
