import { Map } from "immutable";
import { RenderCommandBufferWorkerData } from "../../type/dataType";
import { IRenderConfig } from "../../data/render_config";
export declare var clear: (gl: WebGLRenderingContext, clearGL: Function, render_config: IRenderConfig, DeviceManagerDataFromSystem: any, data: RenderCommandBufferWorkerData) => RenderCommandBufferWorkerData;
export declare var buildDrawDataMap: (DeviceManagerDataFromSystem: any, MaterialDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryDataFromSystem: any, ArrayBufferDataFromSystem: any, IndexBufferDataFromSystem: any, DrawRenderCommandBufferDataFromSystem: any) => {
    DeviceManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandBufferDataFromSystem: any;
};
export declare var buildDrawFuncDataMap: (bindIndexBuffer: Function, sendAttributeData: Function, sendUniformData: Function, use: Function, hasIndices: Function, getIndicesCount: Function, getIndexType: Function, getIndexTypeSize: Function, getVerticesCount: Function) => {
    bindIndexBuffer: Function;
    sendAttributeData: Function;
    sendUniformData: Function;
    use: Function;
    hasIndices: Function;
    getIndicesCount: Function;
    getIndexType: Function;
    getIndexTypeSize: Function;
    getVerticesCount: Function;
};
export declare var draw: (gl: WebGLRenderingContext, state: Map<any, any>, DataBufferConfig: any, {bindIndexBuffer, sendAttributeData, sendUniformData, use, hasIndices, getIndicesCount, getIndexType, getIndexTypeSize, getVerticesCount}: {
    bindIndexBuffer: any;
    sendAttributeData: any;
    sendUniformData: any;
    use: any;
    hasIndices: any;
    getIndicesCount: any;
    getIndexType: any;
    getIndexTypeSize: any;
    getVerticesCount: any;
}, {DeviceManagerDataFromSystem, MaterialDataFromSystem, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryDataFromSystem, ArrayBufferDataFromSystem, IndexBufferDataFromSystem, DrawRenderCommandBufferDataFromSystem}: {
    DeviceManagerDataFromSystem: any;
    MaterialDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    GeometryDataFromSystem: any;
    ArrayBufferDataFromSystem: any;
    IndexBufferDataFromSystem: any;
    DrawRenderCommandBufferDataFromSystem: any;
}, bufferData: RenderCommandBufferWorkerData) => Map<any, any>;
export declare var initData: (DrawRenderCommandBufferDataFromSystem: any) => void;
