import { IMaterialConfig } from "../../../../../data/material_config_interface";
import { Map } from "immutable";
import { IShaderLibGenerator } from "../../../../../data/shaderLib_generator_interface";
import { IWebGL2DeferDrawFuncDataMap } from "../../../../interface/IDraw";
import { IWebGL2DrawDataMap, IWebGL2LightSendUniformDataDataMap } from "../../../worker/render_file/interface/IUtils";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { LightRenderUniformData } from "../../../../../type/dataType";
import { LightRenderCommandBufferForDrawData } from "../../../../../utils/worker/render_file/type/dataType";
import {
    clear, setBlend, setDepthTest,
    setDepthWrite
} from "../../../../../utils/worker/both_file/device/deviceManagerUtils";
import { drawGameObjects } from "../../../worker/render_file/draw/drawRenderCommandBufferUtils";
import { getNewTextureUnitIndex } from "../../../worker/render_file/render/light/defer/gbuffer/gBufferUtils";

export var drawGBufferPass = (gl: any, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawFuncDataMap:IWebGL2DeferDrawFuncDataMap, drawDataMap: IWebGL2DrawDataMap, {
    GBufferDataFromSystem
}, initShaderDataMap: InitShaderDataMap, sendDataMap:IWebGL2LightSendUniformDataDataMap, renderCommandUniformData: LightRenderUniformData, bufferData: LightRenderCommandBufferForDrawData) => {
    var {
        DeviceManagerDataFromSystem
    } = drawDataMap;

    setDepthWrite(gl, true, DeviceManagerDataFromSystem);

    drawFuncDataMap.bindGBuffer(gl, GBufferDataFromSystem);

    clear(gl, drawDataMap.DeviceManagerDataFromSystem);

    setDepthTest(gl, true, DeviceManagerDataFromSystem);
    setBlend(gl, false, DeviceManagerDataFromSystem);

    drawGameObjects(gl, state, material_config, shaderLib_generator, DataBufferConfig, getNewTextureUnitIndex(), "GBuffer", initMaterialShader, drawFuncDataMap, drawDataMap, initShaderDataMap, sendDataMap, renderCommandUniformData, bufferData);
}
