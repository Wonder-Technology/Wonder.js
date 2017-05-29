/// <reference types="wonder-commonlib" />
/// <reference types="wonder-frp" />
import { DomQuery as DomQueryFromCommonlib } from "wonder-commonlib/dist/commonjs/utils/DomQuery";
import { Operator } from "wonder-frp/dist/commonjs/global/Operator";
import { Map } from "immutable";
import { RenderCommand } from "../renderer/command/RenderCommand";
import { DataUtils as DataUtilsUtils } from "../utils/DataUtils";
export declare var initThreeDTransformData: (GlobalTempData: any, ThreeDTransformData: any) => void;
export declare var DomQuery: typeof DomQueryFromCommonlib;
export declare var fromArray: typeof Operator.fromArray;
export declare var initTagData: (TagData: any) => void;
export declare var initGeometryData: (DataBufferConfig: any, GeometryData: any) => void;
export declare var initMaterialData: (MaterialData: any) => void;
export declare var initShaderData: (ShaderData: any) => void;
export declare var initMeshRendererData: (MeshRendererData: any) => void;
export declare var initArrayBufferData: (ArrayBufferData: any) => void;
export declare var initIndexBufferData: (IndexBufferData: any) => void;
export declare var initDeviceManagerData: (DeviceManagerData: any) => void;
export declare var initCameraControllerData: (CameraControllerData: any, PerspectiveCameraData: any, CameraData: any) => void;
export declare var initGameObjectData: (GameObjectData: any) => void;
export declare var createState: () => Map<{}, {}>;
export declare var useProgram: (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => void;
export declare var sendAttributeData: (gl: WebGLRenderingContext, shaderIndex: number, geometryIndex: number, ShaderData: any, GeometryData: any, ArrayBufferData: any) => void;
export declare var sendUniformData: (gl: WebGLRenderingContext, shaderIndex: number, MaterialData: any, ShaderData: any, renderCommand: RenderCommand) => void;
export declare var disableVertexAttribArray: Function;
export declare var DataUtils: typeof DataUtilsUtils;
