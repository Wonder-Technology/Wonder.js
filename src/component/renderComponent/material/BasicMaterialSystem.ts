import { BasicMaterial } from "./BasicMaterial";
import { create as createMaterial, initMaterial as initMaterialSystem } from "./MaterialSystem";
import { IMaterialConfig } from "../../../renderer/data/material_config";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator";
import { Map } from "immutable";
import { create as createShader } from "../../../renderer/shader/ShaderSystem";
import { isValidMapValue } from "../../../utils/objectUtils";

export var create = (ShaderData:any, MaterialData: any) => {
    var material = new BasicMaterial(),
        materialClassName = "BasicMaterial";

    material = createMaterial(material, materialClassName, MaterialData);

    MaterialData.shaderMap[material.index] = _createShader(materialClassName, ShaderData);

    return material;
}

export var initMaterial = (state: Map<any, any>, materialIndex:number, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, ShaderData:any, MaterialData:any) => {
    initMaterialSystem(state, materialIndex, material_config, shaderLib_generator, MaterialData.materialClassNameMap, ShaderData, MaterialData);
}

var _createShader = (materialClassName:string, ShaderData:any) => {
    var shaderMap = ShaderData.shaderMap,
        shader = shaderMap[materialClassName];

    if(isValidMapValue(shader)){
        return shader;
    }

    shader = createShader(ShaderData);

    shaderMap[materialClassName] = shader;

    return shader;
}
