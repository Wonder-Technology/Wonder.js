import { IRenderConfig } from "../../both_file/data/render_config";
import { Map } from "immutable";
export declare var clearColor: (state: Map<any, any>, render_config: IRenderConfig, DeviceManagerWorkerData: any) => void;
export declare var commitGL: (gl: any, state: Map<any, any>) => Map<any, any>;
export declare var initData: (BasicDrawRenderCommandBufferDataFromSystem: any, LightDrawRenderCommandBufferDataFromSystem: any) => void;
