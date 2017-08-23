import { ensureFunc, it, requireCheckFunc } from "../../../../../../../definition/typescript/decorator/contract";
import { expect } from "wonder-expect.js";
import { forEach, hasDuplicateItems } from "../../../../../../../utils/arrayUtils";
import { isConfigDataExist } from "../../../../../../utils/renderConfigUtils";
import { createMap } from "../../../../../../../utils/objectUtils";
import { initData as initDataUtils, setVaoConfigData } from "../../../../../../utils/worker/render_file/shader/glslSender/glslSenderUtils";
import { Log } from "../../../../../../../utils/Log";
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
export var addVaoConfig = requireCheckFunc(function (shaderIndex, materialShaderLibNameArr, shaderLibData, vaoConfigMap) {
    it("vaoConfigMap[shaderIndex] should not be defined", function () {
        expect(vaoConfigMap[shaderIndex]).not.exist;
    });
}, function (shaderIndex, materialShaderLibNameArr, shaderLibData, vaoConfigMap, _a) {
    var getVertices = _a.getVertices, getNormals = _a.getNormals, getTexCoords = _a.getTexCoords, getIndices = _a.getIndices;
    var vaoConfigData = {};
    forEach(materialShaderLibNameArr, function (shaderLibName) {
        var sendData = shaderLibData[shaderLibName].send;
        if (isConfigDataExist(sendData) && isConfigDataExist(sendData.attribute)) {
            forEach(sendData.attribute, function (_a) {
                var buffer = _a.buffer, location = _a.location;
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
export var getVaoConfig = function (shaderIndex, GLSLSenderDataFromSystem) { return GLSLSenderDataFromSystem.vaoConfigMap[shaderIndex]; };
export var initData = function (GLSLSenderDataFromSystem) {
    initDataUtils(GLSLSenderDataFromSystem);
    GLSLSenderDataFromSystem.uboBindingPoint = 0;
    GLSLSenderDataFromSystem.uboBindingPointMap = createMap();
    GLSLSenderDataFromSystem.oneUboDataList = [];
    GLSLSenderDataFromSystem.frameUboDataList = [];
    GLSLSenderDataFromSystem.ambientLightUboDataList = [];
    GLSLSenderDataFromSystem.directionLightUboDataList = [];
    GLSLSenderDataFromSystem.pointLightUboDataList = [];
};
//# sourceMappingURL=glslSenderUtils.js.map