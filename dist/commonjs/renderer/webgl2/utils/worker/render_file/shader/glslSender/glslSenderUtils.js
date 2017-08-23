"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var contract_1 = require("../../../../../../../definition/typescript/decorator/contract");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../../../../../../utils/arrayUtils");
var renderConfigUtils_1 = require("../../../../../../utils/renderConfigUtils");
var objectUtils_1 = require("../../../../../../../utils/objectUtils");
var glslSenderUtils_1 = require("../../../../../../utils/worker/render_file/shader/glslSender/glslSenderUtils");
var Log_1 = require("../../../../../../../utils/Log");
exports.addSendUniformConfig = contract_1.ensureFunc(function (returnVal, shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    contract_1.it("sendUniformConfigMap should not has duplicate attribute name", function () {
        wonder_expect_js_1.expect(arrayUtils_1.hasDuplicateItems(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex])).false;
    });
}, contract_1.requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    contract_1.it("sendUniformConfigMap[shaderIndex] should not be defined", function () {
        wonder_expect_js_1.expect(GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, GLSLSenderDataFromSystem) {
    var sendUniformDataArr = [], sendUniformFuncDataArr = [];
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (renderConfigUtils_1.isConfigDataExist(sendData)) {
            if (renderConfigUtils_1.isConfigDataExist(sendData.uniform)) {
                sendUniformDataArr = sendUniformDataArr.concat(sendData.uniform);
            }
            if (renderConfigUtils_1.isConfigDataExist(sendData.uniformFunc)) {
                sendUniformFuncDataArr = sendUniformFuncDataArr.concat(sendData.uniformFunc);
            }
        }
    });
    GLSLSenderDataFromSystem.sendUniformConfigMap[shaderIndex] = sendUniformDataArr;
    GLSLSenderDataFromSystem.sendUniformFuncConfigMap[shaderIndex] = sendUniformFuncDataArr;
}));
exports.addVaoConfig = contract_1.requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, vaoConfigMap) {
    contract_1.it("vaoConfigMap[shaderIndex] should not be defined", function () {
        wonder_expect_js_1.expect(vaoConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, vaoConfigMap, _a) {
    var getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vaoConfigData = {};
    arrayUtils_1.forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (renderConfigUtils_1.isConfigDataExist(sendData) && renderConfigUtils_1.isConfigDataExist(sendData.attribute)) {
            arrayUtils_1.forEach(sendData.attribute, function (_a) {
                var buffer = _a.buffer, location = _a.location;
                switch (buffer) {
                    case "vertex":
                        glslSenderUtils_1.setVaoConfigData(vaoConfigData, "positionLocation", location);
                        glslSenderUtils_1.setVaoConfigData(vaoConfigData, "getVertices", getVertices);
                        break;
                    case "normal":
                        glslSenderUtils_1.setVaoConfigData(vaoConfigData, "normalLocation", location);
                        glslSenderUtils_1.setVaoConfigData(vaoConfigData, "getNormals", getNormals);
                        break;
                    case "texCoord":
                        glslSenderUtils_1.setVaoConfigData(vaoConfigData, "texCoordLocation", location);
                        glslSenderUtils_1.setVaoConfigData(vaoConfigData, "getTexCoords", getTexCoords);
                        break;
                    default:
                        Log_1.Log.error(true, Log_1.Log.info.FUNC_INVALID("bufferName:" + buffer));
                        break;
                }
            });
        }
    });
    glslSenderUtils_1.setVaoConfigData(vaoConfigData, "getIndices", getIndices);
    vaoConfigMap[shaderIndex] = vaoConfigData;
});
exports.getVaoConfig = function (shaderIndex, GLSLSenderDataFromSystem) { return GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex]; };
exports.initData = function (GLSLSenderDataFromSystem) {
    glslSenderUtils_1.initData(GLSLSenderDataFromSystem);
    GLSLSenderDataFromSystem.uboBindingPoint = 0;
    GLSLSenderDataFromSystem.uboBindingPointMap = objectUtils_1.createMap();
    GLSLSenderDataFromSystem.oneUboDataList = [];
    GLSLSenderDataFromSystem.frameUboDataList = [];
    GLSLSenderDataFromSystem.ambientLightUboDataList = [];
    GLSLSenderDataFromSystem.directionLightUboDataList = [];
    GLSLSenderDataFromSystem.pointLightUboDataList = [];
};
//# sourceMappingURL=glslSenderUtils.js.map