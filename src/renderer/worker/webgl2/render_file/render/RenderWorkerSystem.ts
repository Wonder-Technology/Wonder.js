import { Map } from "immutable";
import { IMaterialConfig } from "../../../../data/material_config_interface";
import { IRenderConfig } from "../../../both_file/data/render_config";
import { IShaderLibGenerator } from "../../../../data/shaderLib_generator_interface";
import { DeferDrawDataMap, InitShaderDataMap } from "../../../../type/utilsType";
import { render as basicRender } from "./basic/BasicRenderWorkerSystem";
import { render as deferRender } from "./light/defer/DeferShadingWorkerSystem";
import {
    init as initUtils,
    render as renderUtils,
    sendAttributeData as sendAttributeDataUtils
} from "../../../../webgl2/utils/worker/render_file/render/renderUtils";
import { RenderCommandBufferForDrawData } from "../../../../utils/worker/render_file/type/dataType";
import { WebGL2DrawDataMap } from "../../../../webgl2/utils/worker/render_file/type/utilsType";

export var init = initUtils;

export var render = (gl:any, state: Map<any, any>, render_config: IRenderConfig, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, DataBufferConfig: any, initMaterialShader: Function, drawDataMap: WebGL2DrawDataMap, deferDrawDataMap:DeferDrawDataMap, initShaderDataMap: InitShaderDataMap, renderCommandBufferForDrawData: RenderCommandBufferForDrawData) => {
    renderUtils(gl, state, render_config, material_config, shaderLib_generator, DataBufferConfig, initMaterialShader, basicRender, deferRender, drawDataMap, deferDrawDataMap, initShaderDataMap, renderCommandBufferForDrawData);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramWorkerData: any, GLSLSenderWorkerData: any, GeometryWorkerData: any, VaoWorkerData: any) => sendAttributeDataUtils(gl, shaderIndex, geometryIndex, ProgramWorkerData, GLSLSenderWorkerData, GeometryWorkerData, VaoWorkerData);


