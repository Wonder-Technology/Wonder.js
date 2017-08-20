import { addSendUniformConfig, addVaoConfig } from "./glslSender/glslSenderUtils";
import {
    IWebGL2ShaderLibConfig,
    IWebGL2ShaderLibContentGenerator
} from "../../../../../worker/webgl2/both_file/data/shaderLib_generator";
import { InitShaderDataMap } from "../../../../../type/utilsType";
import { Map } from "immutable";
import {
    IMaterialConfig, IShaderLibItem,
    MaterialShaderLibConfig
} from "../../../../../data/material_config_interface";
import { getMaterialShaderLibConfig } from "../../../../data/MaterialConfigSystem";
import {
    buildShaderIndexByMaterialIndexAndShaderNameMapKey,
    genereateShaderIndex,
    getShaderIndexByMaterialIndexAndShaderName,
    initShader as initShaderUtils
} from "../../../../../utils/shader/shaderUtils";
import { getProgram } from "../../../../../utils/worker/render_file/shader/program/programUtils";
import { initShader, isProgramExist, registerProgram } from "../../../../../utils/shader/program/programUtils";
// import { setEmptyLocationMap } from "../../../../../utils/shader/location/locationUtils";
import { getMaterialShaderLibNameArr } from "../../../shader/shaderSourceBuildUtils";
import { handleUboConfig } from "../ubo/uboManagerUtils";
import { WebGL2InitShaderFuncDataMap } from "../../../../type/utilsType";
import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { bindVao as bindVaoUtils, createVao, unbindVao } from "../vao/vaoUtils";
import {
    createAndInitArrayBuffer,
    createAndInitIndexBuffer
} from "../../../../../utils/worker/render_file/shader/shaderUtils";
import { setEmptyLocationMap } from "./location/locationUtils";

export var getNoMaterialShaderIndex = (shaderName: string, ShaderDataFromSystem: any) => {
    return getShaderIndexByMaterialIndexAndShaderName(buildShaderIndexByMaterialIndexAndShaderNameMapKey(null, shaderName), ShaderDataFromSystem);
}

export var initNoMaterialShader = (state: Map<any, any>, shaderName:string, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderFuncDataMap: WebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    initShaderUtils(state, null, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

export var initMaterialShader = (state: Map<any, any>, materialIndex:number, shaderName:string, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderFuncDataMap: WebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return initShaderUtils(state, materialIndex, shaderName, getMaterialShaderLibConfig(shaderName, material_config), material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

//todo refactor: extract code from webgl1
var _init = (state: Map<any, any>, materialIndex:number|null, materialShaderLibConfig:MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderFuncDataMap: WebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var {
            ShaderDataFromSystem,
            DeviceManagerDataFromSystem,
            ProgramDataFromSystem,
            LocationDataFromSystem,
            GLSLSenderDataFromSystem,
            GPUDetectDataFromSystem
        } = initShaderDataMap,
        {
            buildGLSLSource,
            getGL
        } = initShaderFuncDataMap,
        materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap),
        shaderIndex = genereateShaderIndex(ShaderDataFromSystem),
        program = getProgram(shaderIndex, ProgramDataFromSystem),
        shaderLibDataFromSystem: IWebGL2ShaderLibConfig = null,
        gl = null;

    if (isProgramExist(program)) {
        return shaderIndex;
    }

    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;

    let {
        vsSource,
        fsSource
    } = buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap);

    gl = getGL(DeviceManagerDataFromSystem, state);

    program = gl.createProgram();

    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);

    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);

    addVaoConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.vaoConfigMap, initShaderFuncDataMap);
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);

    handleUboConfig(gl, shaderIndex, program, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap, GLSLSenderDataFromSystem, GPUDetectDataFromSystem);

    return shaderIndex;
}

export var bindVao = (gl: WebGLRenderingContext, vao: WebGLVertexArrayObject, ProgramDataFromSystem: any) => {
    if (ProgramDataFromSystem.lastBindedVao === vao) {
        return;
    }

    ProgramDataFromSystem.lastBindedVao = vao;

    bindVaoUtils(gl, vao);
}

export var createAndInitVao = (gl: any, geometryIndex: number, vaos: Array<WebGLVertexArrayObject>, {
    positionLocation,
    normalLocation,
    texCoordLocation,

    getVertices,
    getNormals,
    getTexCoords,
    getIndices
}, GeometryDataFromSystem: any) => {
    var vao = createVao(gl);

    vaos[geometryIndex] = vao;

    bindVaoUtils(gl, vao);

    if (!!getVertices) {
        createAndInitArrayBuffer(gl, getVertices(geometryIndex, GeometryDataFromSystem), positionLocation, 3);
    }

    if (!!getNormals) {
        createAndInitArrayBuffer(gl, getNormals(geometryIndex, GeometryDataFromSystem), normalLocation, 3);
    }

    if (!!getTexCoords) {
        createAndInitArrayBuffer(gl, getTexCoords(geometryIndex, GeometryDataFromSystem), texCoordLocation, 2);
    }

    createAndInitIndexBuffer(gl, getIndices(geometryIndex, GeometryDataFromSystem));

    unbindVao(gl);

    return vao;
}
