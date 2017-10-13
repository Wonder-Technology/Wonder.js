import { IRenderConfig } from "../../both_file/data/render_config";
import { Map } from "immutable";
export declare const clearColor: (state: Map<any, any>, render_config: IRenderConfig, DeviceManagerWorkerData: any) => void;
export declare const commitGL: (gl: any, state: Map<any, any>) => Map<any, any>;
export declare const initData: (BasicDrawRenderCommandBufferDataFromSystem: any, LightDrawRenderCommandBufferDataFromSystem: any) => void;
