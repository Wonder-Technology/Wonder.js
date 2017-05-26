import { BasicMaterial } from "./BasicMaterial";
import { create as createMaterial } from "./MaterialSystem";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { isValidMapValue } from "../../utils/objectUtils";

export var create = (ShaderData:any, MaterialData: any) => {
    var material = new BasicMaterial(),
        materialClassName = "BasicMaterial";

    material = createMaterial(material, materialClassName, MaterialData);

    MaterialData.shaderMap[material.index] = _createShader(materialClassName, ShaderData);

    return material;
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
