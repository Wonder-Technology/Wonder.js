import { Map } from "immutable";
import { IMaterialConfig } from "../../../data/material_config_interface";
import { IShaderLibGenerator } from "../../../data/shaderLib_generator_interface";
export declare const initMaterial: (index: number, state: Map<any, any>, className: string, MaterialWorkerData: any) => void;
export declare const initNewInitedMaterials: (workerInitList: {
    index: number;
    className: string;
}[], MaterialWorkerData: any) => void;
export declare const useShader: (index: number, shaderName: string, state: Map<any, any>, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initMaterialShader: Function, initShaderDataMap: {
    GPUDetectDataFromSystem: any;
    DeviceManagerDataFromSystem: any;
    ProgramDataFromSystem: any;
    LocationDataFromSystem: any;
    GLSLSenderDataFromSystem: any;
    ShaderDataFromSystem: any;
    MaterialDataFromSystem: any;
    BasicMaterialDataFromSystem: any;
    LightMaterialDataFromSystem: any;
    MapManagerDataFromSystem: any;
    AmbientLightDataFromSystem: any;
    DirectionLightDataFromSystem: any;
    PointLightDataFromSystem: any;
    VaoDataFromSystem: any;
}) => any;
export declare const getColorArr3: (index: number, DataFromSystem: any) => number[];
export declare const getOpacity: (materialIndex: number, MaterialDataFromSystem: any) => number;
export declare const getAlphaTest: (materialIndex: number, MaterialDataFromSystem: any) => number;
export declare const isTestAlpha: (alphaTest: number) => boolean;
