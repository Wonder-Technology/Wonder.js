import { registerClass } from "../../definition/typescript/decorator/registerClass";
import { Material } from "./Material";
import { create } from "./BasicMaterialSystem";
import { ShaderData } from "../../renderer/shader/ShaderData";
import { MaterialData } from "./MaterialData";

@registerClass("BasicMaterial")
export class BasicMaterial extends Material{
}

export var createBasicMaterial = () => {
    return create(ShaderData, MaterialData);
}
