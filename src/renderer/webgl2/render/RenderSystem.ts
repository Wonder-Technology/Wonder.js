import {
    init as initUtils, render as renderUtils,
    sendAttributeData as sendAttributeDataUtils
} from "../utils/worker/render_file/render/renderUtils";
import curry from "wonder-lodash/curry";
import { IRenderConfig } from "../../worker/both_file/data/render_config";
import { getGL } from "../../device/DeviceManagerSystem";
import { Map } from "immutable";
import { DeferDrawDataMap, InitShaderDataMap } from "../../type/utilsType";
import { IMaterialConfig } from "../../data/material_config_interface";
import { IShaderLibGenerator } from "../../data/shaderLib_generator_interface";
import { render as basicRender } from "./basic/BasicRenderSystem";
import { render as deferRender} from "./light/defer/DeferShadingSystem";
import { RenderCommandBufferForDrawData } from "../../utils/worker/render_file/type/dataType";
import { IWebGL2DrawDataMap } from "../utils/worker/render_file/interface/IUtils";

export var init = initUtils;

export var render = curry((state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: IWebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, ThreeDTransformData: any, GameObjectData: any, renderCommandBufferForDrawData:RenderCommandBufferForDrawData) => {
    var {
            DeviceManagerDataFromSystem
        } = drawDataMap,
        gl = getGL(DeviceManagerDataFromSystem, state);

    renderUtils(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender(ThreeDTransformData, GameObjectData), drawDataMap, deferDrawDataMap, initShaderDataMap, renderCommandBufferForDrawData);
})

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData: any, GLSLSenderData: any, GeometryData: any, VaoData: any) => sendAttributeDataUtils(gl, shaderIndex, geometryIndex, ProgramData, GLSLSenderData, GeometryData, VaoData);


