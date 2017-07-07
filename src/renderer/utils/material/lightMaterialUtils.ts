import { getColorArr3Data, getSingleSizeData } from "./materialUtils";

export var getSpecularColorArr3 = (materialIndex: number, LightMaterialData: any) => {
    return getColorArr3Data(materialIndex, LightMaterialData.specularColors);
}

export var getEmissionColorArr3 = (materialIndex: number, LightMaterialData: any) => {
    return getColorArr3Data(materialIndex, LightMaterialData.emissionColors);
}

export var getShininess = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shininess);
}

export var getShading = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.shadings);
}

export var getLightModel = (materialIndex: number, LightMaterialDataFromSystem: any) => {
    return getSingleSizeData(materialIndex, LightMaterialDataFromSystem.lightModels);
}
