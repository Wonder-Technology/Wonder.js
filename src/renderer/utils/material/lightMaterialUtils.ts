import { getColorDataSize } from "./materialUtils";
import { getLightMaterialBufferStartIndex } from "./bufferUtils";
import { getColorArr3Data, getSingleSizeData } from "../common/operateBufferDataUtils";
import { setTypeArrayValue } from "../../../utils/typeArrayUtils";

export var getShadingDataSize = () => 1;

export var getLightModelDataSize = () => 1;

export var getShininessDataSize = () => 1;

export var getMapSize = () => 1;

export var getSpecularColorArr3 = (index: number, LightMaterialDataFromSystem: any) => {
    return getColorArr3Data(index, LightMaterialDataFromSystem.specularColors);
}

export var getEmissionColorArr3 = (index: number, LightMaterialDataFromSystem: any) => {
    return getColorArr3Data(index, LightMaterialDataFromSystem.emissionColors);
}

export var getShininess = (index: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(index, LightMaterialDataFromSystem.shininess);
}

export var getShading = (index: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(index, LightMaterialDataFromSystem.shadings);
}

export var getLightModel = (index: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(index, LightMaterialDataFromSystem.lightModels);
}

export var hasDiffuseMap = (index:number, LightMaterialDataFromSystem: any) => {
    return _hasMap(index, LightMaterialDataFromSystem.hasDiffuseMaps, LightMaterialDataFromSystem);
}

export var hasSpecularMap = (index:number, LightMaterialDataFromSystem: any) => {
    return _hasMap(index, LightMaterialDataFromSystem.hasSpecularMaps, LightMaterialDataFromSystem);
}

export var markHasMap = (index:number, hasMapTypArray:Uint8Array) => {
    setTypeArrayValue(hasMapTypArray, computeLightBufferIndex(index), 1);
}

export var markNotHasMap = (index:number, hasMapTypArray:Uint8Array) => {
    setTypeArrayValue(hasMapTypArray, computeLightBufferIndex(index), getNotHasMapValue());
}

export var getNotHasMapValue = () => 0;

var _hasMap = (index:number, hasMapTypArray:Uint8Array, LightMaterialDataFromSystem:any) => {
    return getSingleSizeData(index, hasMapTypArray) !== getNotHasMapValue();
}

export var computeLightBufferIndex = (index: number) => index - getLightMaterialBufferStartIndex();


export var createTypeArrays = (buffer: any, offset: number, count: number, LightMaterialDataFromSystem: any) => {
    LightMaterialDataFromSystem.specularColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialDataFromSystem.emissionColors = new Float32Array(buffer, offset, count * getColorDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getColorDataSize();

    LightMaterialDataFromSystem.shininess = new Float32Array(buffer, offset, count * getShininessDataSize());
    offset += count * Float32Array.BYTES_PER_ELEMENT * getShininessDataSize();

    LightMaterialDataFromSystem.shadings = new Uint8Array(buffer, offset, count * getShadingDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getShadingDataSize();

    LightMaterialDataFromSystem.lightModels = new Uint8Array(buffer, offset, count * getLightModelDataSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getLightModelDataSize();

    LightMaterialDataFromSystem.hasDiffuseMaps = new Uint8Array(buffer, offset, count * getMapSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getMapSize();

    LightMaterialDataFromSystem.hasSpecularMaps = new Uint8Array(buffer, offset, count * getMapSize());
    offset += count * Uint8Array.BYTES_PER_ELEMENT * getMapSize();

    return offset;
}

export var getClassName = () => "LightMaterial";
