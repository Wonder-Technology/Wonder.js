import { BasicMaterial } from "./BasicMaterial";
import { create as createMaterial, setShaderIndex } from "./MaterialSystem";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
export var create = function (ShaderData, MaterialData) {
    var material = new BasicMaterial(), materialClassName = "BasicMaterial";
    material = createMaterial(material, materialClassName, MaterialData);
    setShaderIndex(material.index, createShader(materialClassName, MaterialData, ShaderData), MaterialData);
    return material;
};
//# sourceMappingURL=BasicMaterialSystem.js.map