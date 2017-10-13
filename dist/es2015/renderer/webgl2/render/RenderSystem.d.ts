import { IRenderConfig } from "../../worker/both_file/data/render_config";
export declare const init: (gl: any, render_config: IRenderConfig, DataBufferConfig: any, GBufferDataFromSystem: any, DeferAmbientLightPassDataFromSystem: any, DeferDirectionLightPassDataFromSystem: any, DeferPointLightPassDataFromSystem: any, ShaderDataFromSystem: any, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GPUDetectDataFromSystem: any) => void;
export declare const render: any;
export declare const sendAttributeData: (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ProgramData: any, GLSLSenderData: any, GeometryData: any, VaoData: any) => void;
