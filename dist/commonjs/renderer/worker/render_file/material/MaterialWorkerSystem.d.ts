import { Map } from "immutable";
import { BasicMaterialInitWorkerData, LightMaterialInitWorkerData, MaterialInitWorkerData } from "./MaterialWorkerData";
import { TextureInitWorkerData } from "../../../type/messageDataType";
export declare var initMaterials: (basicMaterialData: BasicMaterialInitWorkerData, lightMaterialData: LightMaterialInitWorkerData, gl: WebGLRenderingContext, TextureWorkerData: any) => void;
export declare var initMaterial: (index: number, state: Map<any, any>, className: string) => void;
export declare var initNewInitedMaterials: (workerInitList: {
    index: number;
    className: string;
}[]) => void;
export declare var getColorArr3: (index: number, DataFromSystem: any) => number[];
export declare var getOpacity: (materialIndex: number, MaterialDataFromSystem: any) => number;
export declare var getAlphaTest: (materialIndex: number, MaterialDataFromSystem: any) => number;
export declare var isTestAlpha: (alphaTest: number) => boolean;
export declare var initData: (materialData: MaterialInitWorkerData, textureData: TextureInitWorkerData, TextureCacheWorkerData: any, TextureWorkerData: any, MapManagerWorkerData: any, MaterialWorkerData: any, BasicMaterialWorkerData: any, LightMaterialWorkerData: any) => void;
