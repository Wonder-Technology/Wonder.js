import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Material } from "./Material";
import { create, initMaterial } from "./BasicMaterialSystem";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { MaterialData } from "./MaterialData";
import { getState } from "../../core/DirectorSystem";
import { DirectorData } from "../../core/DirectorData";
import { material_config } from "../../renderer/data/material_config";
import { shaderLib_generator } from "../../renderer/data/shaderLib_generator";

@registerClass("BasicMaterial")
export class BasicMaterial extends Material{
}

export var createBasicMaterial = () => {
    return create(ShaderData, MaterialData);
}

export var initBasicMaterial = (material:BasicMaterial) => {
    initMaterial(getState(DirectorData), material.index, material_config, shaderLib_generator as any, ShaderData, MaterialData);
}
