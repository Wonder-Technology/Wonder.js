import { it, requireCheckFunc } from "../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { Shader } from "./Shader";

//todo refactor: with MeshRenderer
export var create = (ShaderData: any) => {
    var shader = new Shader(),
        index = _generateIndex(ShaderData);

    shader.index = index;

    ShaderData.count += 1;

    return shader;
}

export var init = (index:number, materialType:string, material_config) => {
    _buildGLSLSource();

    compile shader source

    store all attribute, uniform position


    _addSendAttributeConfig();
    _addSendUniformConfig();
}

// var _initShaderLibs = (index:number, materialType:string, material_config) => {
//     var shaderConfig = _getShaderConfig(materialType, material_config);
//
//      shaderConfig.shaderLib
// }

var _buildGLSLSource = () => {

}

var _addSendAttributeConfig = () => {

}

var _addSendUniformConfig = () => {

}

var _getShaderConfig = requireCheckFunc((materialType:string, material_config) => {
    it("materialType should be defined in material_config", () => {
        expect(material_config[materialType]).exist;
    })
}, (materialType:string, material_config) => {
    return material_config[materialType].shader;
})

export var sendAttributeData = () => {

}

export var sendUniformData = () => {

}

export var bindElementBuffer = () => {

}


add shader lib


compile:
    build shader source(vs, fs)
compile shader source


store all attribute, uniform position

export var getProgram = (index:number, ShaderData:any) => {
    return ShaderData.programMap[index];
}
