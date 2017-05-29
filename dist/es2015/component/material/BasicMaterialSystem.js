import { BasicMaterial } from "./BasicMaterial";
import { create as createMaterial, setShader } from "./MaterialSystem";
import { create as createShader } from "../../renderer/shader/ShaderSystem";
import { isValidMapValue } from "../../utils/objectUtils";
export var create = function (ShaderData, MaterialData) {
    var material = new BasicMaterial(), materialClassName = "BasicMaterial";
    material = createMaterial(material, materialClassName, MaterialData);
    setShader(material.index, _createShader(materialClassName, ShaderData), MaterialData);
    return material;
};
var _createShader = function (materialClassName, ShaderData) {
    var shaderMap = ShaderData.shaderMap, shader = shaderMap[materialClassName];
    if (isValidMapValue(shader)) {
        return shader;
    }
    shader = createShader(ShaderData);
    shaderMap[materialClassName] = shader;
    return shader;
};
//# sourceMappingURL=BasicMaterialSystem.js.map