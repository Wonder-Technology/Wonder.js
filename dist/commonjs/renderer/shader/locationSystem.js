"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var renderConfigUtils_1 = require("../utils/renderConfigUtils");
var contract_1 = require("../../definition/typescript/decorator/contract");
var objectUtils_1 = require("../../utils/objectUtils");
var wonder_expect_js_1 = require("wonder-expect.js");
var arrayUtils_1 = require("../../utils/arrayUtils");
exports.setLocationMap = contract_1.ensureFunc(function (returnVal, gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData) {
    contract_1.it("attribute should contain position at least", function () {
        wonder_expect_js_1.expect(ShaderData.attributeLocationMap[shaderIndex]["a_position"]).be.a("number");
    });
}, contract_1.requireCheckFunc(function (gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData) {
    contract_1.it("not setted location before", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(ShaderData.attributeLocationMap[shaderIndex])).false;
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(ShaderData.uniformLocationMap[shaderIndex])).false;
    });
}, function (gl, shaderIndex, program, materialShaderLibConfig, shaderLibData, ShaderData) {
    var attributeLocationMap = {}, uniformLocationMap = {}, sendData = null, attributeName = null, uniformName = null;
    arrayUtils_1.forEach(materialShaderLibConfig, function (shaderLibName) {
        var attribute = null, uniform = null;
        sendData = shaderLibData[shaderLibName].send;
        if (!renderConfigUtils_1.isConfigDataExist(sendData)) {
            return;
        }
        attribute = sendData.attribute;
        uniform = sendData.uniform;
        if (renderConfigUtils_1.isConfigDataExist(attribute)) {
            arrayUtils_1.forEach(attribute, function (data) {
                attributeName = data.name;
                attributeLocationMap[attributeName] = gl.getAttribLocation(program, attributeName);
            });
        }
        if (renderConfigUtils_1.isConfigDataExist(uniform)) {
            arrayUtils_1.forEach(uniform, function (data) {
                uniformName = data.name;
                uniformLocationMap[uniformName] = gl.getUniformLocation(program, uniformName);
            });
        }
    });
    ShaderData.attributeLocationMap[shaderIndex] = attributeLocationMap;
    ShaderData.uniformLocationMap[shaderIndex] = uniformLocationMap;
}));
exports.getAttribLocation = contract_1.ensureFunc(function (pos, name, attributeLocationMap) {
    contract_1.it(name + "'s attrib location should be number", function () {
        wonder_expect_js_1.expect(pos).be.a("number");
    });
}, function (name, attributeLocationMap) {
    return attributeLocationMap[name];
});
exports.getUniformLocation = contract_1.ensureFunc(function (pos, name, uniformLocationMap) {
    contract_1.it(name + "'s uniform location should exist in map", function () {
        wonder_expect_js_1.expect(objectUtils_1.isValidMapValue(pos)).true;
    });
}, function (name, uniformLocationMap) {
    return uniformLocationMap[name];
});
exports.isUniformLocationNotExist = function (pos) {
    return pos === null;
};
exports.isAttributeLocationNotExist = function (pos) {
    return pos === -1;
};
//# sourceMappingURL=locationSystem.js.map