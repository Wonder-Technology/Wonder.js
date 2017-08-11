import { addSendAttributeConfig, addSendUniformConfig } from "./shader/glslSender/glslSenderUtils";
import { IWebGL1ShaderLibConfig, IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { DrawDataMap, InitShaderDataMap, InitShaderFuncDataMap } from "../../type/utilsType";
import { Map } from "immutable";
import { getProgram, initShader, isProgramExist, registerProgram } from "../../utils/shader/program/programUtils";
import { setEmptyLocationMap } from "../../utils/shader/location/locationUtils";
import { getMaterialShaderLibNameArr } from "./shader/shaderSourceBuildUtils";
import { getMaterialShaderLibConfig } from "../data/MaterialConfigSystem";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../data/material_config";
import { genereateShaderIndex, initShader as initShaderUtils } from "../../utils/shader/shaderUtils";

export var initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    initShaderUtils(state, null, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

export var initMaterialShader = (state: Map<any, any>, materialIndex:number, shaderName:string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return initShaderUtils(state, materialIndex, shaderName, getMaterialShaderLibConfig(shaderName, material_config), material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

var _init = (state: Map<any, any>, materialIndex:number|null, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
            DeviceManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem
        } = initShaderDataMap,
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap),
        shaderIndex = genereateShaderIndex(ShaderDataFromSystem),
        program = getProgram(shaderIndex, ProgramDataFromSystem),
        shaderLibDataFromSystem: IWebGL1ShaderLibConfig = null,
        gl = null;

    if (isProgramExist(program)) {
        return shaderIndex;
    }

    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;

    let {
        vsSource,
        fsSource
    } = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap);

    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);

    program = gl.createProgram();

    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);

    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);

    addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);

    return shaderIndex;
}
