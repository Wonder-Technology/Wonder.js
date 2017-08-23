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
import {
    genereateShaderIndex, initMaterialShader as initMaterialShaderUtils, initNoMaterialShader as initNoMaterialShaderUtils
} from "../../../../../utils/shader/shaderUtils";
import { getProgram } from "../../../../../utils/worker/render_file/shader/program/programUtils";
import { initShader, registerProgram } from "../../../../../utils/shader/program/programUtils";
import { handleUboConfig } from "../ubo/uboManagerUtils";
import { IWebGL2InitShaderFuncDataMap } from "../interface/IUtils";
import { WebGLVertexArrayObject } from "../../../../../extend/interface";
import { bindVao as bindVaoUtils, createVao, unbindVao } from "../vao/vaoUtils";
import {
    createAndInitArrayBuffer,
    createAndInitIndexBuffer
} from "../../../../../utils/worker/render_file/shader/shaderUtils";
import { setEmptyLocationMap } from "./location/locationUtils";
import { createMap } from "../../../../../../utils/objectUtils";
import { VaoMap, VboArrayMap } from "../../../../../type/dataType";

export var getNoMaterialShaderIndex = (shaderName: string, ShaderDataFromSystem: any) => {
    return ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName];
}

export var initNoMaterialShader = (state: Map<any, any>, shaderName: string, materialShaderLibConfig: MaterialShaderLibConfig, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderFuncDataMap: IWebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    var shaderIndex = initNoMaterialShaderUtils(state, shaderName, materialShaderLibConfig, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);

    initShaderDataMap.ShaderDataFromSystem.shaderIndexByShaderNameMap[shaderName] = shaderIndex;

    return shaderIndex;
}

export var initMaterialShader = (state: Map<any, any>, materialIndex: number, shaderName: string, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderFuncDataMap: IWebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
    return initMaterialShaderUtils(state, materialIndex, shaderName, material_config, shaderLib_generator, _init, initShaderFuncDataMap, initShaderDataMap);
}

var _init = (state: Map<any, any>, materialIndex: number | null, materialShaderLibNameArr: Array<string>, material_config: IMaterialConfig, shaderLib_generator: IWebGL2ShaderLibContentGenerator, initShaderFuncDataMap: IWebGL2InitShaderFuncDataMap, initShaderDataMap: InitShaderDataMap) => {
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
        shaderIndex = genereateShaderIndex(ShaderDataFromSystem),
        program = getProgram(shaderIndex, ProgramDataFromSystem),
        shaderLibDataFromSystem: IWebGL2ShaderLibConfig = null,
        gl = null;

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

export var createAndInitVao = (gl: any, geometryIndex: number, vaoMap: VaoMap, vboArrayMap: VboArrayMap, {
    positionLocation,
    normalLocation,
    texCoordLocation,

    getVertices,
    getNormals,
    getTexCoords,
    getIndices
}, GeometryDataFromSystem: any) => {
    var vao = createVao(gl),
        buffers = [];

    vaoMap[geometryIndex] = vao;

    bindVaoUtils(gl, vao);

    if (!!getVertices) {
        buffers.push(createAndInitArrayBuffer(gl, getVertices(geometryIndex, GeometryDataFromSystem), positionLocation, 3));
    }

    if (!!getNormals) {
        buffers.push(createAndInitArrayBuffer(gl, getNormals(geometryIndex, GeometryDataFromSystem), normalLocation, 3));
    }

    if (!!getTexCoords) {
        buffers.push(createAndInitArrayBuffer(gl, getTexCoords(geometryIndex, GeometryDataFromSystem), texCoordLocation, 2));
    }

    buffers.push(createAndInitIndexBuffer(gl, getIndices(geometryIndex, GeometryDataFromSystem)));

    unbindVao(gl);

    vboArrayMap[geometryIndex] = buffers;

    return vao;
}

export var initData = (ShaderDataFromSystem: any) => {
    ShaderDataFromSystem.index = 0;
    ShaderDataFromSystem.count = 0;

    ShaderDataFromSystem.shaderIndexMap = createMap();
    ShaderDataFromSystem.shaderIndexByShaderNameMap = createMap();
    ShaderDataFromSystem.shaderLibNameMap = createMap();
}

