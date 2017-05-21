import { init as initShader } from "../../../renderer/shader/ShaderSystem";
import { IMaterialConfig } from "../../../renderer/data/material_config";
import { IShaderLibGenerator } from "../../../renderer/data/shaderLib_generator";
import { Map } from "immutable";

export var init = (state: Map<any, any>, material_config:IMaterialConfig, shaderLib_generator:IShaderLibGenerator, ShaderData:any, MaterialData:any) => {
    var shaderMap = MaterialData.shaderMap,
        materialClassNameMap = MaterialData.materialClassNameMap;

    //todo add contract check(index === count?)
    for(let i = 0, count = MaterialData.count; i < count; i++){
        let shader = getShader(i, MaterialData),
            materialClassName = materialClassNameMap[i];

        initShader(state, shader.index, materialClassName, material_config, shaderLib_generator, ShaderData);

        // setSendAttributeConfigMap(shaderIndex);
    }
}

// export var createShader = (materialConfig) => {
//     return new Shader();
// }

export var getShader = (materialIndex:number, MaterialData:any) => {
    return MaterialData.shaderMap[materialIndex];
}


export var initData = (MaterialData:any) => {
    MaterialData.shaderMap = {};
    MaterialData.materialClassNameMap = {};

    MaterialData.index = 0;
    MaterialData.count = 0;
}
