import { IMaterialConfig } from "../../data/material_config";
import {
    IShaderLibContentGenerator,
    IShaderLibGenerator
} from "../../data/shaderLib_generator";
import { Map } from "immutable";
// import { setLocationMap } from "./location/locationUtils";
import {
    getMaterialShaderLibConfig, getProgram, initShader, isProgramExist,
    registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram
} from "./program/programUtils";
import { addSendAttributeConfig, addSendUniformConfig } from "./glslSender/glslSenderUtils";
import { MaterialDataMap, RenderCommandUniformData } from "../../type/dataType";
import { getOrCreateBuffer } from "../buffer/indexBufferUtils";
import { DrawDataMap, InitShaderDataMap, InitShaderFuncDataMap, SendUniformDataDataMap } from "../../type/utilsType";
import { GetArrayBufferDataFuncMap } from "../../../definition/type/geometryType";
import { getMaterialShaderLibNameArr } from "./shaderSourceBuildUtils";
import { setEmptyLocationMap } from "./location/locationUtils";
import { isValidMapValue } from "../../../utils/objectUtils";

export var init = (state: Map<any, any>, materialIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, initShaderFuncDataMap:InitShaderFuncDataMap, initShaderDataMap:InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
            DeviceManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem
        } = initShaderDataMap,
        materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config),
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap),
        shaderIndex = _genereateShaderIndex(materialShaderLibNameArr, ShaderDataFromSystem),
        program = getProgram(shaderIndex, ProgramDataFromSystem),
        shaderLibDataFromSystem:IShaderLibContentGenerator = null,
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

    // setLocationMap(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, LocationDataFromSystem);
    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);

    addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);

    return shaderIndex;
}

var _genereateShaderIndex = (materialShaderLibNameArr:Array<string>, ShaderDataFromSystem:any) => {
    var shaderLibWholeName = materialShaderLibNameArr.join(''),
        index = ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName];

    if(isValidMapValue(index)){
        return index;
    }

    index = ShaderDataFromSystem.index;

    ShaderDataFromSystem.index += 1;

    ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName] = index;

    return index;
}


export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryWorkerDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    sendAttributeDataProgram(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, mapCount:number, sendDataMap:SendUniformDataDataMap, drawDataMap:DrawDataMap, renderCommandUniformData: RenderCommandUniformData) => {
    sendUniformDataProgram(gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData);
}

export var bindIndexBuffer = (gl: WebGLRenderingContext, geometryIndex: number, getIndicesFunc: Function, ProgramDataFromSystem: any, GeometryWorkerDataFromSystem: any, IndexBufferDataFromSystem: any) => {
    var buffer = getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem);

    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }

    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
}

export var use = (gl: WebGLRenderingContext, shaderIndex: number, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any) => {
    return useProgram(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
}

