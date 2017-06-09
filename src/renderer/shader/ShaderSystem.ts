import { Shader } from "./Shader";
import { createMap } from "../../utils/objectUtils";
import { isValidMapValue } from "../../../dist/commonjs/utils/objectUtils";
import { getShaderIndexFromTable } from "../../component/material/MaterialSystem";

export var create = (materialClassName:string, MaterialData:any, ShaderData: any) => {
    var index = getShaderIndexFromTable(materialClassName, MaterialData.shaderIndexTable),
        shader = ShaderData.shaderMap[index];

    if(_isShaderExist(shader)){
        return shader;
    }

    shader = new Shader();

    shader.index = index;

    ShaderData.count += 1;

    return shader;
}

var _isShaderExist = (shader:Shader) => isValidMapValue(shader);

// export var dispose = (gl: WebGLRenderingContext, shaderIndex: number, ShaderData: any) => {
//     //todo finish
//
//     // _disposeProgram(gl, ShaderData.programMap[shaderIndex]);
//     // deleteVal(shaderIndex, ShaderData.programMap);
//
//
//     // deleteVal(shaderIndex, LocationData.attributeLocationMap);
//     // deleteVal(shaderIndex, LocationData.uniformLocationMap);
//     // deleteVal(shaderIndex, ShaderData.sendAttributeConfigMap);
//     // deleteVal(shaderIndex, ShaderData.sendUniformConfigMap);
//     // deleteVal(shaderIndex, ShaderData.vertexAttribHistory);
//     // deleteVal(shaderIndex, ShaderData.shaderMap);
// }

// var _disposeProgram = (gl:WebGLRenderingContext, program:WebGLProgram) => {
//     gl.deleteProgram(this.glProgram);
// }

export var initData = (ShaderData: any) => {
    ShaderData.index = 0;
    ShaderData.count = 0;

    ShaderData.shaderMap = createMap();
    // ShaderData.isInitMap = createMap();
}
