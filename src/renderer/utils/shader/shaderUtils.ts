import { IMaterialConfig } from "../../data/material_config";
import {
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
import { DrawDataMap, InitShaderDataMap, SendUniformDataDataMap } from "../../type/utilsType";
import { GetArrayBufferDataFuncMap } from "../../../definition/type/geometryType";
import { getMaterialShaderLibNameArr } from "./shaderSourceBuildUtils";
import { setEmptyLocationMap } from "./location/locationUtils";

export var init = (state: Map<any, any>, materialIndex: number, shaderIndex: number, materialClassName: string, material_config: IMaterialConfig, shaderLib_generator: IShaderLibGenerator, buildGLSLSource: Function, getGL: Function, initShaderDataMap:InitShaderDataMap) => {
    var {
            DeviceManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem
        } = initShaderDataMap,
        program = getProgram(shaderIndex, ProgramDataFromSystem);

    if (isProgramExist(program)) {
        return;
    }

    let materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config),
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups),
        shaderLibDataFromSystem = shaderLib_generator.shaderLibs,
        {
            vsSource,
            fsSource
        } = buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap),
        gl = getGL(DeviceManagerDataFromSystem, state);

    program = gl.createProgram();

    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);

    // setLocationMap(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, LocationDataFromSystem);
    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);

    addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryWorkerDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    sendAttributeDataProgram(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
}

export var sendUniformData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, sendDataMap:SendUniformDataDataMap, drawDataMap:DrawDataMap, renderCommandUniformData: RenderCommandUniformData) => {
    sendUniformDataProgram(gl, shaderIndex, program, sendDataMap, drawDataMap, renderCommandUniformData);
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

