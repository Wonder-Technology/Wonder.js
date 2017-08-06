import { addSendAttributeConfig, addSendUniformConfig } from "./shader/glslSender/glslSenderUtils";
import { IWebGL1ShaderLibConfig, IWebGL1ShaderLibContentGenerator } from "../data/shaderLib_generator";
import { InitShaderDataMap, InitShaderFuncDataMap } from "../../type/utilsType";
import { Map } from "immutable";
import { isValidMapValue } from "../../../utils/objectUtils";
import { getProgram, initShader, isProgramExist, registerProgram } from "../../utils/shader/program/programUtils";
import { setEmptyLocationMap } from "../../utils/shader/location/locationUtils";
import { getMaterialShaderLibNameArr } from "./shader/shaderSourceBuildUtils";
import { getMaterialShaderLibConfig } from "../data/MaterialConfigSystem";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../data/material_config";

export var initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
        } = initShaderDataMap,
        shaderIndex = _init(state, null, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);

    _setShaderIndexMap(shaderName, shaderIndex, ShaderDataFromSystem);
}

export var initMaterialShader = (state: Map<any, any>, materialIndex:number, shaderName:string, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return _init(state, materialIndex, getMaterialShaderLibConfig(shaderName, material_config), material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);
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
        shaderIndex = _genereateShaderIndex(materialShaderLibNameArr, ShaderDataFromSystem),
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

var _setShaderIndexMap = (shaderName:string, shaderIndex:number, ShaderData:any) => {
    ShaderData.shaderIndexMap[shaderName] = shaderIndex;
}

var _genereateShaderIndex = (materialShaderLibNameArr: Array<string>, ShaderDataFromSystem: any) => {
    var shaderLibWholeName = materialShaderLibNameArr.join(''),
        index = ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName];

    if (isValidMapValue(index)) {
        return index;
    }

    index = ShaderDataFromSystem.index;

    ShaderDataFromSystem.index += 1;

    ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName] = index;

    return index;
}
