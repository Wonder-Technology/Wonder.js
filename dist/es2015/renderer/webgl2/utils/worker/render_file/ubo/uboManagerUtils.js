import { isValidMapValue } from "../../../../../../utils/objectUtils";
import { ensureFunc, it } from "../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../../utils/arrayUtils";
import { Log } from "../../../../../../utils/Log";
import { isConfigDataExist } from "../../../../../utils/renderConfigUtils";
import { bindUniformBlock, bindUniformBufferBase, bufferDynamicData, bufferStaticData, bufferSubDynamicData } from "./uboUtils";
import { set } from "../../../../../../utils/typeArrayUtils";
import { getMaxUniformBufferBindings } from "../device/gpuDetectUtils";
export var init = function (gl, render_config, _a) {
    var oneUboDataList = _a.oneUboDataList, uboBindingPointMap = _a.uboBindingPointMap;
    _bindOneUboData(gl, render_config, oneUboDataList, uboBindingPointMap);
};
var _bindOneUboData = function (gl, render_config, oneUboDataList, uboBindingPointMap) {
    _bindSingleBufferUboData(gl, render_config, oneUboDataList, null, uboBindingPointMap);
};
var _buildUboDataMap = function (uniformBlockBinding, buffer, typeArray) {
    return {
        uniformBlockBinding: uniformBlockBinding,
        buffer: buffer,
        typeArray: typeArray
    };
};
var _buildUboFuncMap = function (bindUniformBufferBase, bufferStaticData, bufferDynamicData, bufferSubDynamicData, set) {
    return {
        bindUniformBufferBase: bindUniformBufferBase,
        bufferStaticData: bufferStaticData,
        bufferDynamicData: bufferDynamicData,
        bufferSubDynamicData: bufferSubDynamicData,
        set: set
    };
};
var _buildGlobalRenderDataMap = function (render_config) {
    return {
        render_config: render_config
    };
};
export var bindFrameUboData = function (gl, render_config, cameraData, _a) {
    var frameUboDataList = _a.frameUboDataList, uboBindingPointMap = _a.uboBindingPointMap;
    _bindSingleBufferUboData(gl, render_config, frameUboDataList, cameraData, uboBindingPointMap);
};
export var bindAmbientLightUboData = function (gl, ambientLightIndex, sendUniformDataAmbientLightDataMap, ambientLightValueMap, drawDataMap, _a) {
    var ambientLightUboDataList = _a.ambientLightUboDataList, uboBindingPointMap = _a.uboBindingPointMap;
    _bindLightUboData(gl, ambientLightIndex, sendUniformDataAmbientLightDataMap, ambientLightValueMap, drawDataMap, ambientLightUboDataList, uboBindingPointMap);
};
export var bindDirectionLightUboData = function (gl, directionLightIndex, sendUniformDataDirectionLightDataMap, directionLightValueMap, drawDataMap, _a) {
    var directionLightUboDataList = _a.directionLightUboDataList, uboBindingPointMap = _a.uboBindingPointMap;
    _bindLightUboData(gl, directionLightIndex, sendUniformDataDirectionLightDataMap, directionLightValueMap, drawDataMap, directionLightUboDataList, uboBindingPointMap);
};
export var bindPointLightUboData = function (gl, pointLightIndex, sendUniformDataPointLightDataMap, pointLightValueMap, drawDataMap, _a) {
    var pointLightUboDataList = _a.pointLightUboDataList, uboBindingPointMap = _a.uboBindingPointMap;
    _bindLightUboData(gl, pointLightIndex, sendUniformDataPointLightDataMap, pointLightValueMap, drawDataMap, pointLightUboDataList, uboBindingPointMap);
};
var _bindLightUboData = function (gl, lightIndex, sendUniformDataLightDataMap, lightValueMap, drawDataMap, lightUboDataList, uboBindingPointMap) {
    var uboFuncMap = _buildUboFuncMap(bindUniformBufferBase, bufferStaticData, bufferDynamicData, bufferSubDynamicData, set);
    forEach(lightUboDataList, function (_a) {
        var name = _a.name, typeArrays = _a.typeArrays, buffers = _a.buffers, setBufferDataFunc = _a.setBufferDataFunc;
        var bindingPoint = uboBindingPointMap[name], typeArray = typeArrays[lightIndex], buffer = buffers[lightIndex], uboDataMap = _buildUboDataMap(bindingPoint, buffer, typeArray);
        setBufferDataFunc(gl, lightIndex, uboDataMap, uboFuncMap, sendUniformDataLightDataMap, lightValueMap);
    });
};
var _bindSingleBufferUboData = function (gl, render_config, singleBufferUboDataList, cameraData, uboBindingPointMap) {
    var uboFuncMap = _buildUboFuncMap(bindUniformBufferBase, bufferStaticData, bufferDynamicData, bufferSubDynamicData, set), globalRenderDataMap = _buildGlobalRenderDataMap(render_config);
    forEach(singleBufferUboDataList, function (_a) {
        var name = _a.name, typeArray = _a.typeArray, buffer = _a.buffer, setBufferDataFunc = _a.setBufferDataFunc;
        var bindingPoint = uboBindingPointMap[name], uboDataMap = _buildUboDataMap(bindingPoint, buffer, typeArray);
        setBufferDataFunc(gl, uboDataMap, uboFuncMap, cameraData, globalRenderDataMap);
    });
};
export var handleUboConfig = function (gl, shaderIndex, program, materialShaderLibNameArr, shaderLibData, initShaderDataMap, GLSLSenderDataFromSystem, GPUDetectDataFromSystem) {
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData)) {
            if (isConfigDataExist(sendData.uniformUbo)) {
                forEach(sendData.uniformUbo, function (data) {
                    var name = data.name, bindingPoint = null, uboBindingPointMap = GLSLSenderDataFromSystem.uboBindingPointMap, uboBindingPoint = uboBindingPointMap[name];
                    if (isValidMapValue(uboBindingPoint)) {
                        return;
                    }
                    bindingPoint = _setUniqueBindingPoint(name, GLSLSenderDataFromSystem, GPUDetectDataFromSystem);
                    bindUniformBlock(gl, program, name, bindingPoint);
                    _addInitedUboFuncConfig(gl, data, initShaderDataMap, GLSLSenderDataFromSystem);
                });
            }
        }
    });
};
var _setUniqueBindingPoint = ensureFunc(function (uboBindingPoint, name, GLSLSenderDataFromSystem, GPUDetectDataFromSystem) {
    it("uboBindingPoint shouldn't exceed maxUniformBufferBindings", function () {
        expect(uboBindingPoint).lte(getMaxUniformBufferBindings(GPUDetectDataFromSystem));
    });
}, function (name, GLSLSenderDataFromSystem, GPUDetectDataFromSystem) {
    var uboBindingPointMap = GLSLSenderDataFromSystem.uboBindingPointMap, uboBindingPoint = GLSLSenderDataFromSystem.uboBindingPoint;
    uboBindingPointMap[name] = uboBindingPoint;
    GLSLSenderDataFromSystem.uboBindingPoint += 1;
    return uboBindingPoint;
});
var _addInitedUboFuncConfig = ensureFunc(function (list) {
    it("list shouldn't has duplicate ubo data", function () {
        expect(hasDuplicateItems(list)).false;
    });
}, function (gl, _a, _b, GLSLSenderDataFromSystem) {
    var name = _a.name, typeArray = _a.typeArray, setBufferDataFunc = _a.setBufferDataFunc, frequence = _a.frequence;
    var AmbientLightDataFromSystem = _b.AmbientLightDataFromSystem, DirectionLightDataFromSystem = _b.DirectionLightDataFromSystem, PointLightDataFromSystem = _b.PointLightDataFromSystem;
    var list = null;
    switch (frequence) {
        case "one":
            list = GLSLSenderDataFromSystem.oneUboDataList;
            list.push(_createSingleBufferData(gl, name, typeArray, setBufferDataFunc));
            break;
        case "frame":
            list = GLSLSenderDataFromSystem.frameUboDataList;
            list.push(_createSingleBufferData(gl, name, typeArray, setBufferDataFunc));
            break;
        case "ambientLight":
            list = _addLightInitedUboFuncConfig(gl, GLSLSenderDataFromSystem.ambientLightUboDataList, typeArray, AmbientLightDataFromSystem.count, name, setBufferDataFunc);
            break;
        case "directionLight":
            list = _addLightInitedUboFuncConfig(gl, GLSLSenderDataFromSystem.directionLightUboDataList, typeArray, DirectionLightDataFromSystem.count, name, setBufferDataFunc);
            break;
        case "pointLight":
            list = _addLightInitedUboFuncConfig(gl, GLSLSenderDataFromSystem.pointLightUboDataList, typeArray, PointLightDataFromSystem.count, name, setBufferDataFunc);
            break;
        default:
            Log.error(Log.info.FUNC_UNKNOW("frequence: " + frequence));
            break;
    }
    return list;
});
var _addLightInitedUboFuncConfig = function (gl, list, typeArray, lightCount, name, setBufferDataFunc) {
    var buffers = [], typeArrays = [];
    for (var i = 0; i < lightCount; i++) {
        typeArrays.push(_createTypeArray(typeArray));
        buffers.push(gl.createBuffer());
    }
    list.push({
        name: name,
        typeArrays: typeArrays,
        buffers: buffers,
        setBufferDataFunc: setBufferDataFunc
    });
    return list;
};
var _createSingleBufferData = function (gl, name, typeArray, setBufferDataFunc) {
    return {
        name: name,
        typeArray: _createTypeArray(typeArray),
        buffer: gl.createBuffer(),
        setBufferDataFunc: setBufferDataFunc
    };
};
var _createTypeArray = function (_a) {
    var length = _a.length;
    return new Float32Array(length);
};
//# sourceMappingURL=uboManagerUtils.js.map