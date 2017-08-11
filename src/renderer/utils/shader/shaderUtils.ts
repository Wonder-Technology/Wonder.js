import { Map } from "immutable";
import {
    sendAttributeData as sendAttributeDataProgram,
    use as useProgram
} from "./program/programUtils";
import { getOrCreateBuffer } from "../buffer/indexBufferUtils";
import { GetArrayBufferDataFuncMap } from "../../../definition/type/geometryType";
import { IMaterialConfig, IShaderLibItem, MaterialShaderLibConfig } from "../../data/material_config";
import { InitShaderDataMap, InitShaderFuncDataMap } from "../../type/utilsType";
//todo fix not import worker/ files
import { IWebGL2ShaderLibContentGenerator } from "../../worker/webgl2/both_file/data/shaderLib_generator";
import { IWebGL1ShaderLibContentGenerator } from "../../worker/webgl1/both_file/data/shaderLib_generator";
import { isNotUndefined } from "../../../utils/JudgeUtils";

export var initShader = (state: Map<any, any>, materialIndex:number | null, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL1ShaderLibContentGenerator | IWebGL2ShaderLibContentGenerator, init:Function, initShaderFuncDataMap: InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
        } = initShaderDataMap,
        key = buildShaderIndexByMaterialIndexAndShaderNameMapKey(materialIndex, shaderName),
        shaderIndex = getShaderIndexByMaterialIndexAndShaderName(key, ShaderDataFromSystem);

    if(_isShaderIndexExist(shaderIndex)){
        return shaderIndex;
    }

    shaderIndex = init(state, materialIndex, materialShaderLibConfig, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap);

    _setShaderIndexByMaterialIndexAndShaderNameMap(key, shaderIndex, ShaderDataFromSystem);

    return shaderIndex;
}

var _setShaderIndexByMaterialIndexAndShaderNameMap = (key:string, shaderIndex:number, ShaderDataFromSystem:any) => {
    ShaderDataFromSystem.shaderIndexByMaterialIndexAndShaderNameMap[key] = shaderIndex;
}

export var getShaderIndexByMaterialIndexAndShaderName = (key:string, ShaderDataFromSystem:any) => {
    return ShaderDataFromSystem.shaderIndexByMaterialIndexAndShaderNameMap[key];
}

export var buildShaderIndexByMaterialIndexAndShaderNameMapKey = (materialIndex:number|null, shaderName:string) => {
    if(materialIndex === null){
        return shaderName;
    }

    return `${materialIndex}${shaderName}`;
}

var _isShaderIndexExist = (shaderIndex:number) => isNotUndefined(shaderIndex);

export var genereateShaderIndex = (ShaderDataFromSystem: any) => {
    // var shaderLibWholeName = materialShaderLibNameArr.join(''),
        // index = ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName];

    // if (isValidMapValue(index)) {
    //     return index;
    // }

    var index = ShaderDataFromSystem.index;

    ShaderDataFromSystem.index += 1;

    // ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName] = index;

    return index;
}

export var sendAttributeData = (gl: WebGLRenderingContext, shaderIndex: number, program: WebGLProgram, geometryIndex: number, getArrayBufferDataFuncMap: GetArrayBufferDataFuncMap, getAttribLocation: Function, isAttributeLocationNotExist: Function, sendBuffer: Function, ProgramDataFromSystem: any, LocationDataFromSystem: any, GLSLSenderDataFromSystem: any, GeometryWorkerDataFromSystem: any, ArrayBufferDataFromSystem: any) => {
    sendAttributeDataProgram(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
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

