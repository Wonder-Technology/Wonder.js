import { init as initShader } from "../../../renderer/shader/ShaderSystem";

export var init = (material_config, MaterialData:any) => {
    var shaderMap = MaterialData.shaderMap,
        materialTypeMap = MaterialData.materialTypeMap;

    //todo add contract check(index === count?)
    for(let i = 0, count = MaterialData.count; i < count; i++){
        let shader = getShader(i, MaterialData),
            materialType = materialTypeMap[i];

        initShader(shader.index, materialType, material_config);

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
    MaterialData.index = 0;
    MaterialData.count = 0;
}
