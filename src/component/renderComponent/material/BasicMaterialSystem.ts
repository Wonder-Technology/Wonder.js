import { BasicMaterial } from "./BasicMaterial";
import { Color } from "../../../structure/Color";
import { create as createShader } from "../../../renderer/shader/ShaderSystem";

//todo refactor: with MeshRenderer
export var create = (ShaderData:any, MaterialData: any) => {
    var material = new BasicMaterial(),
        index = _generateIndex(MaterialData);

    material.index = index;

    MaterialData.count += 1;

    MaterialData.shaderMap[index] = _createShader(ShaderData);

    MaterialData.materialClassNameMap[index] = "BasicMaterial";

    return material;
}

var _createShader = (ShaderData:any) => {
    return createShader(ShaderData);
}

export var setColor = (material:BasicMaterial, color:Color, BasicMaterialData:any) => {

}

