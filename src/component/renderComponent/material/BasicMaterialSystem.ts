import { BasicMaterial } from "./BasicMaterial";
import { create as createMaterial, initMaterial as initMaterialSystem } from "./MaterialSystem";
import { IMaterialConfig } from "../../../renderer/data/material_config";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator";
import { Map } from "immutable";

export var create = (ShaderData:any, MaterialData: any) => {
    var material = new BasicMaterial();

    material = createMaterial(material, "BasicMaterial", ShaderData, MaterialData);

    return material;
}

export var initMaterial = (state: Map<any, any>, materialIndex:number, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, ShaderData:any, MaterialData:any) => {
    initMaterialSystem(state, materialIndex, material_config, shaderLib_generator, MaterialData.materialClassNameMap, ShaderData, MaterialData);
}

