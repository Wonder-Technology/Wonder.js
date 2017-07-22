import { getMaterialShaderLibConfig, getProgram, initShader, isProgramExist, registerProgram, sendUniformData as sendUniformDataProgram, sendAttributeData as sendAttributeDataProgram, use as useProgram } from "./program/programUtils";
import { addSendAttributeConfig, addSendUniformConfig } from "./glslSender/glslSenderUtils";
import { getOrCreateBuffer } from "../buffer/indexBufferUtils";
import { getMaterialShaderLibNameArr } from "./shaderSourceBuildUtils";
import { setEmptyLocationMap } from "./location/locationUtils";
import { isValidMapValue } from "../../../utils/objectUtils";
export var init = function (state, materialIndex, materialClassName, material_config, shaderLib_generator, initShaderFuncDataMap, initShaderDataMap) {
    var ShaderDataFromSystem = initShaderDataMap.ShaderDataFromSystem, DeviceManagerDataFromSystem = initShaderDataMap.DeviceManagerDataFromSystem, ProgramDataFromSystem = initShaderDataMap.ProgramDataFromSystem, LocationDataFromSystem = initShaderDataMap.LocationDataFromSystem, GLSLSenderDataFromSystem = initShaderDataMap.GLSLSenderDataFromSystem, materialShaderLibConfig = getMaterialShaderLibConfig(materialClassName, material_config), materialShaderLibNameArr = getMaterialShaderLibNameArr(materialShaderLibConfig, material_config.shaderLibGroups, materialIndex, initShaderFuncDataMap, initShaderDataMap), shaderIndex = _genereateShaderIndex(materialShaderLibNameArr, ShaderDataFromSystem), program = getProgram(shaderIndex, ProgramDataFromSystem), shaderLibDataFromSystem = null, gl = null;
    if (isProgramExist(program)) {
        return shaderIndex;
    }
    shaderLibDataFromSystem = shaderLib_generator.shaderLibs;
    var _a = initShaderFuncDataMap.buildGLSLSource(materialIndex, materialShaderLibNameArr, shaderLibDataFromSystem, initShaderDataMap), vsSource = _a.vsSource, fsSource = _a.fsSource;
    gl = initShaderFuncDataMap.getGL(DeviceManagerDataFromSystem, state);
    program = gl.createProgram();
    registerProgram(shaderIndex, ProgramDataFromSystem, program);
    initShader(program, vsSource, fsSource, gl);
    setEmptyLocationMap(shaderIndex, LocationDataFromSystem);
    addSendAttributeConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem.sendAttributeConfigMap);
    addSendUniformConfig(shaderIndex, materialShaderLibNameArr, shaderLibDataFromSystem, GLSLSenderDataFromSystem);
    return shaderIndex;
};
var _genereateShaderIndex = function (materialShaderLibNameArr, ShaderDataFromSystem) {
    var shaderLibWholeName = materialShaderLibNameArr.join(''), index = ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName];
    if (isValidMapValue(index)) {
        return index;
    }
    index = ShaderDataFromSystem.index;
    ShaderDataFromSystem.index += 1;
    ShaderDataFromSystem.shaderLibWholeNameMap[shaderLibWholeName] = index;
    return index;
};
export var sendAttributeData = function (gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem) {
    sendAttributeDataProgram(gl, shaderIndex, program, geometryIndex, getArrayBufferDataFuncMap, getAttribLocation, isAttributeLocationNotExist, sendBuffer, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem, GeometryWorkerDataFromSystem, ArrayBufferDataFromSystem);
};
export var sendUniformData = function (gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData) {
    sendUniformDataProgram(gl, shaderIndex, program, mapCount, sendDataMap, drawDataMap, renderCommandUniformData);
};
export var bindIndexBuffer = function (gl, geometryIndex, getIndicesFunc, ProgramDataFromSystem, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem) {
    var buffer = getOrCreateBuffer(gl, geometryIndex, getIndicesFunc, GeometryWorkerDataFromSystem, IndexBufferDataFromSystem);
    if (ProgramDataFromSystem.lastBindedIndexBuffer === buffer) {
        return;
    }
    ProgramDataFromSystem.lastBindedIndexBuffer = buffer;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
};
export var use = function (gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem) {
    return useProgram(gl, shaderIndex, ProgramDataFromSystem, LocationDataFromSystem, GLSLSenderDataFromSystem);
};
//# sourceMappingURL=shaderUtils.js.map