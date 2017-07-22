import { Map } from "immutable";
import { DrawDataMap } from "../../../type/utilsType";
import { RenderCommandBufferForDrawData } from "../../../type/dataType";
import { IRenderConfig } from "../../../data/render_config";
export declare var clear: (state: Map<any, any>, render_config: IRenderConfig, DeviceManagerWorkerData: any) => RenderCommandBufferForDrawData;
export declare var draw: (state: Map<any, any>, DataBufferConfig: any, drawDataMap: DrawDataMap, bufferData: RenderCommandBufferForDrawData) => void;
export declare var initData: (DrawRenderCommandBufferDataFromSystem: any) => void;
