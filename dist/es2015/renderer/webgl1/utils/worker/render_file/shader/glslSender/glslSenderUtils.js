import { ensureFunc, it, requireCheckFunc } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../../../utils/renderConfigUtils";
import { initData as initDataUtils, setVaoConfigData } from "../../../../../../utils/worker/render_file/shader/glslSender/glslSenderUtils";
import { createMap } from "../../../../../../../utils/objectUtils";
import { Log } from "../../../../../../../utils/Log";
import { getAttribLocation } from "../location/locationUtils";
export var addSendAttributeConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
    it("sendAttributeConfigMap should not has duplicate attribute name", function () {
        expect(hasDuplicateItems(sendAttributeConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
    it("sendAttributeConfigMap[shaderIndex] should not be defined", function () {
        expect(sendAttributeConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, sendAttributeConfigMap) {
    var sendDataArr = [];
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            sendDataArr = sendDataArr.concat(sendData.attribute);
        }
    });
    sendAttributeConfigMap[shaderIndex] = sendDataArr;
}));
export var addSendUniformConfig = ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    it("sendUniformConfigMap should not has duplicate attribute name", function () {
        expect(hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
    });
}, requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    it("sendUniformConfigMap[shaderIndex] should not be defined", function () {
        expect(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    var sendUniformDataArr = [], sendUniformFuncDataArr = [];
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData)) {
            if (isConfigDataExist(sendData.uniform)) {
                sendUniformDataArr = sendUniformDataArr.concat(sendData.uniform);
            }
            if (isConfigDataExist(sendData.uniformFunc)) {
                sendUniformFuncDataArr = sendUniformFuncDataArr.concat(sendData.uniformFunc);
            }
        }
    });
    GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex] = sendUniformDataArr;
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex] = sendUniformFuncDataArr;
}));
export var addVaoConfig = requireCheckFunc(function (gl, shaderIndex, program, materialShaderLibNameArr, shaderLibData, attributeLocationMap, vaoConfigMap) {
    it("vaoConfigMap[shaderIndex] should not be defined", function () {
        expect(vaoConfigMap[shaderIndex]).not.exist;
    });
}, function (gl, shaderIndex, program, materialShaderLibNameArr, shaderLibData, attributeLocationMap, vaoConfigMap, _a) {
    var getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vaoConfigData = {};
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            forEach(sendData.attribute, function (_a) {
                var name = _a.name, buffer = _a.buffer;
                var location = getAttribLocation(gl, program, name, attributeLocationMap);
                switch (buffer) {
                    case "vertex":
                        setVaoConfigData(vaoConfigData, "positionLocation", location);
                        setVaoConfigData(vaoConfigData, "getVertices", getVertices);
                        break;
                    case "normal":
                        setVaoConfigData(vaoConfigData, "normalLocation", location);
                        setVaoConfigData(vaoConfigData, "getNormals", getNormals);
                        break;
                    case "texCoord":
                        setVaoConfigData(vaoConfigData, "texCoordLocation", location);
                        setVaoConfigData(vaoConfigData, "getTexCoords", getTexCoords);
                        break;
                    default:
                        Log.error(true, Log.info.FUNC_INVALID("bufferName:" + buffer));
                        break;
                }
            });
        }
    });
    setVaoConfigData(vaoConfigData, "getIndices", getIndices);
    vaoConfigMap[shaderIndex] = vaoConfigData;
});
export var initData = function (GLSLSenderDataFromSystem) {
    initDataUtils(GLSLSenderDataFromSystem);
    GLSLSenderDataFromSystem.sendAttributeConfigMap = createMap();
    GLSLSenderDataFromSystem.attributeLocationMap = createMap();
};
//# sourceMappingURL=glslSenderUtils.js.map